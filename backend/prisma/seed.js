"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var badges, savingsScenarios, budgetingScenarios, fraudScenarios, allScenarios, scenarios, rules, _i, scenarios_1, scenario, choices, _a, choices_1, choice;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('Seeding database...');
                    return [4 /*yield*/, Promise.all([
                            prisma.badge.create({
                                data: {
                                    name: 'First Steps',
                                    description: 'Complete your first scenario',
                                    icon: '🎯',
                                    criteria: { type: 'scenario_count', value: 1 }
                                }
                            }),
                            prisma.badge.create({
                                data: {
                                    name: 'Learning Journey',
                                    description: 'Complete 10 scenarios',
                                    icon: '🌟',
                                    criteria: { type: 'scenario_count', value: 10 }
                                }
                            }),
                            prisma.badge.create({
                                data: {
                                    name: 'Perfect Decision',
                                    description: 'Make a perfect choice with maximum score',
                                    icon: '💯',
                                    criteria: { type: 'perfect_score', value: true }
                                }
                            }),
                            prisma.badge.create({
                                data: {
                                    name: 'Savings Champion',
                                    description: 'Complete all savings scenarios',
                                    icon: '💰',
                                    criteria: { type: 'theme_complete', value: 'Savings' }
                                }
                            }),
                            prisma.badge.create({
                                data: {
                                    name: 'Budget Master',
                                    description: 'Complete all budgeting scenarios',
                                    icon: '📊',
                                    criteria: { type: 'theme_complete', value: 'Budgeting' }
                                }
                            }),
                            prisma.badge.create({
                                data: {
                                    name: 'Fraud Fighter',
                                    description: 'Complete all fraud prevention scenarios',
                                    icon: '🛡️',
                                    criteria: { type: 'theme_complete', value: 'Fraud Prevention' }
                                }
                            })
                        ])];
                case 1:
                    badges = _b.sent();
                    console.log("Created ".concat(badges.length, " badges"));
                    savingsScenarios = [
                        {
                            title: 'Pocket Money Planning',
                            context: 'You receive ₹500 as pocket money this month. Your friend invites you to a movie (₹200), you want to buy a new book (₹150), and you\'ve been saving for a cricket bat (₹1,500). What will you do?',
                            difficulty: 'Easy',
                            userGroup: 'Student',
                            theme: 'Savings',
                            culturalContext: 'In India, pocket money teaches children early financial responsibility. Balancing wants and savings is a crucial skill.',
                            choices: [
                                {
                                    choiceId: 'save_all',
                                    text: 'Save all ₹500 towards the cricket bat',
                                    icon: '💰',
                                    scoreChange: 25,
                                    feedback: 'Excellent! Saving towards your goal shows discipline. You\'re ₹500 closer to your cricket bat.',
                                    tips: ['Setting clear savings goals helps you stay motivated', 'Track your progress to see how close you are to your goal']
                                },
                                {
                                    choiceId: 'movie_save_rest',
                                    text: 'Go to the movie (₹200) and save ₹300',
                                    icon: '🎬',
                                    scoreChange: 15,
                                    feedback: 'Good balance! You enjoyed time with friends while still saving 60% of your money.',
                                    tips: ['It\'s okay to spend on experiences, but always save something', 'Try the 50-30-20 rule: 50% needs, 30% wants, 20% savings']
                                },
                                {
                                    choiceId: 'spend_all',
                                    text: 'Buy the book and go to the movie (₹350)',
                                    icon: '📚',
                                    scoreChange: 5,
                                    feedback: 'You spent most of your money. While books and movies are nice, saving for bigger goals is important too.',
                                    tips: ['Before spending, ask: Do I really need this now?', 'Small savings add up to big goals over time']
                                },
                                {
                                    choiceId: 'spend_everything',
                                    text: 'Spend all on snacks and games',
                                    icon: '🍿',
                                    scoreChange: -10,
                                    feedback: 'Spending everything leaves you with nothing for your goal. Your cricket bat dream is further away now.',
                                    tips: ['Impulse spending can derail your savings goals', 'Wait 24 hours before making non-essential purchases']
                                }
                            ],
                            visualAssets: { illustration: 'pocket-money.svg', theme: 'savings' }
                        },
                        {
                            title: 'Diwali Gift Money',
                            context: 'During Diwali, relatives gave you ₹2,000 as gift money! Your parents suggest you save it, but you see a new video game for ₹1,800. What\'s your plan?',
                            difficulty: 'Easy',
                            userGroup: 'Student',
                            theme: 'Savings',
                            culturalContext: 'Diwali gift money is a tradition in Indian families. How you handle it shows your financial maturity.',
                            choices: [
                                {
                                    choiceId: 'save_all_bank',
                                    text: 'Save all ₹2,000 in a savings account',
                                    icon: '🏦',
                                    scoreChange: 30,
                                    feedback: 'Fantastic! Saving festival money is wise. In a savings account, it will even earn interest!',
                                    tips: ['Money in a bank account is safe and grows with interest', 'Start building your emergency fund early']
                                },
                                {
                                    choiceId: 'save_half',
                                    text: 'Save ₹1,000 and keep ₹1,000 for later',
                                    icon: '⚖️',
                                    scoreChange: 20,
                                    feedback: 'Smart compromise! You\'re saving 50% while keeping some flexibility for future needs.',
                                    tips: ['Saving at least 50% of gift money is a great habit', 'Keep saved money separate from spending money']
                                },
                                {
                                    choiceId: 'buy_game',
                                    text: 'Buy the video game (₹1,800)',
                                    icon: '🎮',
                                    scoreChange: -5,
                                    feedback: 'You spent most of your gift money on one item. The game is fun, but the money is gone.',
                                    tips: ['Big purchases need careful thought', 'Consider if the item will bring long-term value']
                                },
                                {
                                    choiceId: 'spend_all_treats',
                                    text: 'Spend it all on treats and gifts for friends',
                                    icon: '🎁',
                                    scoreChange: -15,
                                    feedback: 'Generosity is good, but spending everything leaves you with nothing. Balance is key.',
                                    tips: ['You can be generous without spending all your money', 'Save first, then decide what to spend']
                                }
                            ],
                            visualAssets: { illustration: 'diwali-money.svg', theme: 'savings' }
                        }
                    ];
                    budgetingScenarios = [
                        {
                            title: 'Monthly Budget Challenge',
                            context: 'You have ₹1,000 pocket money for the month. You need: school supplies (₹300), lunch money (₹400), and want to save for a new phone. How will you budget?',
                            difficulty: 'Medium',
                            userGroup: 'Student',
                            theme: 'Budgeting',
                            culturalContext: 'Learning to budget early helps you manage money throughout life. The 50-30-20 rule is popular in India.',
                            choices: [
                                {
                                    choiceId: 'budget_plan',
                                    text: 'Create a detailed budget: ₹300 supplies, ₹400 lunch, ₹300 savings',
                                    icon: '📊',
                                    scoreChange: 30,
                                    feedback: 'Perfect budgeting! You covered needs and saved 30%. This is excellent financial planning.',
                                    tips: ['Always budget for needs first, then savings, then wants', 'Track your spending to stay on budget']
                                },
                                {
                                    choiceId: 'rough_estimate',
                                    text: 'Rough plan: spend on needs first, save whatever is left',
                                    icon: '📝',
                                    scoreChange: 15,
                                    feedback: 'Good start, but a detailed budget helps you save more consistently.',
                                    tips: ['Write down your budget to make it concrete', 'Review your budget weekly']
                                },
                                {
                                    choiceId: 'no_plan',
                                    text: 'No budget, just spend as needed',
                                    icon: '🤷',
                                    scoreChange: -10,
                                    feedback: 'Without a budget, money disappears quickly. You might run out before month-end.',
                                    tips: ['Even a simple budget is better than no budget', 'Start by tracking where your money goes']
                                }
                            ],
                            visualAssets: { illustration: 'budget-plan.svg', theme: 'budgeting' }
                        },
                        {
                            title: 'Festival Shopping Dilemma',
                            context: 'Diwali is coming! You have ₹800. New clothes cost ₹600, decorations ₹200, and you want to buy gifts for friends. What\'s your plan?',
                            difficulty: 'Easy',
                            userGroup: 'Student',
                            theme: 'Budgeting',
                            culturalContext: 'Festival spending is a big part of Indian culture. Smart budgeting lets you enjoy festivals without overspending.',
                            choices: [
                                {
                                    choiceId: 'prioritize_needs',
                                    text: 'Buy clothes (₹600), use ₹200 for decorations, skip gifts this year',
                                    icon: '🎯',
                                    scoreChange: 20,
                                    feedback: 'Smart prioritization! You covered important items within budget.',
                                    tips: ['Festivals come every year - budget for them in advance', 'Handmade gifts can be more meaningful than expensive ones']
                                },
                                {
                                    choiceId: 'borrow_money',
                                    text: 'Buy everything by borrowing ₹400 from parents',
                                    icon: '💳',
                                    scoreChange: -15,
                                    feedback: 'Borrowing for wants creates debt. Better to adjust plans to your budget.',
                                    tips: ['Avoid borrowing for non-essentials', 'Plan festival spending months ahead']
                                }
                            ],
                            visualAssets: { illustration: 'festival-shopping.svg', theme: 'budgeting' }
                        }
                    ];
                    fraudScenarios = [
                        {
                            title: 'Suspicious UPI Request',
                            context: 'You receive a message: "Congratulations! You won ₹10,000. Send ₹100 via UPI to claim your prize." What do you do?',
                            difficulty: 'Easy',
                            userGroup: 'Student',
                            theme: 'Fraud Prevention',
                            culturalContext: 'UPI fraud is common in India. Remember: legitimate prizes never ask for payment.',
                            choices: [
                                {
                                    choiceId: 'ignore_block',
                                    text: 'Ignore the message and block the number',
                                    icon: '🛡️',
                                    scoreChange: 30,
                                    feedback: 'Excellent! This is a classic scam. Real prizes never ask for money.',
                                    tips: ['Never send money to claim prizes', 'Block and report suspicious numbers', 'If it sounds too good to be true, it probably is']
                                },
                                {
                                    choiceId: 'ask_parents',
                                    text: 'Ask parents before doing anything',
                                    icon: '👨‍👩‍👦',
                                    scoreChange: 25,
                                    feedback: 'Good decision! Always consult trusted adults about suspicious offers.',
                                    tips: ['Parents can help identify scams', 'Never rush into financial decisions']
                                },
                                {
                                    choiceId: 'send_money',
                                    text: 'Send ₹100 to claim the prize',
                                    icon: '❌',
                                    scoreChange: -25,
                                    feedback: 'This is a scam! You lost ₹100 and won\'t get any prize. Never pay to claim prizes.',
                                    tips: ['Legitimate organizations never ask for payment to give prizes', 'Report such scams to cyber crime']
                                }
                            ],
                            visualAssets: { illustration: 'upi-scam.svg', theme: 'fraud' }
                        },
                        {
                            title: 'Phishing Email Alert',
                            context: 'You get an email saying your bank account will be closed unless you click a link and enter your password. The email looks official. What do you do?',
                            difficulty: 'Medium',
                            userGroup: 'Student',
                            theme: 'Fraud Prevention',
                            culturalContext: 'Phishing attacks target Indians of all ages. Banks never ask for passwords via email.',
                            choices: [
                                {
                                    choiceId: 'verify_bank',
                                    text: 'Call the bank directly using the number on their official website',
                                    icon: '📞',
                                    scoreChange: 30,
                                    feedback: 'Perfect! Always verify through official channels. This was a phishing attempt.',
                                    tips: ['Banks never ask for passwords via email', 'Check sender email address carefully', 'Use official contact numbers only']
                                },
                                {
                                    choiceId: 'click_link',
                                    text: 'Click the link and enter password to save account',
                                    icon: '⚠️',
                                    scoreChange: -30,
                                    feedback: 'Danger! This is phishing. Your account could be hacked. Never click suspicious links.',
                                    tips: ['Hover over links to see real URL', 'Banks communicate through secure channels', 'Change password immediately if you clicked']
                                }
                            ],
                            visualAssets: { illustration: 'phishing-email.svg', theme: 'fraud' }
                        },
                        {
                            title: 'Online Shopping Safety',
                            context: 'You find a website selling the latest smartphone for ₹5,000 (market price ₹25,000). They only accept direct bank transfer, no COD. Should you buy?',
                            difficulty: 'Easy',
                            userGroup: 'Student',
                            theme: 'Fraud Prevention',
                            culturalContext: 'Online shopping fraud is rising in India. Stick to trusted platforms with buyer protection.',
                            choices: [
                                {
                                    choiceId: 'avoid_deal',
                                    text: 'Avoid it - price is too good to be true, no buyer protection',
                                    icon: '🚫',
                                    scoreChange: 30,
                                    feedback: 'Smart! This is likely a scam. Huge discounts and no COD are red flags.',
                                    tips: ['Use trusted e-commerce platforms', 'Check seller ratings and reviews', 'Prefer COD or secure payment gateways']
                                },
                                {
                                    choiceId: 'research_first',
                                    text: 'Research the website and check reviews before deciding',
                                    icon: '🔍',
                                    scoreChange: 20,
                                    feedback: 'Good approach! Research helps avoid scams. You\'ll likely find this site is fraudulent.',
                                    tips: ['Check domain age and SSL certificate', 'Look for contact information', 'Search for scam reports']
                                },
                                {
                                    choiceId: 'buy_immediately',
                                    text: 'Buy immediately before the deal expires',
                                    icon: '💸',
                                    scoreChange: -25,
                                    feedback: 'You likely lost your money! Scammers create urgency. Always research before buying.',
                                    tips: ['Scammers use urgency to pressure you', 'If deal seems impossible, it probably is', 'Report fraudulent websites']
                                }
                            ],
                            visualAssets: { illustration: 'online-shopping.svg', theme: 'fraud' }
                        }
                    ];
                    allScenarios = __spreadArray(__spreadArray(__spreadArray([], savingsScenarios, true), budgetingScenarios, true), fraudScenarios, true);
                    return [4 /*yield*/, Promise.all(__spreadArray([], allScenarios.map(function (s) { return prisma.scenario.create({
                            data: __assign(__assign({}, s), { choices: s.choices, visualAssets: s.visualAssets })
                        }); }), true))];
                case 2:
                    scenarios = _b.sent();
                    console.log("Created ".concat(scenarios.length, " scenarios"));
                    rules = [];
                    for (_i = 0, scenarios_1 = scenarios; _i < scenarios_1.length; _i++) {
                        scenario = scenarios_1[_i];
                        choices = scenario.choices;
                        for (_a = 0, choices_1 = choices; _a < choices_1.length; _a++) {
                            choice = choices_1[_a];
                            rules.push(prisma.rule.create({
                                data: {
                                    scenarioId: scenario.id,
                                    choiceId: choice.choiceId,
                                    scoreChange: choice.scoreChange,
                                    feedback: choice.feedback,
                                    category: scenario.theme
                                }
                            }));
                        }
                    }
                    return [4 /*yield*/, Promise.all(rules)];
                case 3:
                    _b.sent();
                    console.log("Created ".concat(rules.length, " rules"));
                    console.log('Seeding completed!');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
