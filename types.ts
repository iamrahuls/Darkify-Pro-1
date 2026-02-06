
export type AccentColor = 'neon-blue' | 'electric-purple';
export type ToggleSize = 'Normal' | 'Large' | 'Extra Large';
export type ColorDepth = 'Deep Black' | 'Soft Dark Gray' | 'Balanced Dark';

export interface RenderingFixes {
  invertLightOnly: boolean;
  preserveImages: boolean;
  reduceContrastArtifacts: boolean;
  fixWhiteOnWhite: boolean;
}

export interface AppConfig {
  id: string;
  name: string;
  category: string;
  icon: string;
  supportsNativeDark: boolean;
  isForced: boolean;
  isExcluded: boolean;
  compatibilityWarning?: string;
  isCrashed?: boolean;
  advancedFixes: RenderingFixes;
}

export interface SettingsState {
  accentColor: AccentColor;
  toggleSize: ToggleSize;
  colorDepth: ColorDepth;
  autoEnableOnBoot: boolean;
  scheduleEnabled: boolean;
  safeMode: boolean;
  batteryTrigger: boolean;
  sunsetTrigger: boolean;
}

export enum Screen {
  HOME = 'HOME',
  APP_LIST = 'APP_LIST',
  SETTINGS = 'SETTINGS',
  GUIDE = 'GUIDE',
  PERMISSIONS = 'PERMISSIONS'
}
