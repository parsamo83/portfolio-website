"use client";

import type { Lang } from "@/i18n";
import { useEffect, useRef, useState } from "react";

/*
  A small ray tracer that renders the card's scene live: three spheres on a
  checkered floor, soft shadows, contact shading, and one mirror sphere with
  reflections two bounces deep. Colours come from the page's theme tokens, so
  the scene re-renders when the theme changes. Moving across it moves the light.
*/

type Vec = [number, number, number];
type Sphere = { c: Vec; r: number; col: Vec; refl: number; spec: number; shin: number };
type Palette = { fog: Vec; a: Vec; b: Vec; signal: Vec; mirror: Vec; white: Vec; amb: number; key: number };

const toLinear = (v: number) => ((v /= 255) <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
const toSrgb = (v: number) => {
  v = v <= 0 ? 0 : v >= 1 ? 1 : v;
  return 255 * (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
};
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a: Vec): Vec => {
  const l = Math.hypot(a[0], a[1], a[2]);
  return [a[0] / l, a[1] / l, a[2] / l];
};
const smooth = (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * (3 - 2 * x));

let colorParser: CanvasRenderingContext2D | null = null;

/** Reads a theme token as linear RGB. The canvas normalizes any CSS colour (#fff, rgb(), names) to #rrggbb. */
function token(name: string): Vec {
  colorParser ??= document.createElement("canvas").getContext("2d");
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  let hex = "000000";
  if (colorParser) {
    colorParser.fillStyle = "#000";
    colorParser.fillStyle = value;
    hex = String(colorParser.fillStyle).replace("#", "");
  }
  const n = parseInt(hex, 16);
  return [toLinear((n >> 16) & 255), toLinear((n >> 8) & 255), toLinear(n & 255)];
}

function readPalette(): Palette {
  const dark = document.documentElement.classList.contains("dark");
  return {
    fog: token("--sunken"),
    a: token("--sunken"),
    b: token("--muted"),
    signal: token("--signal"),
    mirror: token("--line-strong"),
    white: dark ? token("--fg-muted") : token("--surface"),
    amb: dark ? 0.22 : 0.42,
    key: dark ? 1.05 : 0.85,
  };
}

/** Analytic soft shadow of a sphere (after Inigo Quilez). */
function softShadow(ro: Vec, rd: Vec, s: Sphere, k: number) {
  const oc: Vec = [ro[0] - s.c[0], ro[1] - s.c[1], ro[2] - s.c[2]];
  const b = dot(oc, rd);
  const h = b * b - (dot(oc, oc) - s.r * s.r);
  const d = Math.sqrt(Math.max(0, s.r * s.r - h)) - s.r;
  const t = -b - Math.sqrt(Math.max(h, 0));
  return t < 0 ? 1 : smooth((2.5 * k * d) / t);
}

/** How much of the sky a sphere hides from a point: the dark contact under each ball. */
function occlusion(p: Vec, n: Vec, s: Sphere) {
  const r: Vec = [s.c[0] - p[0], s.c[1] - p[1], s.c[2] - p[2]];
  const l = Math.hypot(r[0], r[1], r[2]);
  return Math.max(0, Math.min(1, (dot(n, r) * s.r * s.r) / (l * l * l)));
}

function render(canvas: HTMLCanvasElement, pal: Palette, lightX: number, scale: number) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = Math.max(1, Math.round(Math.min(rect.width * dpr, 960) * scale));
  const H = Math.max(1, Math.round((W * rect.height) / rect.width));

  const spheres: Sphere[] = [
    { c: [-0.95, 0.55, 0.75], r: 0.55, col: pal.signal, refl: 0.04, spec: 0.35, shin: 40 },
    { c: [0.42, 0.78, 1.6], r: 0.78, col: pal.mirror, refl: 0.72, spec: 0.9, shin: 160 },
    { c: [1.38, 0.3, 0.35], r: 0.3, col: pal.white, refl: 0, spec: 0.25, shin: 24 },
  ];
  const light: Vec = [lightX * 3.4, 4.2, -1.4];
  let rays = 0;

  const trace = (ro: Vec, rd: Vec, depth: number): Vec => {
    rays++;
    let t = Infinity;
    let hit: Sphere | null = null;
    for (const s of spheres) {
      const oc: Vec = [ro[0] - s.c[0], ro[1] - s.c[1], ro[2] - s.c[2]];
      const b = dot(oc, rd);
      const h = b * b - (dot(oc, oc) - s.r * s.r);
      if (h > 0) {
        const tt = -b - Math.sqrt(h);
        if (tt > 1e-4 && tt < t) {
          t = tt;
          hit = s;
        }
      }
    }
    let floor = false;
    if (rd[1] < -1e-6) {
      const tt = -ro[1] / rd[1];
      if (tt > 0 && tt < t) {
        t = tt;
        hit = null;
        floor = true;
      }
    }
    if (!hit && !floor) return pal.fog;

    const p: Vec = [ro[0] + rd[0] * t, ro[1] + rd[1] * t, ro[2] + rd[2] * t];
    const n: Vec = hit ? norm([p[0] - hit.c[0], p[1] - hit.c[1], p[2] - hit.c[2]]) : [0, 1, 0];
    const base = hit ? hit.col : (Math.floor(p[0] / 0.62) + Math.floor(p[2] / 0.62)) & 1 ? pal.a : pal.b;

    const ld = norm([light[0] - p[0], light[1] - p[1], light[2] - p[2]]);
    const diff = Math.max(0, dot(n, ld));
    const q: Vec = [p[0] + n[0] * 1e-3, p[1] + n[1] * 1e-3, p[2] + n[2] * 1e-3];
    let shadow = 1;
    let occ = 1;
    rays++;
    for (const s of spheres) {
      if (s === hit) continue;
      shadow *= softShadow(q, ld, s, 9);
      occ *= 1 - occlusion(p, n, s);
    }
    const lit = pal.amb * (0.75 + 0.25 * n[1]) * occ + diff * shadow * pal.key;
    let col: Vec = [base[0] * lit, base[1] * lit, base[2] * lit];

    if (hit) {
      const half = norm([ld[0] - rd[0], ld[1] - rd[1], ld[2] - rd[2]]);
      const sp = Math.pow(Math.max(0, dot(n, half)), hit.shin) * hit.spec * shadow;
      col = [col[0] + sp, col[1] + sp, col[2] + sp];
      if (hit.refl > 0 && depth < 2) {
        const fresnel = hit.refl + (1 - hit.refl) * Math.pow(1 - Math.max(0, -dot(rd, n)), 5) * 0.6;
        const k = 2 * dot(rd, n);
        const rc = trace(q, [rd[0] - k * n[0], rd[1] - k * n[1], rd[2] - k * n[2]], depth + 1);
        col = [
          col[0] * (1 - fresnel) + rc[0] * fresnel,
          col[1] * (1 - fresnel) + rc[1] * fresnel,
          col[2] * (1 - fresnel) + rc[2] * fresnel,
        ];
      }
    }
    // Distance fog into the card's own background, so the floor has no horizon line.
    const f = 1 - Math.exp(-Math.max(0, t - 2.6) * 0.16);
    return [col[0] + (pal.fog[0] - col[0]) * f, col[1] + (pal.fog[1] - col[1]) * f, col[2] + (pal.fog[2] - col[2]) * f];
  };

  const ro: Vec = [0, 1.15, -3.4];
  const fw = norm([0.18 - ro[0], 0.62 - ro[1], 1.1 - ro[2]]);
  const right = norm([fw[2], 0, -fw[0]]);
  const up: Vec = [fw[1] * right[2] - fw[2] * right[1], fw[2] * right[0] - fw[0] * right[2], fw[0] * right[1] - fw[1] * right[0]];
  const tanHalf = Math.tan((21 * Math.PI) / 180);
  const aspect = W / H;

  const img = ctx.createImageData(W, H);
  const px = img.data;
  const t0 = performance.now();
  for (let y = 0; y < H; y++) {
    const v = (1 - (2 * (y + 0.5)) / H) * tanHalf;
    for (let x = 0; x < W; x++) {
      const u = ((2 * (x + 0.5)) / W - 1) * tanHalf * aspect;
      const c = trace(ro, norm([fw[0] + u * right[0] + v * up[0], fw[1] + u * right[1] + v * up[1], fw[2] + u * right[2] + v * up[2]]), 0);
      const i = (y * W + x) * 4;
      px[i] = toSrgb(c[0]);
      px[i + 1] = toSrgb(c[1]);
      px[i + 2] = toSrgb(c[2]);
      px[i + 3] = 255;
    }
  }
  const ms = performance.now() - t0;

  if (scale === 1) {
    if (canvas.width !== W || canvas.height !== H) {
      canvas.width = W;
      canvas.height = H;
    }
    ctx.putImageData(img, 0, 0);
  } else {
    // A quick low-resolution pass while the light is moving, scaled up into the full canvas.
    const tmp = document.createElement("canvas");
    tmp.width = W;
    tmp.height = H;
    tmp.getContext("2d")?.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(tmp, 0, 0, canvas.width, canvas.height);
  }
  return { rays, ms };
}

const STRINGS = {
  en: {
    locale: "en-US",
    tracing: "Tracing rays…",
    stat: "{rays} rays in {ms} ms",
    label:
      "A ray traced scene rendered live: a yellow sphere, a mirror sphere and a small white sphere on a checkered floor. Moving across it moves the light.",
  },
  de: {
    locale: "de-DE",
    tracing: "Strahlen werden verfolgt…",
    stat: "{rays} Strahlen in {ms} ms",
    label:
      "Live gerenderte Raytracing-Szene: eine gelbe Kugel, eine spiegelnde Kugel und eine kleine weiße Kugel auf einem Schachbrettboden. Wer darüberfährt, bewegt das Licht.",
  },
} satisfies Record<Lang, unknown>;

export default function RayTracer({ lang }: { lang: Lang }) {
  const t = STRINGS[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [result, setResult] = useState<{ rays: number; ms: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let palette = readPalette();
    let lightX = -0.45;
    let frame = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;

    const full = () => {
      const next = render(canvas, palette, lightX, 1);
      if (next) setResult(next);
    };
    const settle = () => {
      clearTimeout(idle);
      idle = setTimeout(full, 140);
    };
    const moveLight = (clientX: number) => {
      const r = canvas.getBoundingClientRect();
      lightX = Math.max(-1, Math.min(1, ((clientX - r.left) / r.width) * 2 - 1));
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          render(canvas, palette, lightX, 0.4);
        });
      settle();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse" || e.buttons) moveLight(e.clientX);
    };
    const onDown = (e: PointerEvent) => moveLight(e.clientX);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);

    // next-themes swaps the class on <html>; re-read the tokens once it has.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      full();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    let width = 0;
    const resizeObserver = new ResizeObserver((entries) => {
      const w = Math.round(entries[0].contentRect.width);
      if (w && w !== width) {
        width = w;
        settle();
      }
    });
    resizeObserver.observe(canvas);

    full();

    return () => {
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={t.label}
        className="block size-full cursor-ew-resize touch-pan-y"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-3 left-3 inline-flex max-w-[calc(100%-24px)] items-center rounded-lg border border-line bg-surface px-2.5 py-[5px] text-xs font-[550] tabular-nums shadow-raised"
      >
        {result
          ? t.stat
              .replace("{rays}", result.rays.toLocaleString(t.locale))
              .replace("{ms}", String(Math.max(1, Math.round(result.ms))))
          : t.tracing}
      </span>
    </>
  );
}
