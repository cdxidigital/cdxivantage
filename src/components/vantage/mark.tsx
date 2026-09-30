import { useId } from "react";

export function VantageMark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const gradC = `vmC-${uid}`;
  const gradA = `vmA-${uid}`;
  return (
    <svg
      className={className}
      viewBox="20 10 118 80"
      width="38"
      height="26"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={gradC} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7F00FF" />
          <stop offset="100%" stopColor="#0088FF" />
        </linearGradient>
        <linearGradient id={gradA} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0088FF" />
          <stop offset="100%" stopColor="#00FFFF" />
        </linearGradient>
      </defs>
      <path
        d="M 60 10 A 40 40 0 0 0 20 50 A 40 40 0 0 0 60 90 L 60 70 A 20 20 0 0 1 40 50 A 20 20 0 0 1 60 30 Z"
        fill={`url(#${gradC})`}
      />
      <path d="M 70 10 L 110 50 L 70 90 L 98 90 L 138 50 L 98 10 Z" fill={`url(#${gradA})`} />
    </svg>
  );
}

export function VantageMarkMono({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="20 10 118 80"
      width="38"
      height="26"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M 60 10 A 40 40 0 0 0 20 50 A 40 40 0 0 0 60 90 L 60 70 A 20 20 0 0 1 40 50 A 20 20 0 0 1 60 30 Z"
        fill="currentColor"
      />
      <path d="M 70 10 L 110 50 L 70 90 L 98 90 L 138 50 L 98 10 Z" fill="currentColor" />
    </svg>
  );
}

export function VantageLockup({
  stacked = false,
  tagline = false,
  className = "",
}: {
  stacked?: boolean;
  tagline?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`vantage-lockup ${stacked ? "stacked" : ""} ${className}`.trim()}
      aria-label="cdxi vantage"
    >
      <VantageMark className="vantage-lockup-mark" />
      <div className="vantage-lockup-type">
        <strong>
          <span className="cdxi">cdxi</span> <em>|</em> vantage
        </strong>
        {tagline && <small>The business operating platform</small>}
      </div>
    </div>
  );
}
