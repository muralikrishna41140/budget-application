import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, AlertCircle, Flag, PieChart, Calendar, Settings, Download, Share2, Lightbulb } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart as RechartPie, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for insights
const monthlySpending = [
  { name: 'Jan', amount: 3200 },
  { name: 'Feb', amount: 2800 },
  { name: 'Mar', amount: 3100 },
  { name: 'Apr', amount: 2700 },
  { name: 'May', amount: 2500 },
  { name: 'Jun', amount: 2900 },
  { name: 'Jul', amount: 3400 },
  { name: 'Aug', amount: 3200 },
  { name: 'Sep', amount: 3000 },
  { name: 'Oct', amount: 2600 },
  { name: 'Nov', amount: 2800 },
  { name: 'Dec', amount: 3600 },
];

const categoryBreakdown = [
  { name: 'Housing', value: 1500, color: '#65BFBF' },
  { name: 'Food', value: 800, color: '#FFD166' },
  { name: 'Transportation', value: 400, color: '#EF767A' },
  { name: 'Entertainment', value: 300, color: '#4F5D75' },
  { name: 'Utilities', value: 200, color: '#E5F8ED' },
  { name: 'Healthcare', value: 250, color: '#E5E0F8' },
  { name: 'Savings', value: 550, color: '#2D3142' },
];

const investmentData = [
  { name: 'Jan', stocks: 12000, bonds: 8000, cash: 5000 },
  { name: 'Feb', stocks: 12400, bonds: 8100, cash: 5100 },
  { name: 'Mar', stocks: 13200, bonds: 8050, cash: 5050 },
  { name: 'Apr', stocks: 12800, bonds: 8200, cash: 5200 },
  { name: 'May', stocks: 14000, bonds: 8300, cash: 5250 },
  { name: 'Jun', stocks: 15200, bonds: 8400, cash: 5300 },
  { name: 'Jul', stocks: 16000, bonds: 8450, cash: 5350 },
  { name: 'Aug', stocks: 15600, bonds: 8500, cash: 5400 },
  { name: 'Sep', stocks: 16400, bonds: 8550, cash: 5450 },
  { name: 'Oct', stocks: 17200, bonds: 8600, cash: 5500 },
  { name: 'Nov', stocks: 18000, bonds: 8650, cash: 5550 },
  { name: 'Dec', stocks: 19000, bonds: 8700, cash: 5600 },
];

const savingsTrend = [
  { name: 'Jan', actual: 400, goal: 500 },
  { name: 'Feb', actual: 500, goal: 500 },
  { name: 'Mar', actual: 450, goal: 500 },
  { name: 'Apr', actual: 550, goal: 500 },
  { name: 'May', actual: 600, goal: 500 },
  { name: 'Jun', actual: 500, goal: 500 },
  { name: 'Jul', actual: 700, goal: 600 },
  { name: 'Aug', actual: 650, goal: 600 },
  { name: 'Sep', actual: 600, goal: 600 },
  { name: 'Oct', actual: 750, goal: 600 },
  { name: 'Nov', actual: 800, goal: 700 },
  { name: 'Dec', actual: 850, goal: 700 },
];

const incomeVsExpense = [
  { name: 'Jan', income: 5200, expenses: 3200 },
  { name: 'Feb', income: 5300, expenses: 2800 },
  { name: 'Mar', income: 5200, expenses: 3100 },
  { name: 'Apr', income: 5400, expenses: 2700 },
  { name: 'May', income: 5500, expenses: 2500 },
  { name: 'Jun', income: 5300, expenses: 2900 },
  { name: 'Jul', income: 6000, expenses: 3400 },
  { name: 'Aug', income: 5800, expenses: 3200 },
  { name: 'Sep', income: 5900, expenses: 3000 },
  { name: 'Oct', income: 5700, expenses: 2600 },
  { name: 'Nov', income: 6100, expenses: 2800 },
  { name: 'Dec', income: 7000, expenses: 3600 },
];

const aiInsights = [
  {
    id: 1,
    title: "Unusual Spending Alert",
    description: "Your restaurant spending is 45% higher than your average this month.",
    type: "warning",
    icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    action: "View Details",
    date: "Today"
  },
  {
    id: 2,
    title: "Savings Milestone Reached",
    description: "Congratulations! You've reached 50% of your emergency fund goal.",
    type: "success",
    icon: <Flag className="h-5 w-5 text-green-500" />,
    action: "View Goal",
    date: "Yesterday"
  },
  {
    id: 3,
    title: "Investment Opportunity",
    description: "Based on your risk profile, adding more to your index fund could optimize returns.",
    type: "info",
    icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
    action: "Learn More",
    date: "3 days ago"
  },
  {
    id: 4,
    title: "Recurring Subscriptions",
    description: "You have 3 streaming subscriptions that you haven't used in the last month.",
    type: "warning",
    icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    action: "Review Subscriptions",
    date: "1 week ago"
  },
  {
    id: 5,
    title: "Budget Alert",
    description: "You're approaching your shopping budget limit for this month.",
    type: "warning",
    icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
    action: "View Budget",
    date: "1 week ago"
  }
];

const Insights = () => {
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const handleTimeframeChange = (newTimeframe: "monthly" | "quarterly" | "yearly") => {
    setTimeframe(newTimeframe);
    // In a real app, this would fetch new data based on the timeframe
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Insights</h1>
        <p className="text-muted-foreground">
          Discover patterns and opportunities in your financial data with AI-powered analysis.
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Button 
            variant={timeframe === "monthly" ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTimeframeChange("monthly")}
          >
            Monthly
          </Button>
          <Button 
            variant={timeframe === "quarterly" ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTimeframeChange("quarterly")}
          >
            Quarterly
          </Button>
          <Button 
            variant={timeframe === "yearly" ? "default" : "outline"} 
            size="sm" 
            onClick={() => handleTimeframeChange("yearly")}
          >
            Yearly
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Insights Dashboard */}
      <div className="mb-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Income vs Expenses Chart */}
              <Card className="glass-card col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Income vs. Expenses ({timeframe})
                  </CardTitle>
                  <CardDescription>Compare your income and expenses over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={incomeVsExpense}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        <Area type="monotone" dataKey="income" name="Income" stackId="1" stroke="#65BFBF" fill="#65BFBF" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="expenses" name="Expenses" stackId="2" stroke="#EF767A" fill="#EF767A" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Category Breakdown */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2" />
                    Spending by Category
                  </CardTitle>
                  <CardDescription>Where your money goes each month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPie
                        data={categoryBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                      >
                        {categoryBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {categoryBreakdown.map((entry, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
                        <span className="mr-2">{entry.name}:</span>
                        <span className="font-medium ml-auto">{formatCurrency(entry.value)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Savings Trend */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Savings Performance
                  </CardTitle>
                  <CardDescription>Tracking your savings against goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={savingsTrend}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        <Line type="monotone" dataKey="actual" name="Actual Savings" stroke="#65BFBF" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="goal" name="Savings Goal" stroke="#FFD166" strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="spending">
            <div className="grid grid-cols-1 gap-6">
              {/* Monthly Spending Trend */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Monthly Spending Trend
                  </CardTitle>
                  <CardDescription>Your spending patterns over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlySpending}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Bar dataKey="amount" name="Spending" fill="#EF767A" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="income">
            {/* Implement income tab content */}
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-medium mb-4">Income Analysis</h3>
              <p className="text-muted-foreground mb-2">Coming soon! We're working on detailed income tracking features.</p>
              <Button variant="outline">Request Early Access</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="investments">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Investment Portfolio Growth
                </CardTitle>
                <CardDescription>Track the performance of your investments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={investmentData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Area type="monotone" dataKey="stocks" name="Stocks" stackId="1" stroke="#65BFBF" fill="#65BFBF" />
                      <Area type="monotone" dataKey="bonds" name="Bonds" stackId="1" stroke="#FFD166" fill="#FFD166" />
                      <Area type="monotone" dataKey="cash" name="Cash" stackId="1" stroke="#4F5D75" fill="#4F5D75" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Insights */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <Lightbulb className="h-6 w-6 mr-2 text-primary" />
          AI Insights & Recommendations
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {aiInsights.map((insight) => (
            <Card key={insight.id} className="glass-card animate-fade-in">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    {insight.icon}
                    <span className="ml-2">{insight.title}</span>
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">{insight.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p>{insight.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">{insight.action}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
