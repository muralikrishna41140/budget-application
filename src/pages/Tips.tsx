
import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Check, Heart, Share2, Star, Bookmark, Trophy, Award, Goal, BookMarked } from "lucide-react";

// Sample tips data
const financialTips = [
  {
    id: 1,
    category: "Saving",
    title: "The 50/30/20 Rule",
    content: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment for balanced financial health.",
    difficulty: "Beginner",
    likes: 423,
    isSaved: false,
    isLiked: false
  },
  {
    id: 2,
    category: "Investing",
    title: "Start with Index Funds",
    content: "For beginners, low-cost index funds provide diversification and lower risk than individual stocks, making them an excellent entry point into investing.",
    difficulty: "Beginner",
    likes: 317,
    isSaved: false,
    isLiked: false
  },
  {
    id: 3,
    category: "Budgeting",
    title: "Zero-Based Budgeting",
    content: "Assign every dollar of your income a specific purpose. This method ensures all money is accounted for and working toward your financial goals.",
    difficulty: "Intermediate",
    likes: 289,
    isSaved: false,
    isLiked: false
  },
  {
    id: 4,
    category: "Debt",
    title: "Debt Avalanche Method",
    content: "Focus on paying off debts with the highest interest rates first while maintaining minimum payments on others to minimize interest costs over time.",
    difficulty: "Intermediate",
    likes: 342,
    isSaved: false,
    isLiked: false
  },
  {
    id: 5,
    category: "Saving",
    title: "Automate Your Savings",
    content: "Set up automatic transfers to your savings account on payday. What you don't see, you won't miss, and your savings will grow consistently.",
    difficulty: "Beginner",
    likes: 506,
    isSaved: false,
    isLiked: false
  },
  {
    id: 6,
    category: "Investing",
    title: "Emergency Fund First",
    content: "Build an emergency fund covering 3-6 months of expenses before focusing on investments. This provides financial security during unexpected events.",
    difficulty: "Beginner",
    likes: 478,
    isSaved: false,
    isLiked: false
  },
  {
    id: 7,
    category: "Credit",
    title: "Credit Card Strategy",
    content: "Pay your credit card balance in full each month to avoid interest charges while building credit. Set up automatic payments to never miss a due date.",
    difficulty: "Beginner",
    likes: 391,
    isSaved: false,
    isLiked: false
  },
  {
    id: 8,
    category: "Investing",
    title: "Tax-Advantaged Accounts",
    content: "Maximize contributions to 401(k)s, IRAs, or other tax-advantaged accounts to reduce your tax burden while building wealth for retirement.",
    difficulty: "Intermediate",
    likes: 267,
    isSaved: false,
    isLiked: false
  },
  {
    id: 9,
    category: "Budgeting",
    title: "The 24-Hour Rule",
    content: "Wait 24 hours before making any non-essential purchase over $100. This cooling-off period helps prevent impulse buying and buyer's remorse.",
    difficulty: "Beginner",
    likes: 329,
    isSaved: false,
    isLiked: false
  },
  {
    id: 10,
    category: "Advanced",
    title: "Asset Allocation Strategy",
    content: "Diversify your investments across different asset classes based on your risk tolerance, investment timeline, and financial goals.",
    difficulty: "Advanced",
    likes: 214,
    isSaved: false,
    isLiked: false
  }
];

// Achievements data
const achievements = [
  {
    id: 1,
    name: "Budget Master",
    description: "Stayed within budget for 3 consecutive months",
    icon: <Trophy className="h-10 w-10 text-amber-500" />,
    progress: 100,
    unlocked: true,
    date: "April 15, 2025"
  },
  {
    id: 2,
    name: "Savings Superstar",
    description: "Saved 20% of income for 6 months straight",
    icon: <Star className="h-10 w-10 text-amber-500" />,
    progress: 100,
    unlocked: true,
    date: "March 2, 2025"
  },
  {
    id: 3,
    name: "Debt Destroyer",
    description: "Paid off 50% of total debt",
    icon: <Award className="h-10 w-10 text-gray-400" />,
    progress: 72,
    unlocked: false
  },
  {
    id: 4,
    name: "Knowledge Seeker",
    description: "Read 10 financial tips",
    icon: <BookOpen className="h-10 w-10 text-gray-400" />,
    progress: 80,
    unlocked: false
  },
  {
    id: 5,
    name: "Goal Getter",
    description: "Achieved first financial goal",
    icon: <Goal className="h-10 w-10 text-amber-500" />,
    progress: 100,
    unlocked: true,
    date: "January 17, 2025"
  },
  {
    id: 6,
    name: "Investment Guru",
    description: "Maintained diversified portfolio for 1 year",
    icon: <BookMarked className="h-10 w-10 text-gray-400" />,
    progress: 45,
    unlocked: false
  }
];

// Featured tip of the day
const featuredTip = {
  title: "Pay Yourself First",
  content: "Before paying bills or discretionary spending, set aside a portion of your income for savings and investments. This simple habit ensures your financial future takes priority.",
  author: "Sarah Johnson",
  role: "Financial Advisor"
};

const Tips = () => {
  const [tips, setTips] = useState(financialTips);
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  const handleLikeTip = (id: number) => {
    setTips(tips.map(tip => 
      tip.id === id 
        ? { ...tip, likes: tip.isLiked ? tip.likes - 1 : tip.likes + 1, isLiked: !tip.isLiked } 
        : tip
    ));
  };

  const handleSaveTip = (id: number) => {
    setTips(tips.map(tip => 
      tip.id === id 
        ? { ...tip, isSaved: !tip.isSaved } 
        : tip
    ));
  };

  const filterTips = () => {
    let filteredTips = [...tips];
    
    if (filter !== "all") {
      filteredTips = filteredTips.filter(tip => tip.category.toLowerCase() === filter.toLowerCase());
    }
    
    if (sortBy === "popular") {
      filteredTips.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "newest") {
      filteredTips.sort((a, b) => b.id - a.id);
    }
    
    return filteredTips;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Tips & Insights</h1>
        <p className="text-muted-foreground">
          Learn strategies to improve your financial health and achieve your goals faster.
        </p>
      </div>

      <Tabs defaultValue="tips" className="w-full mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="tips">Financial Tips</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tips">
          {/* Featured Tip of the Day */}
          <Card className="glass-card mb-8 border-2 border-amber-200 dark:border-amber-900/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="bg-amber-500 hover:bg-amber-600">Tip of the Day</Badge>
                <div className="flex items-center text-muted-foreground text-sm">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>Read time: 2 min</span>
                </div>
              </div>
              <CardTitle className="text-2xl mt-2">{featuredTip.title}</CardTitle>
              <CardDescription>Expert advice to improve your financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">{featuredTip.content}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mr-3">
                  {featuredTip.author.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{featuredTip.author}</p>
                  <p>{featuredTip.role}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </CardFooter>
          </Card>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("all")}
              >
                All Topics
              </Button>
              <Button 
                variant={filter === "saving" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("saving")}
              >
                Saving
              </Button>
              <Button 
                variant={filter === "investing" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("investing")}
              >
                Investing
              </Button>
              <Button 
                variant={filter === "budgeting" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("budgeting")}
              >
                Budgeting
              </Button>
              <Button 
                variant={filter === "debt" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("debt")}
              >
                Debt
              </Button>
              <Button 
                variant={filter === "credit" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("credit")}
              >
                Credit
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          {/* Tips Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filterTips().map((tip) => (
              <motion.div key={tip.id} variants={itemVariants}>
                <Card className="glass-card h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-primary">{tip.category}</Badge>
                      <Badge variant="outline">{tip.difficulty}</Badge>
                    </div>
                    <CardTitle className="mt-2">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p>{tip.content}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLikeTip(tip.id)}
                      className={tip.isLiked ? "text-red-500" : ""}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${tip.isLiked ? "fill-current" : ""}`} />
                      {tip.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSaveTip(tip.id)}
                      className={tip.isSaved ? "text-amber-500" : ""}
                    >
                      <Bookmark className={`h-4 w-4 ${tip.isSaved ? "fill-current" : ""}`} />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="achievements">
          <div className="mb-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-6 w-6 text-amber-500 mr-2" />
                  Your Financial Achievements
                </CardTitle>
                <CardDescription>Track your progress and earn badges as you improve your finances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`glass-card p-6 flex flex-col items-center text-center ${
                        achievement.unlocked ? "border-amber-200 dark:border-amber-900/30" : ""
                      }`}
                    >
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                        achievement.unlocked ? "bg-amber-100 dark:bg-amber-900/20" : "bg-gray-100 dark:bg-gray-800/50"
                      }`}>
                        {achievement.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-1">{achievement.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${achievement.unlocked ? "bg-amber-500" : "bg-primary"}`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                        <span>{achievement.progress}% complete</span>
                        {achievement.unlocked && <span>Unlocked: {achievement.date}</span>}
                      </div>
                      
                      {achievement.unlocked && (
                        <div className="mt-4 flex items-center text-amber-500">
                          <Check className="h-4 w-4 mr-1" />
                          <span>Achievement unlocked</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Tips;
