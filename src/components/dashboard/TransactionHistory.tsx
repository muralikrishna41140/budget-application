
import { useState } from "react";
import { Filter, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Demo transaction data
const transactionsData = [
  {
    id: "T12345",
    date: "Apr 18, 2024",
    description: "Grocery Store",
    amount: -120.45,
    category: "Food",
  },
  {
    id: "T12346",
    date: "Apr 16, 2024",
    description: "Monthly Salary",
    amount: 3500.00,
    category: "Income",
  },
  {
    id: "T12347",
    date: "Apr 15, 2024",
    description: "Restaurant Dinner",
    amount: -85.20,
    category: "Dining",
  },
  {
    id: "T12348",
    date: "Apr 14, 2024",
    description: "Utility Bill",
    amount: -145.30,
    category: "Housing",
  },
  {
    id: "T12349",
    date: "Apr 12, 2024",
    description: "Online Shopping",
    amount: -68.95,
    category: "Shopping",
  },
  {
    id: "T12350",
    date: "Apr 10, 2024",
    description: "Transportation",
    amount: -35.00,
    category: "Transport",
  },
];

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Filter transactions based on search and category
  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const uniqueCategories = Array.from(
    new Set(transactionsData.map((t) => t.category))
  );

  return (
    <div>
      <h2 className="section-title">
        <Search className="h-5 w-5 text-finance-teal" />
        Recent Transactions
      </h2>
      
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 whitespace-nowrap">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">{categoryFilter || "All Categories"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                All Categories
              </DropdownMenuItem>
              {uniqueCategories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                          {transaction.date}
                        </TableCell>
                        <TableCell className="font-medium text-xs sm:text-sm">
                          {transaction.description}
                        </TableCell>
                        <TableCell>
                          <span className="inline-block px-2 py-1 text-xs rounded-full bg-secondary truncate max-w-[80px] sm:max-w-full">
                            {transaction.category}
                          </span>
                        </TableCell>
                        <TableCell className={`text-right font-medium text-xs sm:text-sm whitespace-nowrap ${transaction.amount >= 0 ? "text-green-600 dark:text-green-400" : ""}`}>
                          {formatCurrency(transaction.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mb-2 text-3xl">🔍</div>
            <h3 className="text-lg font-medium mb-1">No transactions found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
