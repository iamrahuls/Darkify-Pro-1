
import React from 'react';
import { AccentColor, ToggleSize } from '../types';
import { ACCENT_COLORS } from '../constants';

interface BigToggleProps {
  enabled: boolean;
  onToggle: () => void;
  accentColor: AccentColor;
  size: ToggleSize;
}

const BigToggle: React.FC<BigToggleProps> = ({ enabled, onToggle, accentColor, size }) => {
  const theme = ACCENT_COLORS[accentColor];
  
  const sizeClasses = {
    'Normal': 'w-24 h-12',
    'Large': 'w-32 h-16',
    'Extra Large': 'w-40 h-20'
  };

  const handleToggle = () => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    onToggle();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <button
        onClick={handleToggle}
        className={`relative rounded-full transition-all duration-500 ease-in-out border-2 ${
          enabled ? theme.border : 'border-zinc-700'
        } ${sizeClasses[size]}`}
        style={{
          boxShadow: enabled ? `0 0 30px ${theme.glow}` : 'none'
        }}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 h-[80%] aspect-square rounded-full transition-all duration-500 ease-in-out ${
            enabled ? `${theme.bg} translate-x-[calc(100%-8px)] scale-110` : 'bg-zinc-600 translate-x-[4px] scale-90'
          }`}
          style={{
            boxShadow: enabled ? `0 0 15px ${theme.glow}` : 'none'
          }}
        />
      </button>
      <span className={`text-center font-bold tracking-wider text-sm transition-opacity duration-300 ${enabled ? 'opacity-100' : 'opacity-60'}`}>
        {enabled ? 'SYSTEM FORCE DARK ACTIVE' : 'FORCE DARK DISABLED'}
      </span>
    </div>
  );
};

export default BigToggle;
