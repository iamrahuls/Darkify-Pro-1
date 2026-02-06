
import React, { useState, useEffect } from 'react';
import BigToggle from './BigToggle';
import ComparisonPreview from './ComparisonPreview';
import { AccentColor, SettingsState } from '../types';
import { Moon, Sun, Layout, Zap, BatteryLow, Eye, BarChart3 } from 'lucide-react';
import { ACCENT_COLORS } from '../constants';

interface HomeScreenProps {
  isGlobalEnabled: boolean;
  onGlobalToggle: () => void;
  settings: SettingsState;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ isGlobalEnabled, onGlobalToggle, settings }) => {
  const theme = ACCENT_COLORS[settings.accentColor];
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (isGlobalEnabled) {
      setGreeting("Your eyes will thank you 😌");
    } else {
      if (hour >= 18 || hour < 6) {
        setGreeting("Good Evening 🌙");
      } else {
        setGreeting("Dark mode is resting 💤");
      }
    }
  }, [isGlobalEnabled]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-6 pt-10 pb-24 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-full flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">DARKIFY PRO</p>
             <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700`}>V1.0.0</span>
          </div>
          <h2 className="text-lg font-bold">{greeting}</h2>
        </div>
        <div className={`w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center ${isGlobalEnabled ? theme.text : 'text-zinc-600'}`}>
          {isGlobalEnabled ? <Moon size={20} fill="currentColor" /> : <Sun size={20} />}
        </div>
      </div>

      {/* Hero Toggle Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full py-4">
        {isGlobalEnabled && (
          <div className={`absolute inset-0 bg-gradient-radial ${theme.gradient} blur-[120px] animate-pulse pointer-events-none opacity-50`} />
        )}
        <div className={`transform transition-all duration-700 ${isGlobalEnabled ? 'scale-110' : 'scale-100'}`}>
          <BigToggle 
            enabled={isGlobalEnabled} 
            onToggle={onGlobalToggle} 
            accentColor={settings.accentColor}
            size={settings.toggleSize}
          />
        </div>
      </div>

      {/* Analytics / Stats Card */}
      <div className="w-full bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-5 flex items-center justify-around divide-x divide-zinc-800">
        <div className="flex flex-col items-center space-y-1 px-2 text-center">
          <Eye size={16} className={isGlobalEnabled ? theme.text : 'text-zinc-600'} />
          <span className="text-xs font-bold text-zinc-300">{isGlobalEnabled ? '42%' : '0%'}</span>
          <span className="text-[8px] text-zinc-500 uppercase font-black">Strain Red.</span>
        </div>
        <div className="flex flex-col items-center space-y-1 px-2 text-center">
          <BatteryLow size={16} className={isGlobalEnabled ? 'text-green-500' : 'text-zinc-600'} />
          <span className="text-xs font-bold text-zinc-300">{isGlobalEnabled ? '+1.2h' : '0h'}</span>
          <span className="text-[8px] text-zinc-500 uppercase font-black">Battery Ext.</span>
        </div>
        <div className="flex flex-col items-center space-y-1 px-2 text-center">
          <BarChart3 size={16} className="text-zinc-600" />
          <span className="text-xs font-bold text-zinc-300">12</span>
          <span className="text-[8px] text-zinc-500 uppercase font-black">Apps Managed</span>
        </div>
      </div>

      {/* Preview Section */}
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Contrast Simulator</h3>
          <span className={`text-[10px] font-bold ${theme.text}`}>ENHANCED ENGINE</span>
        </div>
        <ComparisonPreview accentColor={settings.accentColor} />
      </div>

      {/* Auto-Trigger Indicator */}
      {(settings.batteryTrigger || settings.sunsetTrigger) && (
        <div className="w-full bg-zinc-900/20 border border-zinc-800/40 p-3 rounded-2xl flex items-center justify-center space-x-2">
          <Zap size={14} className={theme.text} />
          <span className="text-[10px] text-zinc-500 font-medium tracking-tight">Active: {settings.batteryTrigger ? 'Battery Opt.' : ''} {settings.sunsetTrigger ? 'Auto-Sunset' : ''}</span>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
