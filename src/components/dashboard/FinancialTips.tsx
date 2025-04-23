
import { Info, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FinancialTips = () => {
  const tip = {
    title: "Daily Finance Tip",
    content: "Consider the 50/30/20 rule: allocate 50% of income to needs, 30% to wants, and 20% to savings and debt repayment.",
  };

  const badges = [
    {
      id: 1,
      name: "Budget Master",
      description: "Stayed within budget for 3 consecutive months",
      icon: "🏆",
      achieved: true,
    },
    {
      id: 2,
      name: "Savings Guru",
      description: "Reached savings goal 1 month early",
      icon: "💰",
      achieved: true,
    },
    {
      id: 3,
      name: "Debt Crusher",
      description: "Paid off credit card debt completely",
      icon: "🚀",
      achieved: false,
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="section-title">
        <Info className="h-5 w-5 text-finance-teal" />
        Financial Wellness
      </h2>
      
      <div className="glass-card overflow-hidden">
        <div className="bg-finance-teal text-white p-3">
          <h3 className="font-medium text-sm flex items-center">
            <Info className="h-4 w-4 mr-2" />
            {tip.title}
          </h3>
        </div>
        <CardContent className="p-3 text-xs">
          {tip.content}
        </CardContent>
        
        <div className="border-t border-border p-3">
          <h3 className="font-medium text-sm flex items-center mb-3">
            <Award className="h-4 w-4 mr-2" />
            Achievement Badges
          </h3>
          
          <div className="grid grid-cols-3 gap-2">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`flex flex-col items-center p-2 rounded-lg text-center ${
                  badge.achieved 
                    ? 'bg-finance-mint/30 dark:bg-finance-charcoal/30' 
                    : 'bg-muted/50 text-muted-foreground'
                }`}
              >
                <span className="text-xl mb-1" role="img" aria-label={badge.name}>
                  {badge.icon}
                </span>
                <h4 className="text-xs font-medium">{badge.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTips;
