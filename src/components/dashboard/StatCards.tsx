
import { PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const StatCards = () => {
  const stats = [
    {
      title: "Total Income",
      value: "$7,842.00",
      change: "+12.5%",
      isPositive: true,
      icon: <Wallet className="h-5 w-5 text-finance-teal" />,
      color: "from-finance-teal/20 to-finance-mint/30",
    },
    {
      title: "Total Expenses",
      value: "$4,385.00",
      change: "-2.7%",
      isPositive: true,
      icon: <TrendingDown className="h-5 w-5 text-finance-coral" />,
      color: "from-finance-coral/20 to-finance-peach/30",
    },
    {
      title: "Total Savings",
      value: "$3,457.00",
      change: "+23.1%",
      isPositive: true,
      icon: <PiggyBank className="h-5 w-5 text-finance-gold" />,
      color: "from-finance-gold/20 to-finance-peach/30",
    },
    {
      title: "Monthly Growth",
      value: "+$583.00",
      change: "+7.4%",
      isPositive: true,
      icon: <TrendingUp className="h-5 w-5 text-finance-teal" />,
      color: "from-finance-lavender/20 to-finance-teal/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`glass-card p-6 hover:shadow-lg transition-shadow duration-200`}
        >
          <div className="flex justify-between items-start mb-4">
            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
            <div className="p-2 rounded-lg bg-white/40 dark:bg-gray-800/40">
              {stat.icon}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-1">{stat.value}</h3>
            <p className={`text-sm flex items-center ${
              stat.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
              {stat.isPositive ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {stat.change} from last month
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatCards;
