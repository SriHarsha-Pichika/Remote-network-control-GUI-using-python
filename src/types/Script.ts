export type ButtonSize = 'sm' | 'md' | 'lg';
export type ScriptCategory = 'network' | 'system' | 'agent' | 'saltstack';

export interface ButtonStyle {
  bgColor: string;
  hoverColor: string;
}

export interface Script {
  id: string;
  name: string;
  description: string;
  category: ScriptCategory;
  command: string;
  isRunning: boolean;
  buttonStyle?: ButtonStyle;
}

export interface ScriptResult {
  id: string;
  output: string;
  status: 'success' | 'error';
  timestamp: string;
}