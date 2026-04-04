interface LogoProps {
  size?: number;
  className?: string;
}

export function LogoIcon({ size = 40, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="48" height="48" rx="12" fill="url(#logo-grad)" />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF2D78" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      {/* Note head */}
      <ellipse
        cx="13"
        cy="33"
        rx="5.5"
        ry="4"
        fill="white"
        transform="rotate(-10 13 33)"
      />
      {/* Stem */}
      <line
        x1="18"
        y1="31.5"
        x2="18"
        y2="12"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Flag */}
      <path
        d="M18 12 C24 14, 27 20, 21 25"
        stroke="white"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Connection dots */}
      <circle cx="31" cy="16" r="3" fill="white" />
      <circle cx="38" cy="26" r="3" fill="white" />
      {/* Dashed connector lines */}
      <line
        x1="21"
        y1="15"
        x2="28"
        y2="15.5"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <line
        x1="23"
        y1="22"
        x2="35"
        y2="25"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="2 2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-white font-medium tracking-tight ${className}`}
      style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "-0.5px" }}
    >
      tunect
    </span>
  );
}

export function Logo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoIcon size={size} />
      <LogoWordmark className="text-xl" />
    </div>
  );
}
