import { Fragment } from "react";

/** `[label](link)` or `**highlight**`. */
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

/**
 * Renders the two kinds of formatting the content file allows inside a text:
 * `[label](link)` for a link and `**text**` for a highlighted figure. Links to
 * other sites open in a new tab; `#p-...` links jump to a project on the page.
 */
export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const start = match.index;
    if (start > last) parts.push(<Fragment key={`t${last}`}>{text.slice(last, start)}</Fragment>);

    const [whole, label, href, highlight] = match;
    if (href) {
      const external = /^https?:\/\//.test(href);
      parts.push(
        <a
          key={start}
          className="link"
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {label}
        </a>,
      );
    } else {
      parts.push(
        <mark key={start} className="rounded-[3px] bg-signal-soft px-[3px] font-semibold whitespace-nowrap text-fg">
          {highlight}
        </mark>,
      );
    }
    last = start + whole.length;
  }

  if (last < text.length) parts.push(<Fragment key={`t${last}`}>{text.slice(last)}</Fragment>);
  return <>{parts}</>;
}
