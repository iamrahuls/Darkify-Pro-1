
import React, { useState } from 'react';
import { AppConfig, AccentColor, RenderingFixes } from '../types';
import { Search, AlertCircle, ChevronDown, ChevronUp, Settings2, Trash2, CheckCircle, Eye, EyeOff, Filter } from 'lucide-react';
import { ACCENT_COLORS } from '../constants';

interface AppListScreenProps {
  apps: AppConfig[];
  onToggleApp: (id: string) => void;
  onUpdateAppFixes: (id: string, fixes: Partial<RenderingFixes>) => void;
  onExcludeApp: (id: string) => void;
  accentColor: AccentColor;
}

const AppListScreen: React.FC<AppListScreenProps> = ({ apps, onToggleApp, onUpdateAppFixes, onExcludeApp, accentColor }) => {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showExcluded, setShowExcluded] = useState(false);
  const theme = ACCENT_COLORS[accentColor];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    const matchesExcluded = showExcluded ? true : !app.isExcluded;
    return matchesSearch && matchesExcluded;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col min-h-screen px-4 pt-8 pb-24 space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-black">App Cards</h2>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setShowExcluded(!showExcluded)}
            className={`p-2 rounded-xl border transition-all ${
              showExcluded ? `${theme.border} ${theme.text} bg-zinc-900` : 'border-zinc-800 bg-zinc-900 text-zinc-600'
            }`}
            title={showExcluded ? "Hide Excluded" : "Show Excluded"}
          >
            {showExcluded ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
          <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full h-[38px] flex items-center">
             <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{filteredApps.length} APPS</span>
          </div>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Filter installed applications..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredApps.map((app) => {
          const isExpanded = expandedId === app.id;
          return (
            <div 
              key={app.id} 
              className={`bg-zinc-900/40 border transition-all duration-300 overflow-hidden ${
                app.isExcluded ? 'border-red-500/20 opacity-70' : 'border-zinc-800'
              } ${
                isExpanded ? 'ring-1 ring-zinc-700 scale-[1.02] rounded-[2.5rem]' : 'hover:border-zinc-700 rounded-[2.5rem]'
              }`}
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 bg-zinc-800 rounded-3xl flex items-center justify-center text-3xl shadow-2xl relative ${app.isCrashed || app.isExcluded ? 'opacity-50 grayscale' : ''}`}>
                    {app.icon}
                    {app.isCrashed && <div className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-black" />}
                    {app.isExcluded && <div className="absolute -top-1 -right-1 bg-zinc-500 w-4 h-4 rounded-full border-2 border-black flex items-center justify-center text-[8px] font-bold">!</div>}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-bold text-base flex items-center gap-1.5">
                      {app.name}
                      {app.isForced && !app.isExcluded && <CheckCircle size={14} className={theme.text} />}
                      {app.isExcluded && <span className="text-[8px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full border border-red-500/20">EXCLUDED</span>}
                    </h4>
                    <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider">{app.category}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {!app.isExcluded && (
                    <button 
                      onClick={() => onToggleApp(app.id)}
                      className={`px-4 py-2 rounded-2xl text-[11px] font-black tracking-widest transition-all ${
                        app.isForced ? theme.bg + ' text-black shadow-lg shadow-' + theme.primary + '/20' : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700'
                      }`}
                    >
                      {app.isForced ? 'ON' : 'OFF'}
                    </button>
                  )}
                  <button 
                    onClick={() => toggleExpand(app.id)}
                    className="p-2 text-zinc-600 hover:text-white transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="px-6 pb-6 pt-2 space-y-6 animate-in slide-in-from-top-2 duration-300">
                  <div className="h-[1px] bg-zinc-800 w-full" />
                  
                  {!app.isExcluded && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-zinc-400 mb-2">
                        <Settings2 size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Rendering Fixes</span>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { key: 'invertLightOnly', label: 'Invert light colors only' },
                          { key: 'preserveImages', label: 'Preserve original images' },
                          { key: 'reduceContrastArtifacts', label: 'Reduce contrast artifacts' },
                          { key: 'fixWhiteOnWhite', label: 'Fix white text/white bg' }
                        ].map((fix) => (
                          <div key={fix.key} className="flex items-center justify-between group">
                            <span className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">{fix.label}</span>
                            <button 
                              onClick={() => onUpdateAppFixes(app.id, { [fix.key]: !app.advancedFixes[fix.key as keyof RenderingFixes] })}
                              className={`w-10 h-5 rounded-full relative transition-colors ${app.advancedFixes[fix.key as keyof RenderingFixes] ? theme.bg : 'bg-zinc-800'}`}
                            >
                              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${app.advancedFixes[fix.key as keyof RenderingFixes] ? 'translate-x-5' : ''}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <button 
                      onClick={() => onExcludeApp(app.id)}
                      className={`flex-1 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${
                        app.isExcluded 
                        ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' 
                        : 'bg-zinc-800 hover:bg-red-500/10 hover:text-red-500'
                      }`}
                    >
                      {app.isExcluded ? (
                        <>
                          <Eye size={14} />
                          <span>Restore App</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={14} />
                          <span>Exclude App</span>
                        </>
                      )}
                    </button>
                  </div>

                  {app.compatibilityWarning && !app.isExcluded && (
                    <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl flex items-start space-x-3">
                      <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-amber-200 leading-snug font-medium italic">
                        {app.compatibilityWarning}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filteredApps.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-3xl mx-auto flex items-center justify-center text-zinc-700">
               <Search size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-zinc-500 text-sm font-bold">No results found</p>
              <p className="text-zinc-600 text-[10px] uppercase tracking-widest">Adjust your search or exclusion filters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppListScreen;
