import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RulesService {
  async getCachedRules(userGroup: string) {
    // Get all scenarios for this user group
    const scenarios = await prisma.scenario.findMany({
      where: { userGroup },
      select: { id: true }
    });

    const scenarioIds = scenarios.map(s => s.id);

    // Get all rules for these scenarios
    const rules = await prisma.rule.findMany({
      where: {
        scenarioId: { in: scenarioIds }
      }
    });

    return rules.map(r => ({
      ruleId: r.id,
      scenarioId: r.scenarioId,
      choiceId: r.choiceId,
      scoreChange: r.scoreChange,
      feedback: r.feedback,
      category: r.category
    }));
  }

  evaluateOffline(scenarioId: string, choiceId: string, rules: any[]) {
    const rule = rules.find(r => r.scenarioId === scenarioId && r.choiceId === choiceId);

    if (!rule) {
      return {
        scoreChange: 0,
        feedback: 'Decision recorded. Sync when online for full evaluation.',
        isApproximate: true
      };
    }

    return {
      scoreChange: rule.scoreChange,
      feedback: rule.feedback,
      isApproximate: true
    };
  }
}

export default new RulesService();
