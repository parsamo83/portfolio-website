export type IconProps = React.SVGAttributes<SVGElement>;

/** Brand marks that lucide does not ship. */
export const Icons = {
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M5.2 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.5 9h3.4v11.5H3.5V9Zm5.6 0h3.3v1.6h.05c.46-.87 1.58-1.8 3.26-1.8 3.48 0 4.12 2.3 4.12 5.27v6.43h-3.4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.18 1.48-2.18 3v5.8H9.1V9Z" />
    </svg>
  ),
  loudpin: (props: IconProps) => (
    <svg viewBox="0 0 1024 1024" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id="loudpin-violet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9669F0" />
          <stop offset="1" stopColor="#7A38DE" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="#0E0D1B" />
      <path
        fill="url(#loudpin-violet)"
        fillRule="evenodd"
        d="M505 792 C470 735 284.5 620 284.5 468 A227.5 227.5 0 0 1 739.5 468 C739.5 620 554 735 519 792 C516 797 508 797 505 792 Z M420 412 a58 58 0 1 0 0 116 a58 58 0 1 0 0-116 Z M512 372 a68 68 0 1 0 0 136 a68 68 0 1 0 0-136 Z M604 412 a58 58 0 1 0 0 116 a58 58 0 1 0 0-116 Z M366 566 h292 v44 h-292 Z"
      />
    </svg>
  ),
};
