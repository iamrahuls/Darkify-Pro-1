
import React, { useState, useEffect } from 'react';
import { Screen, SettingsState, AppConfig, RenderingFixes } from './types';
import { INITIAL_APPS, COLOR_DEPTH_VALUES, ACCENT_COLORS } from './constants';
import Navigation from './components/Navigation';
import HomeScreen from './components/HomeScreen';
import AppListScreen from './components/AppListScreen';
import SettingsScreen from './components/SettingsScreen';
import GuideScreen from './components/GuideScreen';
import PermissionScreen from './components/PermissionScreen';
import { AlertCircle, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.PERMISSIONS);
  const [isGlobalEnabled, setIsGlobalEnabled] = useState(false);
  const [apps, setApps] = useState<AppConfig[]>(INITIAL_APPS);
  const [toast, setToast] = useState<{message: string, type: 'info' | 'error' | 'success'} | null>(null);
  const [settings, setSettings] = useState<SettingsState>({
    accentColor: 'neon-blue',
    toggleSize: 'Large',
    colorDepth: 'Deep Black',
    autoEnableOnBoot: true,
    scheduleEnabled: false,
    safeMode: true,
    batteryTrigger: false,
    sunsetTrigger: false
  });

  const showToast = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Health Monitor for production stability simulation
  useEffect(() => {
    if (!settings.safeMode || !isGlobalEnabled) return;

    const interval = setInterval(() => {
      const activeApps = apps.filter(a => a.isForced && !a.isCrashed && !a.isExcluded);
      if (activeApps.length > 0 && Math.random() > 0.97) {
        const randomApp = activeApps[Math.floor(Math.random() * activeApps.length)];
        setApps(prev => prev.map(a => 
          a.id === randomApp.id ? { ...a, isCrashed: true, isForced: false } : a
        ));
        showToast(`Auto-reverted ${randomApp.name} to prevent UI crash`, 'error');
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [isGlobalEnabled, apps, settings.safeMode]);

  const handleGlobalToggle = () => {
    const newState = !isGlobalEnabled;
    setIsGlobalEnabled(newState);
    setApps(prev => prev.map(a => ({ 
      ...a, 
      isForced: newState && !a.isExcluded, 
      isCrashed: false 
    })));
    showToast(newState ? 'Force Dark enabled system-wide' : 'Force Dark disabled', newState ? 'success' : 'info');
  };

  const handleToggleApp = (id: string) => {
    setApps(prev => prev.map(app => 
      app.id === id ? { ...app, isForced: !app.isForced, isCrashed: false, isExcluded: false } : app
    ));
  };

  const handleUpdateAppFixes = (id: string, fixes: Partial<RenderingFixes>) => {
    setApps(prev => prev.map(app => 
      app.id === id ? { ...app, advancedFixes: { ...app.advancedFixes, ...fixes } } : app
    ));
  };

  const handleExcludeApp = (id: string) => {
    setApps(prev => {
      const targetApp = prev.find(a => a.id === id);
      const isNowExcluded = !targetApp?.isExcluded;
      showToast(`${targetApp?.name} ${isNowExcluded ? 'added to blacklist' : 'restored to pool'}`, isNowExcluded ? 'info' : 'success');
      
      return prev.map(app => 
        app.id === id ? { ...app, isExcluded: isNowExcluded, isForced: false } : app
      );
    });
  };

  const updateSettings = (updates: Partial<SettingsState>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    if (updates.accentColor) showToast(`Theme updated to ${updates.accentColor.replace('-', ' ')}`, 'success');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.PERMISSIONS:
        return <PermissionScreen onGrant={() => setCurrentScreen(Screen.HOME)} accentColor={settings.accentColor} />;
      case Screen.HOME:
        return (
          <HomeScreen 
            isGlobalEnabled={isGlobalEnabled} 
            onGlobalToggle={handleGlobalToggle}
            settings={settings}
          />
        );
      case Screen.APP_LIST:
        return (
          <AppListScreen 
            apps={apps} 
            onToggleApp={handleToggleApp}
            onUpdateAppFixes={handleUpdateAppFixes}
            onExcludeApp={handleExcludeApp}
            accentColor={settings.accentColor} 
          />
        );
      case Screen.SETTINGS:
        return (
          <SettingsScreen 
            settings={settings} 
            onUpdateSettings={updateSettings} 
          />
        );
      case Screen.GUIDE:
        return <GuideScreen accentColor={settings.accentColor} />;
      default:
        return null;
    }
  };

  const currentBgColor = COLOR_DEPTH_VALUES[settings.colorDepth];
  const theme = ACCENT_COLORS[settings.accentColor];

  return (
    <div 
      className="max-w-md mx-auto min-h-screen shadow-2xl overflow-hidden relative selection:bg-zinc-800 transition-colors duration-500 flex flex-col antialiased"
      style={{ backgroundColor: currentBgColor }}
    >
      <main className="flex-1 transition-all duration-300 relative overflow-y-auto overflow-x-hidden">
        {renderScreen()}
        
        {/* Production Notification Overlay */}
        {toast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-xs z-[100] animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-300">
            <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center space-x-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {toast.type === 'error' ? (
                <AlertCircle size={20} className="text-red-500 shrink-0" />
              ) : toast.type === 'success' ? (
                <CheckCircle size={20} className="text-green-500 shrink-0" />
              ) : (
                <AlertCircle size={20} className={theme.text + " shrink-0"} />
              )}
              <p className="text-xs font-bold text-zinc-100 leading-tight">{toast.message}</p>
            </div>
          </div>
        )}
      </main>
      
      {currentScreen !== Screen.PERMISSIONS && (
        <Navigation 
          currentScreen={currentScreen} 
          onScreenChange={setCurrentScreen} 
          accentColor={settings.accentColor}
        />
      )}
    </div>
  );
};

export default App;
