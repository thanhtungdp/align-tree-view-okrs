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

export interface TimeFrame {
  type: 'annual' | 'quarterly' | 'monthly';
  year: number;
  quarter?: 1 | 2 | 3 | 4;
  startDate: string;
  endDate: string;
}

export interface HistoricalProgress {
  quarter: number;
  year: number;
  progress: number;
  metrics: OKRMetric[];
  completedActions: number;
  totalActions: number;
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
  timeframe: TimeFrame;
  parentObjectiveId?: string; // Link to annual objective
  continuationOf?: string; // Link to previous quarter's same objective
  historicalProgress?: HistoricalProgress[];
}

export interface QuarterlyOKRData {
  objectives: Record<string, OKRObjective>;
  connections: Array<{ from: string; to: string }>;
  quarter: number;
  year: number;
}

export interface OKRData {
  currentQuarter: number;
  currentYear: number;
  quarters: Record<string, QuarterlyOKRData>; // key: "2025-Q1"
}