import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ScenarioService {
  async getScenarios(userGroup: string, theme?: string) {
    const where: any = { userGroup };
    if (theme) {
      where.theme = theme;
    }

    const scenarios = await prisma.scenario.findMany({
      where,
      select: {
        id: true,
        title: true,
        context: true,
        difficulty: true,
        userGroup: true,
        theme: true,
        culturalContext: true,
        choices: true,
        visualAssets: true
      }
    });

    return scenarios.map(s => ({
      scenarioId: s.id,
      title: s.title,
      context: s.context,
      difficulty: s.difficulty,
      userGroup: s.userGroup,
      theme: s.theme,
      culturalContext: s.culturalContext,
      choices: s.choices,
      visualAssets: s.visualAssets
    }));
  }

  async getScenarioById(scenarioId: string) {
    const scenario = await prisma.scenario.findUnique({
      where: { id: scenarioId }
    });

    if (!scenario) {
      throw new Error('SCENARIO_NOT_FOUND');
    }

    return {
      scenarioId: scenario.id,
      title: scenario.title,
      context: scenario.context,
      difficulty: scenario.difficulty,
      userGroup: scenario.userGroup,
      theme: scenario.theme,
      culturalContext: scenario.culturalContext,
      choices: scenario.choices,
      visualAssets: scenario.visualAssets
    };
  }
}

export default new ScenarioService();
