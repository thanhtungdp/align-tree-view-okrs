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
}

export interface OKRData {
  objectives: Record<string, OKRObjective>;
  connections: Array<{ from: string; to: string }>;
}