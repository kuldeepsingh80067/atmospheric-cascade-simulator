import React from 'react';

interface BalloonProps {
  size: number;
  color: string;
}

export const Balloon: React.FC<BalloonProps> = React.memo(({ size, color }) => {
  // Derive gradient IDs dynamically
  const gradientId = `balloon-grad-${color.replace('#', '')}`;
  
  return (
    <div
      style={{ width: `${size}px`, height: `${size * 1.4}px` }}
      className="relative drop-shadow-[0_6px_10px_rgba(0,0,0,0.3)] select-none filter"
    >
      <svg
        viewBox="0 0 24 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* A high-end radial gradient to simulate realistic 3D gloss */}
          <radialGradient id={gradientId} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="25%" stopColor={color} stopOpacity="0.95" />
            <stop offset="85%" stopColor={color} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.45" />
          </radialGradient>
        </defs>

        {/* Wavy string beneath the balloon */}
        <path
          d="M12 24 C14 27, 9 30, 12 33 C15 35, 10 38, 12 42"
          stroke="#9ca3af"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          className="opacity-70 animate-pulse"
        />

        {/* Balloon tie node / knot at the base */}
        <path
          d="M11 23 L13 23 L12 25.5 Z"
          fill={color}
          stroke="#000000"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />

        {/* Glossy main balloon body */}
        <ellipse
          cx="12"
          cy="12"
          rx="9.5"
          ry="11.5"
          fill={`url(#${gradientId})`}
        />

        {/* Refined primary reflections */}
        <ellipse
          cx="8.5"
          cy="8.5"
          rx="2.5"
          ry="3.5"
          fill="#ffffff"
          className="opacity-60"
          style={{ transform: 'rotate(-15deg)', transformOrigin: '8.5px 8.5px' }}
        />
      </svg>
    </div>
  );
});

Balloon.displayName = 'Balloon';
