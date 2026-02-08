import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        userGroup: true,
        financialScore: true,
        language: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      userGroup: user.userGroup,
      financialScore: user.financialScore,
      language: user.language,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  async updateProfile(userId: string, data: { name?: string; language?: string }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.language && { language: data.language })
      }
    });

    return {
      userId: user.id,
      name: user.name,
      email: user.email,
      userGroup: user.userGroup,
      financialScore: user.financialScore,
      language: user.language
    };
  }

  async getProgress(userId: string) {
    const progress = await prisma.progress.findUnique({
      where: { userId }
    });

    if (!progress) {
      throw new Error('PROGRESS_NOT_FOUND');
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    return {
      userId,
      currentScore: user?.financialScore || 0,
      completedScenarios: progress.completedScenarios as string[],
      scoreTrend: progress.scoreHistory as Array<{ timestamp: string; score: number }>,
      badges: progress.badges as any[],
      themeProgress: progress.themeProgress as any
    };
  }

  async updateScore(userId: string, scoreChange: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    const newScore = Math.max(0, Math.min(1000, user.financialScore + scoreChange));

    await prisma.user.update({
      where: { id: userId },
      data: { financialScore: newScore }
    });

    // Update score history
    const progress = await prisma.progress.findUnique({
      where: { userId }
    });

    if (progress) {
      const scoreHistory = progress.scoreHistory as any[];
      scoreHistory.push({
        timestamp: new Date().toISOString(),
        score: newScore
      });

      await prisma.progress.update({
        where: { userId },
        data: { scoreHistory }
      });
    }

    return newScore;
  }

  async addCompletedScenario(userId: string, scenarioId: string) {
    const progress = await prisma.progress.findUnique({
      where: { userId }
    });

    if (!progress) {
      throw new Error('PROGRESS_NOT_FOUND');
    }

    const completedScenarios = progress.completedScenarios as string[];
    if (!completedScenarios.includes(scenarioId)) {
      completedScenarios.push(scenarioId);

      await prisma.progress.update({
        where: { userId },
        data: { completedScenarios }
      });
    }
  }
}

export default new UserService();
