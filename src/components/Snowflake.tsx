import React from 'react';

interface SnowflakeProps {
  size: number;
}

export const Snowflake: React.FC<SnowflakeProps> = React.memo(({ size }) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className="text-cyan-100/90 drop-shadow-[0_0_8px_rgba(165,243,252,0.6)] filter"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Core axes */}
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
        
        {/* Decorative crystal branches */}
        <path d="M12 5l2.5 2.5M12 5l-2.5 2.5" />
        <path d="M12 19l2.5-2.5M12 19l-2.5-2.5" />
        <path d="M5 12l2.5 2.5M5 12l2.5-2.5" />
        <path d="M19 12l-2.5 2.5M19 12l-2.5-2.5" />
        
        {/* Secondary branch accents */}
        <path d="M7 7l2 1M7 7l1 2" />
        <path d="M17 17l-2-1M17 17l-1-2" />
        <path d="M17 7l-2 1M17 7l-1 2" />
        <path d="M7 17l2-1M7 17l1-2" />

        {/* Central crystal node */}
        <circle cx="12" cy="12" r="1.5" fill="currentColor" className="text-cyan-50" />
      </svg>
    </div>
  );
});

Snowflake.displayName = 'Snowflake';
