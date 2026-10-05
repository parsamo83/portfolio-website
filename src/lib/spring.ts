/**
 * Samples a damped spring into a CSS `linear()` easing and its settle time.
 *
 * The values in `globals.css` (`--spring-select`, `--spring-press`) were made
 * with this function. To change how the dock pill or a button press moves,
 * run it with new parameters and paste the output there:
 *
 *   node -e "..." or call springEasing({ damping: 18, stiffness: 240, mass: 0.9 })
 *
 *   select  { damping: 18, stiffness: 240, mass: 0.9 }  a little life, still crisp
 *   press   { damping: 20, stiffness: 380, mass: 0.6 }  tight, almost no overshoot
 */
export function springEasing(
  { damping, stiffness, mass }: { damping: number; stiffness: number; mass: number },
  samples = 32,
) {
  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));

  const position = (t: number) => {
    if (zeta < 1) {
      const wd = w0 * Math.sqrt(1 - zeta * zeta);
      return 1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));
    }
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t);
  };

  // Settled once the spring stays within 0.2% of its target.
  let settle = 0;
  for (let t = 0; t < 3; t += 0.004) if (Math.abs(1 - position(t)) > 0.002) settle = t;
  settle += 0.004;

  const points = Array.from({ length: samples + 1 }, (_, i) =>
    i === samples ? 1 : +position((settle * i) / samples).toFixed(3),
  );

  return { easing: `linear(${points.join(", ")})`, durationMs: Math.round(settle * 1000) };
}
