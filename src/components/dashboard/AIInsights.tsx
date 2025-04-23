
import { Lightbulb, TrendingUp, PiggyBank, AlertCircle } from "lucide-react";

const AIInsights = () => {
  const insights = [
    {
      id: 1,
      title: "Spending Pattern Alert",
      description:
        "Your restaurant spending increased by 24% this month. Consider setting a dining budget to stay on track.",
      icon: <AlertCircle className="h-5 w-5 text-finance-coral" />,
      color: "border-l-finance-coral",
      animationDelay: "0s",
    },
    {
      id: 2,
      title: "Savings Opportunity",
      description:
        "Based on your income pattern, you could increase your monthly savings by $225 without impacting your lifestyle.",
      icon: <PiggyBank className="h-5 w-5 text-finance-gold" />,
      color: "border-l-finance-gold",
      animationDelay: "0.2s",
    },
    {
      id: 3,
      title: "Investment Insight",
      description:
        "Your emergency fund now covers 4.2 months of expenses. Consider investing additional savings for higher returns.",
      icon: <TrendingUp className="h-5 w-5 text-finance-teal" />,
      color: "border-l-finance-teal",
      animationDelay: "0.4s",
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="section-title">
        <Lightbulb className="h-5 w-5 text-finance-gold" />
        AI Financial Insights
      </h2>
      
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`insights-card border-l-4 ${insight.color} animate-fade-in hover:translate-y-[-4px] overflow-hidden`}
            style={{ 
              animationDelay: insight.animationDelay,
              animationFillMode: "both" 
            }}
          >
            <div className="flex items-start mb-2">
              <div className="mr-3 p-1.5 rounded-full bg-secondary flex-shrink-0">
                {insight.icon}
              </div>
              <h3 className="font-medium text-sm sm:text-base">{insight.title}</h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{insight.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;
