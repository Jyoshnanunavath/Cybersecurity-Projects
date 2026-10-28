export default function DomainMesh() {
  return (
    <svg
      viewBox="0 0 480 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram of three connected domains: main website, customer portal, and payment application, each behind a lock boundary"
    >
      {/* connecting lines */}
      <path d="M240 90 L120 230" stroke="#D8DCE3" strokeWidth="1.5" />
      <path d="M240 90 L360 230" stroke="#D8DCE3" strokeWidth="1.5" />
      <path d="M120 230 L240 370" stroke="#D8DCE3" strokeWidth="1.5" />
      <path d="M360 230 L240 370" stroke="#D8DCE3" strokeWidth="1.5" />
      <path d="M120 230 L360 230" stroke="#D8DCE3" strokeWidth="1.5" strokeDasharray="3 5" />

      {/* traveling pulse on the main->portal edge */}
      <circle r="3.5" fill="#2454FF">
        <animateMotion dur="3.5s" repeatCount="indefinite" path="M240 90 L120 230" />
      </circle>
      <circle r="3.5" fill="#157A5E">
        <animateMotion dur="4.2s" repeatCount="indefinite" path="M240 90 L360 230" />
      </circle>

      {/* node: main website */}
      <g>
        <rect x="188" y="52" width="104" height="76" rx="6" fill="#101826" />
        <text x="240" y="82" textAnchor="middle" fill="#F6F7F9" fontSize="11" fontFamily="IBM Plex Mono, monospace">www.</text>
        <text x="240" y="98" textAnchor="middle" fill="#F6F7F9" fontSize="11" fontFamily="IBM Plex Mono, monospace">meridianpay</text>
        <text x="240" y="114" textAnchor="middle" fill="#8792A6" fontSize="9" fontFamily="IBM Plex Mono, monospace">.local</text>
      </g>

      {/* node: customer portal */}
      <g>
        <rect x="56" y="196" width="128" height="76" rx="6" fill="#FFFFFF" stroke="#D8DCE3" />
        <path d="M120 218 a10 10 0 0 1 10 10 v4 h-20 v-4 a10 10 0 0 1 10 -10 z" fill="none" stroke="#2454FF" strokeWidth="2" />
        <rect x="108" y="232" width="24" height="18" rx="2.5" fill="#2454FF" />
        <text x="120" y="266" textAnchor="middle" fill="#101826" fontSize="10.5" fontFamily="IBM Plex Mono, monospace">customer.</text>
      </g>

      {/* node: payment app */}
      <g>
        <rect x="296" y="196" width="128" height="76" rx="6" fill="#FFFFFF" stroke="#D8DCE3" />
        <path d="M360 218 a10 10 0 0 1 10 10 v4 h-20 v-4 a10 10 0 0 1 10 -10 z" fill="none" stroke="#157A5E" strokeWidth="2" />
        <rect x="348" y="232" width="24" height="18" rx="2.5" fill="#157A5E" />
        <text x="360" y="266" textAnchor="middle" fill="#101826" fontSize="10.5" fontFamily="IBM Plex Mono, monospace">pay.</text>
      </g>

      {/* node: encrypted transport ground */}
      <g>
        <rect x="164" y="340" width="152" height="60" rx="6" fill="#E9EEFF" stroke="#2454FF" strokeWidth="1" />
        <text x="240" y="365" textAnchor="middle" fill="#1B3FC4" fontSize="10" fontFamily="IBM Plex Mono, monospace">TLS 1.3</text>
        <text x="240" y="381" textAnchor="middle" fill="#1B3FC4" fontSize="9" fontFamily="IBM Plex Mono, monospace">encrypted in transit</text>
      </g>
    </svg>
  );
}
