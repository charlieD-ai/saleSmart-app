
export type TabType = 'home' | 'communications' | 'customers' | 'ask' | 'profile';

export interface Stat {
  label: string;
  value: string | number;
  trend: number;
  unit?: string;
}

export interface CommunicationRecord {
  id: string;
  customerName: string;
  title: string;
  participants: string[];
  date: string;
  duration: string;
  summary: string;
  tags: string[];
  status: 'success' | 'processing' | 'failed';
  scores: {
    ability: number;
    task: number;
  };
}

export interface Schedule {
  id: string;
  time: string;
  endTime: string;
  date: string;
  title: string;
  customer: string;
  stage: string;
  type: 'history' | 'today' | 'upcoming';
  isCoVisit: boolean;
  owner: string;
  internalParticipants: string[];
  clientParticipants: string[];
}

export interface Todo {
  id: string | number;
  title: string;
  sub: string;
  date: string;
  time: string;
  urgent: boolean;
  completed: boolean;
}

export interface Customer {
  id: string;
  name: string;
  intention: 'High' | 'Medium' | 'Low';
  portrait: string;
  commCount: number;
  lastActive: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
