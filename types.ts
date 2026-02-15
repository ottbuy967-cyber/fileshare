
export interface SharedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  dataUrl?: string; // For mock simulation
}

export interface TransferSession {
  id: string;
  files: SharedFile[];
  timestamp: number;
  status: 'pending' | 'transferring' | 'completed' | 'failed';
  role: 'sender' | 'receiver';
}

export enum AppRoute {
  HOME = 'home',
  SEND = 'send',
  RECEIVE = 'receive',
  HISTORY = 'history',
  SETTINGS = 'settings'
}
