interface FootballLogoProps {
  className?: string;
  size?: number;
}

export default function FootballLogo({ className = "", size = 32 }: FootballLogoProps) {
  return (
    <div className="relative group">
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className={`${className} transition-all duration-300 group-hover:scale-105`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Shield gradient */}
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
          </linearGradient>
          
          {/* Gold accent gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
          
          {/* Drop shadow */}
          <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
          
          {/* Inner glow */}
          <filter id="innerGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main shield shape */}
        <path
          d="M60 10 L95 25 L95 65 Q95 85 60 105 Q25 85 25 65 L25 25 Z"
          fill="url(#shieldGradient)"
          stroke="white"
          strokeWidth="2"
          filter="url(#dropShadow)"
          className="transition-all duration-300"
        />
        
        {/* Inner shield border */}
        <path
          d="M60 15 L90 28 L90 63 Q90 80 60 98 Q30 80 30 63 L30 28 Z"
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.6"
        />
        
        {/* Football/Soccer ball in center */}
        <g transform="translate(60, 50)">
          <circle
            cx="0"
            cy="0"
            r="18"
            fill="white"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-all duration-300 group-hover:fill-opacity-95"
          />
          
          {/* Soccer ball pattern */}
          <polygon
            points="0,-12 8,-4 5,8 -5,8 -8,-4"
            fill="currentColor"
            opacity="0.8"
          />
          
          {/* Hexagonal lines */}
          <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6">
            <path d="M0,-12 L-8,-4 L-5,8" />
            <path d="M0,-12 L8,-4 L5,8" />
            <path d="M-8,-4 L-5,8 L5,8 L8,-4" />
          </g>
        </g>
        
        {/* Ethiopian flag colors accent */}
        <g className="transition-all duration-300 group-hover:opacity-100" opacity="0.8">
          <rect x="35" y="20" width="50" height="3" fill="#009639" />
          <rect x="35" y="24" width="50" height="3" fill="#FEDD00" />
          <rect x="35" y="28" width="50" height="3" fill="#DA020E" />
        </g>
        
        {/* Crown/Star element */}
        <g transform="translate(60, 25)">
          <polygon
            points="0,-8 3,-2 9,-2 4,2 6,8 0,4 -6,8 -4,2 -9,-2 -3,-2"
            fill="url(#goldGradient)"
            stroke="white"
            strokeWidth="0.5"
            className="transition-all duration-300 group-hover:scale-110"
            filter="url(#innerGlow)"
          />
        </g>
        
        {/* Bottom banner */}
        <g transform="translate(60, 85)">
          <path
            d="M-25,0 L25,0 L20,8 L-20,8 Z"
            fill="white"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.9"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fontSize="6"
            fontWeight="bold"
            fill="currentColor"
            className="select-none"
          >
            ETHIO
          </text>
        </g>
        
        {/* Decorative elements */}
        <g className="opacity-0 group-hover:opacity-60 transition-opacity duration-500">
          {/* Side flourishes */}
          <path
            d="M20,40 Q15,45 20,50 Q15,55 20,60"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M100,40 Q105,45 100,50 Q105,55 100,60"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </g>
      </svg>
    </div>
  );
}
