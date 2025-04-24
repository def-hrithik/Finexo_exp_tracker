
import React, { useEffect, useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ExpenseSummary from '@/components/ExpenseSummary';
import ExpenseChart from '@/components/ExpenseChart';
import RecentTransactions from '@/components/RecentTransactions';
import AddExpenseButton from '@/components/AddExpenseButton';
import CategoryDistribution from '@/components/CategoryDistribution';
import SpendingTrends from '@/components/SpendingTrends';

const Index: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <DashboardHeader />
        
        <main className="pt-4">
          <h2 className="text-3xl font-bold animate-fade-in text-white">Dashboard</h2>
          <p className="text-blue-100 mt-1 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Track your expenses, income and spending habits
          </p>
          
          <ExpenseSummary />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpenseChart />
            <CategoryDistribution />
          </div>
          
          <SpendingTrends />
          
          <RecentTransactions />
        </main>
        
        <AddExpenseButton />
      </div>
    </div>
  );
};

export default Index;
