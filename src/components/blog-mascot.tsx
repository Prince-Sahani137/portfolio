export function BlogMascot({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 960 375"
      role="img"
      aria-label="A round-headed character in a hoodie dozing over a laptop, a cat asleep beside them and coffee steaming nearby."
      className={className}
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground/70"
      >
        {/* desk */}
        <path d="M90 312h780" />
        <path d="M150 312v28M810 312v28" opacity="0.5" />

        {/* laptop screen */}
        <rect
          x="338"
          y="196"
          width="238"
          height="104"
          rx="10"
          fill="var(--card)"
        />
        <rect
          x="356"
          y="214"
          width="202"
          height="68"
          rx="5"
          fill="var(--muted)"
          stroke="none"
        />
        <g stroke="currentColor" strokeWidth="3" opacity="0.55">
          <path d="M370 230h70M370 243h110M370 256h54" />
        </g>
        <path d="M310 300h294l-16 12H326l-16-12Z" fill="var(--card)" />

        {/* character hoodie */}
        <path
          d="M296 302c-8-58 10-96 62-104 52-8 84 26 86 104Z"
          fill="var(--card)"
        />
        <circle cx="358" cy="168" r="54" fill="var(--muted)" />
        <path
          d="M304 176c0-38 24-62 54-62s54 24 54 62c0 10-4 20-10 27-10-14-24-22-44-22s-34 8-44 22c-6-7-10-17-10-27Z"
          fill="var(--card)"
        />
        <circle cx="358" cy="178" r="38" fill="var(--muted)" />
        {/* sleeping face */}
        <path d="M341 176c3 4 8 4 11 0M366 176c3 4 8 4 11 0" />
        <path d="M353 192c3 3 7 3 10 0" opacity="0.7" />
        {/* hood drawstrings */}
        <path d="M340 220v16M378 220v16" opacity="0.5" />

        {/* arms on the desk */}
        <path
          d="M306 268c22 6 34 20 38 34M412 268c-22 6-34 20-38 34"
          fill="var(--card)"
        />
        <path d="M338 300c8-6 34-6 42 0" fill="var(--card)" />

        {/* zzz */}
        <g strokeWidth="3" opacity="0.6">
          <path d="M430 118h16l-16 16h16" />
          <path d="M456 92h12l-12 12h12" />
          <path d="M478 70h9l-9 9h9" />
        </g>

        {/* coffee */}
        <rect x="176" y="266" width="44" height="40" rx="6" fill="var(--card)" />
        <path d="M220 276h10a10 10 0 0 1 0 20h-10" />
        <path d="M188 252c-4-8 4-12 0-20M204 252c-4-8 4-12 0-20" opacity="0.55" />

        {/* cat */}
        <path
          d="M604 300c0-18 20-30 46-30s46 12 46 30"
          fill="var(--card)"
        />
        <path d="M650 270c0-16 12-28 28-28s28 12 28 28" fill="var(--muted)" />
        <path d="M660 246l-2-16 14 9M696 246l2-16-14 9" fill="var(--muted)" />
        <path d="M668 264c2 2 5 2 7 0M681 264c2 2 5 2 7 0" opacity="0.8" />
        <path d="M678 272c2 2 4 2 6 0" opacity="0.8" />
        <path d="M734 292c16 0 24 8 18 16" />
        {/* whiskers */}
        <path d="M650 272l-14-3M650 277l-14 3M708 272l14-3M708 277l14 3" opacity="0.5" />

        {/* plant */}
        <path d="M768 312v-34" />
        <path d="M768 292c-14 0-22-8-22-20 12 0 22 8 22 20Z" fill="var(--card)" />
        <path d="M768 284c14 0 22-8 22-20-12 0-22 8-22 20Z" fill="var(--card)" />
        <path d="M752 312h32l-4-18h-24l-4 18Z" fill="var(--muted)" />
      </g>
    </svg>
  );
}
