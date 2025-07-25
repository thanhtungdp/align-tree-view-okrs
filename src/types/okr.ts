export interface OKRMetric {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  progress: number;
}

export interface OKRAction {
  id: string;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  dueDate: string;
  assignee?: string;
}

export interface Session {
  id: string;
  title: string;
  type: 'year' | 'quarter';
  startDate: string;
  endDate: string;
  parentSessionId?: string;
  isActive: boolean;
}

export interface Team {
  id: string;
  name: string;
  leadership: boolean;
}

export interface OKRObjective {
  id: string;
  title: string;
  description: string;
  level: 'company' | 'department' | 'individual';
  department?: string;
  owner: string;
  progress: number;
  metrics: OKRMetric[];
  actions: OKRAction[];
  parentId?: string;
  childrenIds: string[];
  sessionId: string;
  teamId: string;
}

export interface OKRData {
  objectives: Record<string, OKRObjective>;
  connections: Array<{ from: string; to: string }>;
  sessions: Record<string, Session>;
  teams: Record<string, Team>;
  activeSessionId: string;
  currentTeamId: string;
}