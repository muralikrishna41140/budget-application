
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCards from "@/components/dashboard/StatCards";
import FinancialCharts from "@/components/dashboard/FinancialCharts";
import AIInsights from "@/components/dashboard/AIInsights";
import GoalTracker from "@/components/dashboard/GoalTracker";
import FinancialTips from "@/components/dashboard/FinancialTips";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MoodTracker from "@/components/dashboard/MoodTracker";

const Index = () => {
  const userName = "Arjun";

  return (
    <DashboardLayout>
      <div className="max-w-full space-y-6 pb-8">
        {/* Header Section */}
        <DashboardHeader userName={userName} />

        {/* Stats Section */}
        <StatCards />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Financial Charts - Takes up 8 columns */}
          <div className="lg:col-span-8 space-y-6">
            {/* Income vs Expenses Chart */}
            <FinancialCharts />
            
            {/* Transaction History */}
            <TransactionHistory />
          </div>

          {/* Right Column - Takes up 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <MoodTracker />
            <AIInsights />
            
            {/* We'll only show GoalTracker on smaller screens where it fits better */}
            <div className="lg:hidden">
              <GoalTracker />
            </div>
            
            {/* We'll only show FinancialTips on smaller screens where it fits better */}
            <div className="lg:hidden">
              <FinancialTips />
            </div>
          </div>
        </div>
        
        {/* Additional row only visible on larger screens, where we can better control the layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-6 mt-6">
          <GoalTracker />
          <FinancialTips />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
