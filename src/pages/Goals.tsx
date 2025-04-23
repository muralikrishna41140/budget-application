
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  PlusCircle, 
  Target, 
  TrendingUp, 
  Home, 
  Car, 
  Plane, 
  GraduationCap, 
  Pencil, 
  Check,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

// Sample data for goals
const initialGoals = [
  {
    id: 1,
    title: "Emergency Fund",
    icon: "Target",
    currentAmount: 8500,
    targetAmount: 15000,
    deadline: "2025-09-15",
    category: "Savings",
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Down Payment for House",
    icon: "Home",
    currentAmount: 35000,
    targetAmount: 80000,
    deadline: "2026-12-31",
    category: "Housing",
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "New Car",
    icon: "Car",
    currentAmount: 12000,
    targetAmount: 30000,
    deadline: "2025-06-30",
    category: "Transportation",
    color: "bg-amber-500"
  },
  {
    id: 4,
    title: "Vacation in Europe",
    icon: "Plane",
    currentAmount: 3200,
    targetAmount: 10000,
    deadline: "2025-08-01",
    category: "Travel",
    color: "bg-indigo-500"
  },
  {
    id: 5,
    title: "Master's Degree",
    icon: "GraduationCap",
    currentAmount: 15000,
    targetAmount: 45000,
    deadline: "2027-01-15",
    category: "Education",
    color: "bg-pink-500"
  }
];

// Goal templates for quick creation
const goalTemplates = [
  { title: "Emergency Fund", icon: "Target", targetAmount: 10000, category: "Savings", color: "bg-blue-500" },
  { title: "Home Down Payment", icon: "Home", targetAmount: 50000, category: "Housing", color: "bg-green-500" },
  { title: "New Vehicle", icon: "Car", targetAmount: 25000, category: "Transportation", color: "bg-amber-500" },
  { title: "Dream Vacation", icon: "Plane", targetAmount: 8000, category: "Travel", color: "bg-indigo-500" },
  { title: "Education Fund", icon: "GraduationCap", targetAmount: 30000, category: "Education", color: "bg-pink-500" }
];

// Map of icon names to components
const iconMap: Record<string, React.ReactNode> = {
  "Target": <Target />,
  "TrendingUp": <TrendingUp />,
  "Home": <Home />,
  "Car": <Car />,
  "Plane": <Plane />,
  "GraduationCap": <GraduationCap />
};

const Goals = () => {
  const [goals, setGoals] = useState(initialGoals);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: "",
    icon: "Target",
    currentAmount: 0,
    targetAmount: 10000,
    deadline: new Date().toISOString().split("T")[0],
    category: "Savings",
    color: "bg-blue-500"
  });
  const { toast } = useToast();

  const handleAddGoal = () => {
    if (newGoal.title.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a goal title",
        variant: "destructive"
      });
      return;
    }

    const goal = {
      ...newGoal,
      id: Math.max(0, ...goals.map(g => g.id)) + 1
    };

    setGoals([...goals, goal]);
    setIsCreating(false);
    setNewGoal({
      title: "",
      icon: "Target",
      currentAmount: 0,
      targetAmount: 10000,
      deadline: new Date().toISOString().split("T")[0],
      category: "Savings",
      color: "bg-blue-500"
    });

    toast({
      title: "Goal Created",
      description: `Your goal "${goal.title}" has been created successfully.`,
    });
  };

  const handleSaveEdit = (id: number) => {
    // Fixed: Using proper TypeScript to access input value
    const editTitleInput = document.getElementById(`edit-title-${id}`) as HTMLInputElement;
    const newTitle = editTitleInput ? editTitleInput.value : '';
    
    setGoals(goals.map(goal => goal.id === id ? 
      {...goal, title: newTitle || goal.title} : goal
    ));
    setIsEditing(null);
    
    toast({
      title: "Goal Updated",
      description: "Your goal has been updated successfully."
    });
  };

  const handleDeleteGoal = (id: number) => {
    const goalToDelete = goals.find(g => g.id === id);
    setGoals(goals.filter(goal => goal.id !== id));
    
    toast({
      title: "Goal Deleted",
      description: `Your goal "${goalToDelete?.title}" has been deleted.`,
    });
  };

  const handleUseTemplate = (template: typeof goalTemplates[0]) => {
    setNewGoal({
      ...newGoal,
      title: template.title,
      icon: template.icon,
      targetAmount: template.targetAmount,
      category: template.category,
      color: template.color
    });
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const calculateTimeRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Past due";
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "1 day left";
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 60) return "1 month left";
    
    const months = Math.floor(diffDays / 30);
    return `${months} months left`;
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Goals</h1>
        <p className="text-muted-foreground">
          Set, track, and achieve your financial goals with personalized milestones.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Goals</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold">{goals.length}</div>
            <p className="text-sm text-muted-foreground">Active financial targets</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Progress</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold">
              {Math.round(goals.reduce((acc, goal) => acc + calculateProgress(goal.currentAmount, goal.targetAmount), 0) / goals.length)}%
            </div>
            <p className="text-sm text-muted-foreground">Average across all goals</p>
            <Progress 
              value={goals.reduce((acc, goal) => acc + calculateProgress(goal.currentAmount, goal.targetAmount), 0) / goals.length} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Remaining Amount</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold">
              {formatCurrency(goals.reduce((acc, goal) => acc + (goal.targetAmount - goal.currentAmount), 0))}
            </div>
            <p className="text-sm text-muted-foreground">Total needed to complete all goals</p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Goal Button */}
      {!isCreating && (
        <Button 
          onClick={() => setIsCreating(true)} 
          className="mb-6 animate-fade-in"
          size="lg"
        >
          <PlusCircle className="mr-2 h-5 w-5" />
          Create New Goal
        </Button>
      )}

      {/* Create Goal Form */}
      {isCreating && (
        <Card className="mb-8 border-2 border-primary animate-fade-in">
          <CardHeader>
            <CardTitle>Create New Goal</CardTitle>
            <CardDescription>Set up a new financial goal to track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label htmlFor="goal-title" className="block text-sm font-medium mb-1">Goal Name</label>
                  <input
                    id="goal-title"
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    placeholder="e.g., Emergency Fund"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="goal-target" className="block text-sm font-medium mb-1">Target Amount</label>
                  <input
                    id="goal-target"
                    type="number"
                    min="1"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label htmlFor="goal-current" className="block text-sm font-medium mb-1">Current Amount</label>
                  <input
                    id="goal-current"
                    type="number"
                    min="0"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="goal-deadline" className="block text-sm font-medium mb-1">Target Date</label>
                  <input
                    id="goal-deadline"
                    type="date"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="goal-category" className="block text-sm font-medium mb-1">Category</label>
                  <select
                    id="goal-category"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                  >
                    <option value="Savings">Savings</option>
                    <option value="Housing">Housing</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Debt">Debt Repayment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="goal-icon" className="block text-sm font-medium mb-1">Icon</label>
                  <select
                    id="goal-icon"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={newGoal.icon}
                    onChange={(e) => setNewGoal({...newGoal, icon: e.target.value})}
                  >
                    <option value="Target">Target</option>
                    <option value="TrendingUp">Trending Up</option>
                    <option value="Home">Home</option>
                    <option value="Car">Car</option>
                    <option value="Plane">Plane</option>
                    <option value="GraduationCap">Education</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Quick Templates</h3>
              <div className="flex flex-wrap gap-2">
                {goalTemplates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleUseTemplate(template)}
                    className="flex items-center gap-2"
                  >
                    {iconMap[template.icon]}
                    {template.title}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
            <Button onClick={handleAddGoal}>Create Goal</Button>
          </CardFooter>
        </Card>
      )}
      
      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="glass-card hover:shadow-glass-hover transition-all duration-300 animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-10 h-10 rounded-full ${goal.color} flex items-center justify-center text-white`}>
                    {iconMap[goal.icon as keyof typeof iconMap]}
                  </div>
                  {isEditing === goal.id ? (
                    <input
                      id={`edit-title-${goal.id}`}
                      className="text-lg font-medium border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                      defaultValue={goal.title}
                      autoFocus
                    />
                  ) : (
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                  )}
                </div>
                <div className="flex space-x-1">
                  {isEditing === goal.id ? (
                    <Button size="icon" variant="ghost" onClick={() => handleSaveEdit(goal.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="icon" variant="ghost" onClick={() => setIsEditing(goal.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" onClick={() => handleDeleteGoal(goal.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{goal.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium">
                      {calculateProgress(goal.currentAmount, goal.targetAmount)}%
                    </span>
                  </div>
                  <Progress 
                    value={calculateProgress(goal.currentAmount, goal.targetAmount)} 
                    className="h-3"
                    indicatorClassName={goal.color} 
                  />
                </div>
                
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-muted-foreground">Current</div>
                    <div className="font-bold">{formatCurrency(goal.currentAmount)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground">Target</div>
                    <div className="font-bold">{formatCurrency(goal.targetAmount)}</div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-muted-foreground">Remaining</div>
                    <div className="font-bold">{formatCurrency(goal.targetAmount - goal.currentAmount)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-muted-foreground">Deadline</div>
                    <div className="font-bold">{calculateTimeRemaining(goal.deadline)}</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Add Funds
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Goals;
