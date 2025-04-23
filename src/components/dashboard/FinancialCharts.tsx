import { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FinancialCharts = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const overviewData = [
    { name: "Jan", income: 5400, expenses: 4200 },
    { name: "Feb", income: 5800, expenses: 4100 },
    { name: "Mar", income: 5600, expenses: 3900 },
    { name: "Apr", income: 6100, expenses: 4300 },
    { name: "May", income: 5900, expenses: 4100 },
    { name: "Jun", income: 6300, expenses: 4200 },
    { name: "Jul", income: 6500, expenses: 4400 },
    { name: "Aug", income: 6800, expenses: 4500 },
    { name: "Sep", income: 7100, expenses: 4300 },
    { name: "Oct", income: 7300, expenses: 4200 },
    { name: "Nov", income: 7500, expenses: 4500 },
    { name: "Dec", income: 7800, expenses: 4400 },
  ];

  const categoryData = [
    { name: "Housing", value: 1500, color: "#65BFBF" },
    { name: "Food", value: 850, color: "#FFD166" },
    { name: "Transport", value: 650, color: "#EF767A" },
    { name: "Entertainment", value: 450, color: "#7F5AF0" },
    { name: "Healthcare", value: 350, color: "#4F5D75" },
    { name: "Others", value: 550, color: "#2CB67D" },
  ];

  const weeklyData = [
    { day: "Mon", spend: 120 },
    { day: "Tue", spend: 90 },
    { day: "Wed", spend: 75 },
    { day: "Thu", spend: 110 },
    { day: "Fri", spend: 180 },
    { day: "Sat", spend: 210 },
    { day: "Sun", spend: 140 },
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
    <div className="glass-card p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Financial Overview</h3>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-0">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overviewData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis tickFormatter={formatCurrency} stroke="#888" />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: '1px solid #eee',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#65BFBF" 
                  strokeWidth={3}
                  dot={{ stroke: '#65BFBF', strokeWidth: 2, r: 4, fill: 'white' }}
                  activeDot={{ r: 6, stroke: '#65BFBF', strokeWidth: 2, fill: '#65BFBF' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF767A" 
                  strokeWidth={3}
                  dot={{ stroke: '#EF767A', strokeWidth: 2, r: 4, fill: 'white' }}
                  activeDot={{ r: 6, stroke: '#EF767A', strokeWidth: 2, fill: '#EF767A' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 content-center">
              {categoryData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Bar 
                  dataKey="spend" 
                  fill="#65BFBF" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialCharts;
