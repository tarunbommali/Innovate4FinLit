import { PrismaClient } from '@prisma/client';
import userService from './user.service';

const prisma = new PrismaClient();

interface DecisionDTO {
  userId: string;
  scenarioId: string;
  choiceId: string;
  clientEventId: string;
  timestamp: Date;
  timeSpent?: number;
}

export class DecisionService {
  async evaluateDecision(decision: DecisionDTO) {
    // Check for duplicate (idempotency)
    const existing = await prisma.decision.findUnique({
      where: { clientEventId: decision.clientEventId }
    });

    if (existing) {
      throw new Error('DUPLICATE_EVENT');
    }

    // Get scenario
    const scenario = await prisma.scenario.findUnique({
      where: { id: decision.scenarioId }
    });

    if (!scenario) {
      throw new Error('SCENARIO_NOT_FOUND');
    }

    // Find choice
    const choices = scenario.choices as any[];
    const choice = choices.find(c => c.choiceId === decision.choiceId);

    if (!choice) {
      throw new Error('CHOICE_NOT_FOUND');
    }

    // Get score change
    const scoreChange = choice.scoreChange || 0;

    // Save decision
    await prisma.decision.create({
      data: {
        userId: decision.userId,
        scenarioId: decision.scenarioId,
        choiceId: decision.choiceId,
        clientEventId: decision.clientEventId,
        scoreChange,
        timeSpent: decision.timeSpent,
        timestamp: decision.timestamp
      }
    });

    // Update user score
    const newScore = await userService.updateScore(decision.userId, scoreChange);

    // Mark scenario as completed
    await userService.addCompletedScenario(decision.userId, decision.scenarioId);

    // Check for badges
    const badgesEarned = await this.checkBadges(decision.userId, scoreChange);

    // Generate feedback
    const feedback = {
      message: choice.feedback || 'Decision recorded',
      type: scoreChange > 0 ? 'Positive' : scoreChange < 0 ? 'Negative' : 'Neutral',
      explanation: choice.feedback || '',
      tips: choice.tips || [],
      visualCue: scoreChange > 0 ? 'green' : scoreChange < 0 ? 'red' : 'yellow'
    };

    return {
      decisionId: decision.clientEventId,
      scoreChange,
      newScore,
      feedback,
      badgesEarned
    };
  }

  async checkBadges(userId: string, scoreChange: number) {
    const badges: any[] = [];
    const progress = await prisma.progress.findUnique({
      where: { userId }
    });

    if (!progress) return badges;

    const completedScenarios = progress.completedScenarios as string[];
    const earnedBadges = progress.badges as any[];

    // Check for first scenario badge
    if (completedScenarios.length === 1 && !earnedBadges.find(b => b.name === 'First Steps')) {
      const badge = await prisma.badge.findFirst({
        where: { name: 'First Steps' }
      });
      if (badge) {
        badges.push({
          badgeId: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          earnedAt: new Date()
        });
        earnedBadges.push(badges[0]);
        await prisma.progress.update({
          where: { userId },
          data: { badges: earnedBadges }
        });
      }
    }

    // Check for 10 scenarios badge
    if (completedScenarios.length === 10 && !earnedBadges.find(b => b.name === 'Learning Journey')) {
      const badge = await prisma.badge.findFirst({
        where: { name: 'Learning Journey' }
      });
      if (badge) {
        badges.push({
          badgeId: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          earnedAt: new Date()
        });
        earnedBadges.push(badges[badges.length - 1]);
        await prisma.progress.update({
          where: { userId },
          data: { badges: earnedBadges }
        });
      }
    }

    // Check for perfect score badge
    if (scoreChange >= 25 && !earnedBadges.find(b => b.name === 'Perfect Decision')) {
      const badge = await prisma.badge.findFirst({
        where: { name: 'Perfect Decision' }
      });
      if (badge) {
        badges.push({
          badgeId: badge.id,
          name: badge.name,
          description: badge.description,
          icon: badge.icon,
          earnedAt: new Date()
        });
        earnedBadges.push(badges[badges.length - 1]);
        await prisma.progress.update({
          where: { userId },
          data: { badges: earnedBadges }
        });
      }
    }

    return badges;
  }

  async getDecisionHistory(userId: string, limit: number = 50) {
    const decisions = await prisma.decision.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
      take: limit,
      include: {
        scenario: {
          select: {
            title: true,
            theme: true
          }
        }
      }
    });

    return decisions.map(d => ({
      decisionId: d.id,
      scenarioId: d.scenarioId,
      scenarioTitle: d.scenario.title,
      theme: d.scenario.theme,
      choiceId: d.choiceId,
      scoreChange: d.scoreChange,
      timestamp: d.timestamp
    }));
  }

  async getPeerStatistics(scenarioId: string) {
    const decisions = await prisma.decision.findMany({
      where: { scenarioId }
    });

    const totalAttempts = decisions.length;
    const choiceDistribution: { [key: string]: { count: number; totalScore: number } } = {};

    decisions.forEach(d => {
      if (!choiceDistribution[d.choiceId]) {
        choiceDistribution[d.choiceId] = { count: 0, totalScore: 0 };
      }
      choiceDistribution[d.choiceId].count++;
      choiceDistribution[d.choiceId].totalScore += d.scoreChange;
    });

    const choiceStats = Object.entries(choiceDistribution).map(([choiceId, data]) => ({
      choiceId,
      percentage: totalAttempts > 0 ? (data.count / totalAttempts) * 100 : 0,
      averageScoreChange: data.count > 0 ? data.totalScore / data.count : 0
    }));

    const averageScore = totalAttempts > 0
      ? decisions.reduce((sum, d) => sum + d.scoreChange, 0) / totalAttempts
      : 0;

    return {
      scenarioId,
      totalAttempts,
      choiceDistribution: choiceStats,
      averageScore
    };
  }
}

export default new DecisionService();
