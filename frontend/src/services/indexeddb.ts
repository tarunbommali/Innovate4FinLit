import Dexie, { Table } from 'dexie';

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  userGroup: string;
  financialScore: number;
  language: string;
}

export interface Scenario {
  scenarioId: string;
  title: string;
  context: string;
  difficulty: string;
  userGroup: string;
  theme: string;
  culturalContext?: string;
  choices: any[];
  visualAssets?: any;
}

export interface QueuedDecision {
  clientEventId: string;
  userId: string;
  scenarioId: string;
  choiceId: string;
  timestamp: string;
  timeSpent?: number;
  synced: boolean;
  createdAt: string;
}

export interface Progress {
  userId: string;
  completedScenarios: string[];
  currentScore: number;
  scoreTrend: Array<{ timestamp: string; score: number }>;
  badges: any[];
  themeProgress: any;
}

export interface Rule {
  ruleId: string;
  scenarioId: string;
  choiceId: string;
  scoreChange: number;
  feedback: string;
  category?: string;
}

export class FinLitDB extends Dexie {
  users!: Table<UserProfile, string>;
  scenarios!: Table<Scenario, string>;
  decisions!: Table<QueuedDecision, string>;
  progress!: Table<Progress, string>;
  rules!: Table<Rule, string>;

  constructor() {
    super('FinancialLiteracyDB');
    
    this.version(1).stores({
      users: 'userId, email',
      scenarios: 'scenarioId, userGroup, theme, difficulty',
      decisions: 'clientEventId, userId, synced',
      progress: 'userId',
      rules: 'ruleId, scenarioId'
    });
  }
}

export const db = new FinLitDB();
