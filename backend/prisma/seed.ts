import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create badges
  const badges = await Promise.all([
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
  ]);

  console.log(`Created ${badges.length} badges`);

  // Student Scenarios - Savings Theme
  const savingsScenarios = [
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

  // Budgeting Theme Scenarios
  const budgetingScenarios = [
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

  // Fraud Prevention Theme Scenarios
  const fraudScenarios = [
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

  // More Savings Scenarios
  const moreSavingsScenarios = [
    {
      title: 'Emergency Fund Challenge',
      context: 'Your phone screen cracked and repair costs ₹3,000. You have ₹2,500 saved and ₹1,000 pocket money this month. What do you do?',
      difficulty: 'Medium',
      userGroup: 'Student',
      theme: 'Savings',
      culturalContext: 'Building an emergency fund is crucial in India where unexpected expenses are common.',
      choices: [
        {
          choiceId: 'use_savings_wait',
          text: 'Use ₹2,500 savings, wait for next month for remaining ₹500',
          icon: '⏳',
          scoreChange: 20,
          feedback: 'Good decision! Using savings for emergencies is exactly what they\'re for. Waiting shows patience.',
          tips: ['Emergency funds should cover 3-6 months of expenses', 'Rebuild your emergency fund as soon as possible']
        },
        {
          choiceId: 'borrow_from_friend',
          text: 'Borrow ₹500 from a friend to fix it immediately',
          icon: '🤝',
          scoreChange: 5,
          feedback: 'Borrowing from friends can strain relationships. Better to use savings or wait.',
          tips: ['Avoid borrowing for non-urgent needs', 'Money and friendship don\'t mix well']
        },
        {
          choiceId: 'use_all_pocket_money',
          text: 'Use all ₹1,000 pocket money plus ₹2,000 savings',
          icon: '💸',
          scoreChange: -10,
          feedback: 'You\'ll have no money left for the month. Plan better to avoid such situations.',
          tips: ['Always keep some buffer for monthly expenses', 'Prioritize needs over wants']
        }
      ],
      visualAssets: { illustration: 'emergency-fund.svg', theme: 'savings' }
    },
    {
      title: 'Birthday Gift Dilemma',
      context: 'Your best friend\'s birthday is coming. You have ₹800 saved. A nice gift costs ₹600, but you\'re also saving for a school trip (₹5,000 needed). What\'s your plan?',
      difficulty: 'Easy',
      userGroup: 'Student',
      theme: 'Savings',
      culturalContext: 'In Indian culture, relationships are important, but financial goals matter too.',
      choices: [
        {
          choiceId: 'thoughtful_gift',
          text: 'Buy a thoughtful ₹200 gift and save ₹600 for trip',
          icon: '🎁',
          scoreChange: 25,
          feedback: 'Perfect balance! Thoughtful gifts matter more than expensive ones. Your friend will appreciate it.',
          tips: ['Meaningful gifts don\'t have to be expensive', 'Stay focused on your savings goals']
        },
        {
          choiceId: 'expensive_gift',
          text: 'Buy the ₹600 gift, save only ₹200',
          icon: '💝',
          scoreChange: -5,
          feedback: 'You prioritized the gift over your goal. Your trip savings are now delayed.',
          tips: ['Set spending limits for gifts', 'Communicate with friends about budget constraints']
        },
        {
          choiceId: 'handmade_gift',
          text: 'Make a handmade gift (₹50) and save ₹750',
          icon: '✨',
          scoreChange: 30,
          feedback: 'Excellent! Handmade gifts are more personal and you stayed on track with savings.',
          tips: ['Creativity beats expensive gifts', 'Personal touches make gifts memorable']
        }
      ],
      visualAssets: { illustration: 'birthday-gift.svg', theme: 'savings' }
    }
  ];

  // More Budgeting Scenarios
  const moreBudgetingScenarios = [
    {
      title: 'School Trip Budget',
      context: 'Your school is organizing a 3-day trip costing ₹4,000. You have 2 months to save. Your monthly pocket money is ₹1,500. How will you manage?',
      difficulty: 'Medium',
      userGroup: 'Student',
      theme: 'Budgeting',
      culturalContext: 'School trips are important for learning, but require advance planning and budgeting.',
      choices: [
        {
          choiceId: 'save_monthly',
          text: 'Save ₹2,000 per month by cutting unnecessary expenses',
          icon: '📅',
          scoreChange: 30,
          feedback: 'Excellent planning! You\'ll have ₹4,000 in 2 months with proper budgeting.',
          tips: ['Break big goals into monthly targets', 'Track your spending to find areas to cut']
        },
        {
          choiceId: 'ask_parents',
          text: 'Ask parents for full amount',
          icon: '👨‍👩‍👦',
          scoreChange: -15,
          feedback: 'You missed a chance to learn budgeting. Try to save at least part of it yourself.',
          tips: ['Take responsibility for your expenses', 'Parents appreciate when you try to save']
        },
        {
          choiceId: 'partial_save',
          text: 'Save ₹1,000 per month, ask parents for ₹2,000',
          icon: '⚖️',
          scoreChange: 15,
          feedback: 'Good compromise! You\'re contributing while being realistic about your limits.',
          tips: ['Partial contribution shows responsibility', 'Negotiate with parents when needed']
        }
      ],
      visualAssets: { illustration: 'school-trip.svg', theme: 'budgeting' }
    }
  ];

  // More Fraud Prevention Scenarios
  const moreFraudScenarios = [
    {
      title: 'Social Media Scam',
      context: 'A message on Instagram says: "You\'ve won an iPhone! Click this link and enter your bank details to claim." The profile looks official. What do you do?',
      difficulty: 'Easy',
      userGroup: 'Student',
      theme: 'Fraud Prevention',
      culturalContext: 'Social media scams are rising in India, especially targeting young users.',
      choices: [
        {
          choiceId: 'ignore_report',
          text: 'Ignore, block, and report the account',
          icon: '🚫',
          scoreChange: 30,
          feedback: 'Perfect! This is a classic social media scam. Never share bank details online.',
          tips: ['Legitimate companies never ask for bank details via DM', 'Report scam accounts to protect others', 'If it sounds too good to be true, it is']
        },
        {
          choiceId: 'check_profile',
          text: 'Check if the profile is verified before clicking',
          icon: '🔍',
          scoreChange: 10,
          feedback: 'Good instinct to verify, but even verified-looking profiles can be fake. Better to ignore completely.',
          tips: ['Scammers create fake verified badges', 'Never click suspicious links']
        },
        {
          choiceId: 'click_link',
          text: 'Click the link to see if it\'s real',
          icon: '⚠️',
          scoreChange: -25,
          feedback: 'Danger! Clicking the link could install malware or steal your data. Never click suspicious links.',
          tips: ['Clicking links can compromise your device', 'Scammers use urgency to make you act fast']
        }
      ],
      visualAssets: { illustration: 'social-media-scam.svg', theme: 'fraud' }
    },
    {
      title: 'Fake Job Offer',
      context: 'You see a WhatsApp message: "Earn ₹500/day by liking YouTube videos! Just pay ₹1,000 registration fee." Your friend says they\'re doing it. What do you do?',
      difficulty: 'Medium',
      userGroup: 'Student',
      theme: 'Fraud Prevention',
      culturalContext: 'Work-from-home scams are common in India, especially targeting students and youth.',
      choices: [
        {
          choiceId: 'research_warn',
          text: 'Research online, find it\'s a scam, warn your friend',
          icon: '🔍',
          scoreChange: 30,
          feedback: 'Excellent! You protected yourself and helped your friend. Real jobs never ask for registration fees.',
          tips: ['Legitimate jobs never charge registration fees', 'Research companies before applying', 'Warn friends about scams you discover']
        },
        {
          choiceId: 'ask_parents',
          text: 'Ask parents if it\'s legitimate',
          icon: '👨‍👩‍👦',
          scoreChange: 20,
          feedback: 'Smart to consult adults! They can help identify scams based on experience.',
          tips: ['Parents have seen many scams', 'Always verify with trusted adults']
        },
        {
          choiceId: 'pay_fee',
          text: 'Pay ₹1,000 since your friend is doing it',
          icon: '💸',
          scoreChange: -30,
          feedback: 'You fell for a scam! You lost ₹1,000 and won\'t earn anything. Real jobs don\'t charge fees.',
          tips: ['Never pay to get a job', 'Scammers use peer pressure', 'Report such scams to cyber crime']
        }
      ],
      visualAssets: { illustration: 'fake-job.svg', theme: 'fraud' }
    }
  ];

  const allScenarios = [...savingsScenarios, ...budgetingScenarios, ...fraudScenarios, ...moreSavingsScenarios, ...moreBudgetingScenarios, ...moreFraudScenarios];
  
  const scenarios = await Promise.all([
    ...allScenarios.map(s => prisma.scenario.create({
      data: {
        ...s,
        choices: s.choices as any,
        visualAssets: s.visualAssets as any
      }
    }))
  ]);

  console.log(`Created ${scenarios.length} scenarios`);

  // Create rules for each scenario
  const rules = [];
  for (const scenario of scenarios) {
    const choices = scenario.choices as any[];
    for (const choice of choices) {
      rules.push(
        prisma.rule.create({
          data: {
            scenarioId: scenario.id,
            choiceId: choice.choiceId,
            scoreChange: choice.scoreChange,
            feedback: choice.feedback,
            category: scenario.theme
          }
        })
      );
    }
  }

  await Promise.all(rules);
  console.log(`Created ${rules.length} rules`);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
