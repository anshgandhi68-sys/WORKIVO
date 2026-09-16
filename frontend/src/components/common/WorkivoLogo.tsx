import React from 'react';

interface WorkivoLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'badge' | 'icon-only' | 'full';
}

/**
 * Official WORKIVO Hot Air Balloon Emblem & Brand Mark.
 * Exact match to official brand artwork: "Small Tasks, Big Relief."
 */
export const WorkivoBalloonIcon: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-6 h-6",
  size
}) => {
  return (
    <img 
      src="/workivo-balloon-icon.png" 
      alt="WORKIVO Logo" 
      className={`object-contain select-none ${className}`}
      style={size ? { width: size, height: size } : undefined}
    />
  );
};

export const WorkivoLogo: React.FC<WorkivoLogoProps> = ({
  className = "",
  size = 'md',
  variant = 'badge'
}) => {
  const sizeClasses = {
    sm: { box: 'w-7 h-7 rounded-lg p-1', text: 'text-base', sub: 'text-[8.5px]' },
    md: { box: 'w-9 h-9 rounded-xl p-1.5', text: 'text-xl', sub: 'text-[9.5px]' },
    lg: { box: 'w-11 h-11 rounded-2xl p-2', text: 'text-2xl', sub: 'text-xs' },
    xl: { box: 'w-14 h-14 rounded-2xl p-2.5', text: 'text-3xl', sub: 'text-sm' },
  }[size];

  if (variant === 'full') {
    return (
      <img 
        src="/workivo-logo-purple.png" 
        alt="WORKIVO — Small Tasks, Big Relief." 
        className={`h-9 sm:h-10 object-contain rounded-xl shadow-xs ${className}`}
      />
    );
  }

  if (variant === 'icon-only') {
    return (
      <div className={`bg-[#5415A0] flex items-center justify-center shadow-sm ${sizeClasses.box} ${className}`}>
        <WorkivoBalloonIcon className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 group select-none ${className}`}>
      {/* Official Hot Air Balloon Emblem Box */}
      <div className={`bg-[#5415A0] group-hover:bg-[#430E7E] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all overflow-hidden ${sizeClasses.box}`}>
        <WorkivoBalloonIcon className="w-full h-full group-hover:scale-105 transition-transform" />
      </div>

      {/* Brand Title and Cooperative Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-slate-900 group-hover:text-[#5415A0] transition-colors leading-none ${sizeClasses.text}`}>
            WORKIVO
          </span>
          <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-purple-100 text-[#5415A0] tracking-wider uppercase">
            Co-op
          </span>
        </div>
        <span className={`font-bold text-slate-400 group-hover:text-purple-700 transition-colors tracking-tight leading-tight mt-0.5 ${sizeClasses.sub}`}>
          Small Tasks, Big Relief.
        </span>
      </div>
    </div>
  );
};
