"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionService = void 0;
var client_1 = require("@prisma/client");
var user_service_1 = require("./user.service");
var prisma = new client_1.PrismaClient();
var DecisionService = /** @class */ (function () {
    function DecisionService() {
    }
    DecisionService.prototype.evaluateDecision = function (decision) {
        return __awaiter(this, void 0, void 0, function () {
            var existing, scenario, choices, choice, scoreChange, newScore, badgesEarned, feedback;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.decision.findUnique({
                            where: { clientEventId: decision.clientEventId }
                        })];
                    case 1:
                        existing = _a.sent();
                        if (existing) {
                            throw new Error('DUPLICATE_EVENT');
                        }
                        return [4 /*yield*/, prisma.scenario.findUnique({
                                where: { id: decision.scenarioId }
                            })];
                    case 2:
                        scenario = _a.sent();
                        if (!scenario) {
                            throw new Error('SCENARIO_NOT_FOUND');
                        }
                        choices = scenario.choices;
                        choice = choices.find(function (c) { return c.choiceId === decision.choiceId; });
                        if (!choice) {
                            throw new Error('CHOICE_NOT_FOUND');
                        }
                        scoreChange = choice.scoreChange || 0;
                        // Save decision
                        return [4 /*yield*/, prisma.decision.create({
                                data: {
                                    userId: decision.userId,
                                    scenarioId: decision.scenarioId,
                                    choiceId: decision.choiceId,
                                    clientEventId: decision.clientEventId,
                                    scoreChange: scoreChange,
                                    timeSpent: decision.timeSpent,
                                    timestamp: decision.timestamp
                                }
                            })];
                    case 3:
                        // Save decision
                        _a.sent();
                        return [4 /*yield*/, user_service_1.default.updateScore(decision.userId, scoreChange)];
                    case 4:
                        newScore = _a.sent();
                        // Mark scenario as completed
                        return [4 /*yield*/, user_service_1.default.addCompletedScenario(decision.userId, decision.scenarioId)];
                    case 5:
                        // Mark scenario as completed
                        _a.sent();
                        return [4 /*yield*/, this.checkBadges(decision.userId, scoreChange)];
                    case 6:
                        badgesEarned = _a.sent();
                        feedback = {
                            message: choice.feedback || 'Decision recorded',
                            type: scoreChange > 0 ? 'Positive' : scoreChange < 0 ? 'Negative' : 'Neutral',
                            explanation: choice.feedback || '',
                            tips: choice.tips || [],
                            visualCue: scoreChange > 0 ? 'green' : scoreChange < 0 ? 'red' : 'yellow'
                        };
                        return [2 /*return*/, {
                                decisionId: decision.clientEventId,
                                scoreChange: scoreChange,
                                newScore: newScore,
                                feedback: feedback,
                                badgesEarned: badgesEarned
                            }];
                }
            });
        });
    };
    DecisionService.prototype.checkBadges = function (userId, scoreChange) {
        return __awaiter(this, void 0, void 0, function () {
            var badges, progress, completedScenarios, earnedBadges, badge, badge, badge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        badges = [];
                        return [4 /*yield*/, prisma.progress.findUnique({
                                where: { userId: userId }
                            })];
                    case 1:
                        progress = _a.sent();
                        if (!progress)
                            return [2 /*return*/, badges];
                        completedScenarios = progress.completedScenarios;
                        earnedBadges = progress.badges;
                        if (!(completedScenarios.length === 1 && !earnedBadges.find(function (b) { return b.name === 'First Steps'; }))) return [3 /*break*/, 4];
                        return [4 /*yield*/, prisma.badge.findFirst({
                                where: { name: 'First Steps' }
                            })];
                    case 2:
                        badge = _a.sent();
                        if (!badge) return [3 /*break*/, 4];
                        badges.push({
                            badgeId: badge.id,
                            name: badge.name,
                            description: badge.description,
                            icon: badge.icon,
                            earnedAt: new Date()
                        });
                        earnedBadges.push(badges[0]);
                        return [4 /*yield*/, prisma.progress.update({
                                where: { userId: userId },
                                data: { badges: earnedBadges }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(completedScenarios.length === 10 && !earnedBadges.find(function (b) { return b.name === 'Learning Journey'; }))) return [3 /*break*/, 7];
                        return [4 /*yield*/, prisma.badge.findFirst({
                                where: { name: 'Learning Journey' }
                            })];
                    case 5:
                        badge = _a.sent();
                        if (!badge) return [3 /*break*/, 7];
                        badges.push({
                            badgeId: badge.id,
                            name: badge.name,
                            description: badge.description,
                            icon: badge.icon,
                            earnedAt: new Date()
                        });
                        earnedBadges.push(badges[badges.length - 1]);
                        return [4 /*yield*/, prisma.progress.update({
                                where: { userId: userId },
                                data: { badges: earnedBadges }
                            })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        if (!(scoreChange >= 25 && !earnedBadges.find(function (b) { return b.name === 'Perfect Decision'; }))) return [3 /*break*/, 10];
                        return [4 /*yield*/, prisma.badge.findFirst({
                                where: { name: 'Perfect Decision' }
                            })];
                    case 8:
                        badge = _a.sent();
                        if (!badge) return [3 /*break*/, 10];
                        badges.push({
                            badgeId: badge.id,
                            name: badge.name,
                            description: badge.description,
                            icon: badge.icon,
                            earnedAt: new Date()
                        });
                        earnedBadges.push(badges[badges.length - 1]);
                        return [4 /*yield*/, prisma.progress.update({
                                where: { userId: userId },
                                data: { badges: earnedBadges }
                            })];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/, badges];
                }
            });
        });
    };
    DecisionService.prototype.getDecisionHistory = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, limit) {
            var decisions;
            if (limit === void 0) { limit = 50; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.decision.findMany({
                            where: { userId: userId },
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
                        })];
                    case 1:
                        decisions = _a.sent();
                        return [2 /*return*/, decisions.map(function (d) { return ({
                                decisionId: d.id,
                                scenarioId: d.scenarioId,
                                scenarioTitle: d.scenario.title,
                                theme: d.scenario.theme,
                                choiceId: d.choiceId,
                                scoreChange: d.scoreChange,
                                timestamp: d.timestamp
                            }); })];
                }
            });
        });
    };
    DecisionService.prototype.getPeerStatistics = function (scenarioId) {
        return __awaiter(this, void 0, void 0, function () {
            var decisions, totalAttempts, choiceDistribution, choiceStats, averageScore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma.decision.findMany({
                            where: { scenarioId: scenarioId }
                        })];
                    case 1:
                        decisions = _a.sent();
                        totalAttempts = decisions.length;
                        choiceDistribution = {};
                        decisions.forEach(function (d) {
                            if (!choiceDistribution[d.choiceId]) {
                                choiceDistribution[d.choiceId] = { count: 0, totalScore: 0 };
                            }
                            choiceDistribution[d.choiceId].count++;
                            choiceDistribution[d.choiceId].totalScore += d.scoreChange;
                        });
                        choiceStats = Object.entries(choiceDistribution).map(function (_a) {
                            var choiceId = _a[0], data = _a[1];
                            return ({
                                choiceId: choiceId,
                                percentage: totalAttempts > 0 ? (data.count / totalAttempts) * 100 : 0,
                                averageScoreChange: data.count > 0 ? data.totalScore / data.count : 0
                            });
                        });
                        averageScore = totalAttempts > 0
                            ? decisions.reduce(function (sum, d) { return sum + d.scoreChange; }, 0) / totalAttempts
                            : 0;
                        return [2 /*return*/, {
                                scenarioId: scenarioId,
                                totalAttempts: totalAttempts,
                                choiceDistribution: choiceStats,
                                averageScore: averageScore
                            }];
                }
            });
        });
    };
    return DecisionService;
}());
exports.DecisionService = DecisionService;
exports.default = new DecisionService();
