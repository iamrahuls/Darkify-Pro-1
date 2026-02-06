
import React from 'react';
import { Home, List, Settings, HelpCircle } from 'lucide-react';
import { Screen, AccentColor } from '../types';
import { ACCENT_COLORS } from '../constants';

interface NavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
  accentColor: AccentColor;
}

const Navigation: React.FC<NavigationProps> = ({ currentScreen, onScreenChange, accentColor }) => {
  const theme = ACCENT_COLORS[accentColor];

  const navItems = [
    { id: Screen.HOME, label: 'Home', icon: Home, aria: 'Home Screen' },
    { id: Screen.APP_LIST, label: 'Apps', icon: List, aria: 'App Management' },
    { id: Screen.SETTINGS, label: 'Settings', icon: Settings, aria: 'Settings' },
    { id: Screen.GUIDE, label: 'Guide', icon: HelpCircle, aria: 'Guide and FAQ' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-2xl border-t border-zinc-800/50 z-50 px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              aria-label={item.aria}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 relative group`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? `${theme.bg} bg-opacity-10` : ''}`}>
                <Icon size={isActive ? 24 : 20} className={`transition-all ${isActive ? theme.text : 'text-zinc-600 group-hover:text-zinc-400'}`} />
              </div>
              <span className={`text-[9px] mt-0.5 font-black uppercase tracking-widest transition-all ${
                isActive ? theme.text : 'text-zinc-600 opacity-0 group-hover:opacity-100 scale-90'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className={`absolute -top-[1px] w-8 h-[2px] ${theme.bg} rounded-full blur-[1px] shadow-[0_0_8px_currentColor]`} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
