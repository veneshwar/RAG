
export interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  content?: string;
  mimeType: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  confidence?: number; // 0 to 100
  hallucinationRisk?: number; // 0 to 100
  source?: 'document' | 'general_knowledge';
}

export interface SystemStats {
  totalDocs: number;
  totalQueries: number;
  avgResponseTime: string;
  uptime: string;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  QUERY = 'query',
  INGEST = 'ingest',
  ANALYTICS = 'analytics',
  ADMIN = 'admin'
}
