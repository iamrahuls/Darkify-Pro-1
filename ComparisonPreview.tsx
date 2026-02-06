
import React, { useState } from 'react';
import { AccentColor } from '../types';
import { ACCENT_COLORS } from '../constants';

interface ComparisonPreviewProps {
  accentColor: AccentColor;
}

const ComparisonPreview: React.FC<ComparisonPreviewProps> = ({ accentColor }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const theme = ACCENT_COLORS[accentColor];

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden relative h-48 group">
      {/* Dark Side (Always underneath) */}
      <div className="absolute inset-0 bg-black flex flex-col items-center justify-center p-4">
        <div className="w-full space-y-2">
          <div className="h-4 w-3/4 bg-zinc-800 rounded-full" />
          <div className="h-4 w-1/2 bg-zinc-800 rounded-full" />
          <div className={`h-8 w-1/3 rounded-xl mt-4 ${theme.bg}`} />
        </div>
        <span className="absolute bottom-2 right-4 text-[10px] font-bold text-zinc-600">DARK PREVIEW</span>
      </div>

      {/* Light Side (Clipped) */}
      <div 
        className="absolute inset-0 bg-zinc-100 flex flex-col items-center justify-center p-4"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <div className="w-full space-y-2">
          <div className="h-4 w-3/4 bg-zinc-300 rounded-full" />
          <div className="h-4 w-1/2 bg-zinc-300 rounded-full" />
          <div className="h-8 w-1/3 bg-zinc-400 rounded-xl mt-4" />
        </div>
        <span className="absolute bottom-2 left-4 text-[10px] font-bold text-zinc-400">ORIGINAL</span>
      </div>

      {/* Slider Control */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(parseInt(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-lg pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-xl">
          <div className="w-1 h-3 bg-zinc-400 rounded-full mx-0.5" />
          <div className="w-1 h-3 bg-zinc-400 rounded-full mx-0.5" />
        </div>
      </div>
    </div>
  );
};

export default ComparisonPreview;
