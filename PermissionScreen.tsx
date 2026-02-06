
import React from 'react';
import { ShieldCheck, EyeOff, Database, CheckCircle2 } from 'lucide-react';
import { AccentColor } from '../types';
import { ACCENT_COLORS } from '../constants';

interface PermissionScreenProps {
  onGrant: () => void;
  accentColor: AccentColor;
}

const PermissionScreen: React.FC<PermissionScreenProps> = ({ onGrant, accentColor }) => {
  const theme = ACCENT_COLORS[accentColor];

  return (
    <div className="flex flex-col min-h-screen px-8 pt-16 pb-12 bg-black animate-in fade-in duration-500">
      <div className="text-center space-y-4 mb-12">
        <div className={`mx-auto w-20 h-20 rounded-3xl ${theme.bg} bg-opacity-20 flex items-center justify-center`}>
          <ShieldCheck size={40} className={theme.text} />
        </div>
        <h1 className="text-3xl font-black tracking-tight">Your Privacy Matters</h1>
        <p className="text-zinc-500 text-sm">
          Before we begin, we want to be 100% transparent about how Darkify Pro works.
        </p>
      </div>

      <div className="space-y-6 flex-1">
        <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-3xl flex items-start space-x-4">
          <EyeOff className="text-zinc-500 shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-bold text-sm">No Data Tracking</h3>
            <p className="text-zinc-500 text-xs">We never collect your browsing history, messages, or usage patterns.</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-3xl flex items-start space-x-4">
          <Database className="text-zinc-500 shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-bold text-sm">On-Device Only</h3>
            <p className="text-zinc-500 text-xs">All dark mode transformations happen locally. No cloud processing involved.</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-3xl flex items-start space-x-4">
          <CheckCircle2 className="text-zinc-500 shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-bold text-sm">No Ads</h3>
            <p className="text-zinc-500 text-xs">Your core experience is always ad-free and optimized for speed.</p>
          </div>
        </div>
      </div>

      <div className="pt-8 space-y-4">
        <button 
          onClick={onGrant}
          className={`w-full py-4 rounded-3xl font-bold text-black transition-transform active:scale-95 ${theme.bg}`}
        >
          Grant Accessibility Access
        </button>
        <p className="text-[10px] text-zinc-600 text-center uppercase tracking-widest font-bold">
          SECURED BY SYSTEM-LEVEL KERNEL
        </p>
      </div>
    </div>
  );
};

export default PermissionScreen;
