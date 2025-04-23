
import { Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const GoalTracker = () => {
  const goals = [
    {
      id: 1,
      title: "Emergency Fund",
      current: 4200,
      target: 5000,
      percentComplete: 84,
      dueDate: "Sep 2024",
      color: "bg-finance-teal"
    },
    {
      id: 2,
      title: "Dream Vacation",
      current: 1570,
      target: 3500,
      percentComplete: 45,
      dueDate: "Dec 2024",
      color: "bg-finance-gold"
    },
    {
      id: 3,
      title: "New Laptop",
      current: 850,
      target: 1200,
      percentComplete: 71,
      dueDate: "Aug 2024",
      color: "bg-finance-coral"
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="mb-8">
      <h2 className="section-title">
        <Target className="h-5 w-5 text-finance-teal" />
        Financial Goals
      </h2>
      
      <div className="glass-card p-4">
        <div className="grid grid-cols-1 gap-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-secondary/40 p-4 rounded-lg hover:bg-secondary/80 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-sm">{goal.title}</h3>
                <span className="text-xs font-medium">{goal.percentComplete}%</span>
              </div>
              
              <Progress value={goal.percentComplete} className="h-2 mb-2" indicatorClassName={`${goal.color}`} />
              
              <div className="flex justify-between text-xs">
                <span>{formatCurrency(goal.current)} of {formatCurrency(goal.target)}</span>
                <span className="text-muted-foreground">Due {goal.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;
