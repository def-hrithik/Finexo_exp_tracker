
import React, { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SummaryCardProps {
  title: string;
  amount: number;
  percentChange: number;
  icon: React.ReactNode;
  className?: string;
  delay: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, percentChange, icon, className, delay }) => {
  const [displayedAmount, setDisplayedAmount] = useState(0);
  const isPositive = percentChange >= 0;
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      const steps = 20;
      let current = 0;
      const increment = amount / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= amount) {
          setDisplayedAmount(amount);
          clearInterval(timer);
        } else {
          setDisplayedAmount(Math.floor(current));
        }
      }, 30);
      
      return () => clearInterval(timer);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [amount, delay]);
  
  return (
    <Card className={`glass-card overflow-hidden animate-reveal ${className}`} style={{ animationDelay: `${delay}ms` }}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight">
              <span className="flex items-center">
                <span className="text-lg mr-1">₹</span>
                {displayedAmount.toLocaleString()}
              </span>
            </h3>
            <div className="flex items-center mt-2 text-xs font-medium">
              <span className={isPositive ? 'text-expense-low' : 'text-expense-high'}>
                {isPositive ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
              </span>
              <span className={isPositive ? 'text-expense-low' : 'text-expense-high'}>
                {Math.abs(percentChange)}% from last month
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-full ${isPositive ? 'bg-expense-low/10' : 'bg-expense-high/10'}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ExpenseSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      <SummaryCard
        title="Total Expenses"
        amount={4582}
        percentChange={-2.5}
        icon={<DollarSign className="h-5 w-5 text-expense-high" />}
        delay={100}
      />
      <SummaryCard
        title="Monthly Income"
        amount={7350}
        percentChange={8.2}
        icon={<TrendingUp className="h-5 w-5 text-expense-low" />}
        delay={200}
      />
      <SummaryCard
        title="Savings Goal"
        amount={2768}
        percentChange={5.1}
        icon={<TrendingDown className="h-5 w-5 text-expense-medium" />}
        delay={300}
      />
    </div>
  );
};

export default ExpenseSummary;
