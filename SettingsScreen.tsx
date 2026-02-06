
import React, { useState } from 'react';
import { AccentColor, ToggleSize, ColorDepth, SettingsState } from '../types';
import { Palette, Zap, Power, Calendar, ShieldAlert, Smartphone, Battery, Info, RefreshCcw, Github } from 'lucide-react';
import { ACCENT_COLORS, COLOR_DEPTH_VALUES } from '../constants';

interface SettingsScreenProps {
  settings: SettingsState;
  onUpdateSettings: (updates: Partial<SettingsState>) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ settings, onUpdateSettings }) => {
  const currentTheme = ACCENT_COLORS[settings.accentColor];
  const [updating, setUpdating] = useState(false);

  const colors: AccentColor[] = ['neon-blue', 'electric-purple'];
  const sizes: ToggleSize[] = ['Normal', 'Large', 'Extra Large'];
  const depths: ColorDepth[] = ['Deep Black', 'Balanced Dark', 'Soft Dark Gray'];

  const handleUpdateCheck = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      alert("You are on the latest version: v1.0.0 Stable");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen px-6 pt-8 pb-32 space-y-8 animate-in fade-in duration-500">
      <h2 className="text-2xl font-black">Preferences</h2>

      {/* Appearance Section */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-zinc-400">
          <Palette size={18} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Visual Interface</h3>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-6 space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Brand Accent</label>
            <div className="flex space-x-4">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => onUpdateSettings({ accentColor: c })}
                  className={`w-12 h-12 rounded-2xl border-2 transition-all active:scale-90 ${
                    settings.accentColor === c ? 'border-white scale-110 shadow-2xl' : 'border-transparent opacity-40 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: ACCENT_COLORS[c].primary, boxShadow: settings.accentColor === c ? `0 0 20px ${ACCENT_COLORS[c].glow}` : 'none' }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center justify-between">
              Color Depth
              <span className={currentTheme.text}>{settings.colorDepth}</span>
            </label>
            <div className="flex flex-col space-y-2">
              <input 
                type="range"
                min="0"
                max="2"
                step="1"
                value={depths.indexOf(settings.colorDepth)}
                onChange={(e) => onUpdateSettings({ colorDepth: depths[parseInt(e.target.value)] })}
                className={`w-full h-1.5 rounded-full appearance-none bg-zinc-800 accent-current ${currentTheme.text}`}
              />
              <div className="flex justify-between text-[9px] text-zinc-600 font-bold px-1">
                <span>PITCH</span>
                <span>SOFT</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Toggle Dimensions</label>
            <div className="flex bg-black p-1 rounded-2xl border border-zinc-800">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => onUpdateSettings({ toggleSize: s })}
                  className={`flex-1 py-2 text-[10px] font-black rounded-xl transition-all ${
                    settings.toggleSize === s ? `${currentTheme.bg} text-black` : 'text-zinc-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Smart Triggers */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-zinc-400">
          <Zap size={18} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Smart Triggers</h3>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] overflow-hidden divide-y divide-zinc-800">
          <div className="p-5 flex items-center justify-between group active:bg-white/5">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-white"><Battery size={18} /></div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Battery Saver Mode</span>
                <span className="text-[10px] text-zinc-500">Enable when battery &lt; 30%</span>
              </div>
            </div>
            <button 
              onClick={() => onUpdateSettings({ batteryTrigger: !settings.batteryTrigger })}
              className={`w-12 h-6 rounded-full relative transition-colors ${settings.batteryTrigger ? currentTheme.bg : 'bg-zinc-800'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.batteryTrigger ? 'translate-x-6' : ''}`} />
            </button>
          </div>
          <div className="p-5 flex items-center justify-between group active:bg-white/5">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-xl bg-zinc-800 text-zinc-400 group-hover:text-white"><Calendar size={18} /></div>
              <div className="flex flex-col">
                <span className="text-sm font-bold">Auto Night Cycle</span>
                <span className="text-[10px] text-zinc-500">Sync with local sunset/sunrise</span>
              </div>
            </div>
            <button 
              onClick={() => onUpdateSettings({ sunsetTrigger: !settings.sunsetTrigger })}
              className={`w-12 h-6 rounded-full relative transition-colors ${settings.sunsetTrigger ? currentTheme.bg : 'bg-zinc-800'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.sunsetTrigger ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* Version & About */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-zinc-400">
          <Info size={18} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Application Info</h3>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-6 space-y-4">
          <div className="flex items-center justify-between">
             <div>
                <p className="text-sm font-bold">Darkify Pro</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Version 1.0.0 Stable</p>
             </div>
             <button 
                onClick={handleUpdateCheck}
                disabled={updating}
                className={`p-3 rounded-2xl bg-zinc-800 text-zinc-400 hover:text-white transition-all ${updating ? 'animate-spin' : ''}`}
             >
                <RefreshCcw size={18} />
             </button>
          </div>
          <div className="h-[1px] bg-zinc-800 w-full" />
          <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
             <span>Developer</span>
             <span className="text-zinc-300">Aesthetics Lab</span>
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
             <span>Open Source</span>
             <button className="flex items-center space-x-1 text-zinc-300">
                <Github size={12} />
                <span>Repository</span>
             </button>
          </div>
        </div>
      </section>

      <button className="w-full bg-red-500/10 text-red-500 border border-red-500/20 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all active:scale-95">
        Erase All Data & Preferences
      </button>
      
      <p className="text-center text-[9px] text-zinc-700 font-black uppercase tracking-[0.3em] pb-8">
        MADE FOR AMOLED • PRIVACY FIRST
      </p>
    </div>
  );
};

export default SettingsScreen;
