
import { ReactNode } from "react";
import Header from "./Header";
import ChatBot from "../shared/ChatBot";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-finance-mint/30 dark:from-background dark:to-finance-navy/20 overflow-x-hidden">
      <Header />
      <main className="container mx-auto px-4 pt-6 pb-12 overflow-x-hidden">
        {children}
      </main>
      <ChatBot />
    </div>
  );
};

export default DashboardLayout;
