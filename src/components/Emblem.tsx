export function Emblem({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ตราสัญลักษณ์ กองช่าง องค์การบริหารส่วนตำบลไร่ใต้"
    >
      {/* Outer Seal Ring */}
      <circle cx="60" cy="60" r="54" fill="#123b35" stroke="#d6b96c" strokeWidth="3" />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="#16473f"
        stroke="#d6b96c"
        strokeWidth="1.25"
        strokeDasharray="3 3"
      />

      {/* Engineering Gear Motif */}
      <path
        d="M60 28L63.5 33.5L70 32L71 38.5L77.5 39.5L76 46L81.5 49.5L78 55L81.5 60.5L76 64L77.5 70.5L71 71.5L70 78L63.5 76.5L60 82L56.5 76.5L50 78L49 71.5L42.5 70.5L44 64L38.5 60.5L42 55L38.5 49.5L44 46L42.5 39.5L49 38.5L50 32L56.5 33.5L60 28Z"
        stroke="#d6b96c"
        strokeWidth="1.8"
        fill="#123b35"
        strokeLinejoin="round"
      />

      {/* Architectural Roof / Pavilion & Drafting Compass */}
      <path
        d="M44 63L60 45L76 63"
        stroke="#f7f2e2"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 63V72H70V63"
        stroke="#f7f2e2"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="60" y1="40" x2="60" y2="57" stroke="#d6b96c" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="60" cy="57" r="2.5" fill="#d6b96c" />

      {/* Base Ribbon */}
      <path
        d="M28 88C40 96 80 96 92 88"
        stroke="#d6b96c"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
