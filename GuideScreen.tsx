
import React, { useState } from 'react';
import { Smartphone, ChevronRight, Terminal, Settings, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { AccentColor } from '../types';
import { ACCENT_COLORS } from '../constants';

interface GuideScreenProps {
  accentColor: AccentColor;
}

const GuideScreen: React.FC<GuideScreenProps> = ({ accentColor }) => {
  const theme = ACCENT_COLORS[accentColor];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    {
      title: 'Enable Developer Options',
      desc: 'Go to Settings > About Phone > Tap "Build Number" 7 times.',
      icon: Settings
    },
    {
      title: 'Find Force Dark Mode',
      desc: 'Inside Developer Options, search for "Override force-dark" or "Force Dark".',
      icon: Smartphone
    },
    {
      title: 'Apply Toggle',
      desc: 'Enable the toggle and return to Darkify Pro to manage app-specific overrides.',
      icon: ChevronRight
    },
    {
      title: 'ADB Override (Expert)',
      desc: 'Use command: adb shell settings put global debug.hwui.force_dark true',
      icon: Terminal
    }
  ];

  const faqs = [
    {
      q: "Why doesn't it work on all apps?",
      a: "Some apps use non-standard rendering engines (like custom WebView implementations) that ignore system-level GPU instructions. Darkify Pro attempts to override these, but some apps remain locked by their developers."
    },
    {
      q: "Why does Android restrict dark mode?",
      a: "Android security policy prevents apps from modifying the graphics buffer of other apps. This is why you need to enable 'Force Dark' in Developer Options manually—it gives the OS permission to override layouts."
    },
    {
      q: "Why do some apps look weird?",
      a: "Force Dark works by inverting luminancy. If an app was already dark but used light assets, or if it has complex transparency, colors can 'clash'. Use our 'Advanced Rendering Fixes' in the app list to correct these artifacts."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen px-6 pt-8 pb-24 space-y-10 animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">Knowledge Base</h2>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Mastering Force Dark Mode</p>
      </div>

      {/* Manual Setup Required Card */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2.5rem] relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 ${theme.bg}`} />
        <h3 className="font-black text-xl mb-2 relative z-10">Manual Setup Required</h3>
        <p className="text-zinc-400 text-sm leading-relaxed relative z-10">
          Android security prevents apps from changing system-level graphics settings directly. 
          Follow these steps to unlock the full power of Darkify Pro.
        </p>
      </div>

      {/* Setup Steps */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={idx} className="flex space-x-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border border-zinc-800 bg-zinc-900 ${theme.text}`}>
                  <Icon size={20} />
                </div>
                {idx < steps.length - 1 && <div className="w-[1px] flex-1 bg-zinc-800 my-2" />}
              </div>
              <div className="pb-6">
                <h4 className="font-bold text-sm">Step {idx + 1}: {step.title}</h4>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-zinc-500 px-2">
          <HelpCircle size={14} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Common Questions</h3>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden transition-all"
            >
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span className="text-xs font-bold text-zinc-300">{faq.q}</span>
                {activeFaq === idx ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {activeFaq === idx && (
                <div className="px-5 pb-4 animate-in slide-in-from-top-1 duration-200">
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-3xl text-[11px] text-blue-200 leading-relaxed italic">
        "Darkify Pro uses Accessibility Services to identify the current foreground application and apply saved force-dark preferences dynamically. No personal data is ever collected."
      </div>
    </div>
  );
};

export default GuideScreen;
