
import { AppConfig, ColorDepth } from './types';

export const ACCENT_COLORS = {
  'neon-blue': {
    primary: '#00D1FF',
    glow: 'rgba(0, 209, 255, 0.4)',
    text: 'text-[#00D1FF]',
    bg: 'bg-[#00D1FF]',
    border: 'border-[#00D1FF]',
    gradient: 'from-[#00D1FF]/20 to-transparent',
  },
  'electric-purple': {
    primary: '#BF00FF',
    glow: 'rgba(191, 0, 255, 0.4)',
    text: 'text-[#BF00FF]',
    bg: 'bg-[#BF00FF]',
    border: 'border-[#BF00FF]',
    gradient: 'from-[#BF00FF]/20 to-transparent',
  }
};

export const COLOR_DEPTH_VALUES: Record<ColorDepth, string> = {
  'Deep Black': '#000000',
  'Soft Dark Gray': '#121212',
  'Balanced Dark': '#1A1A1A'
};

const DEFAULT_FIXES = {
  invertLightOnly: true,
  preserveImages: true,
  reduceContrastArtifacts: false,
  fixWhiteOnWhite: true
};

export const INITIAL_APPS: AppConfig[] = [
  { id: '1', name: 'Instagram', category: 'Social', icon: '📸', supportsNativeDark: true, isForced: false, isExcluded: false, advancedFixes: { ...DEFAULT_FIXES } },
  { id: '2', name: 'Snapchat', category: 'Social', icon: '👻', supportsNativeDark: false, isForced: false, isExcluded: false, compatibilityWarning: 'May not render correctly', advancedFixes: { ...DEFAULT_FIXES } },
  { id: '3', name: 'Legacy Banking', category: 'Finance', icon: '🏦', supportsNativeDark: false, isForced: false, isExcluded: false, compatibilityWarning: 'Text contrast issues likely', advancedFixes: { ...DEFAULT_FIXES } },
  { id: '4', name: 'Amazon Shopping', category: 'Shopping', icon: '📦', supportsNativeDark: true, isForced: false, isExcluded: false, advancedFixes: { ...DEFAULT_FIXES } },
  { id: '5', name: 'WhatsApp', category: 'Communication', icon: '💬', supportsNativeDark: true, isForced: false, isExcluded: false, advancedFixes: { ...DEFAULT_FIXES } },
  { id: '6', name: 'Old Browser X', category: 'Utility', icon: '🌐', supportsNativeDark: false, isForced: false, isExcluded: false, compatibilityWarning: 'Images might invert', advancedFixes: { ...DEFAULT_FIXES } },
  { id: '7', name: 'Messenger', category: 'Communication', icon: 'Ⓜ️', supportsNativeDark: true, isForced: false, isExcluded: false, advancedFixes: { ...DEFAULT_FIXES } },
  { id: '8', name: 'Reddit', category: 'Social', icon: '🤖', supportsNativeDark: true, isForced: false, isExcluded: false, advancedFixes: { ...DEFAULT_FIXES } },
];
