import React from 'react';
import { ArrowRight, Coffee, CreditCard, ShoppingBag, Utensils } from 'lucide-react';
import { motion } from '@/components/Animations';

type ExpenseCategory = 'food' | 'shopping' | 'coffee' | 'transport' | 'other';

interface ExpenseCardProps {
  category: ExpenseCategory;
  amount: number;
  date: string;
  vendor: string;
  index: number;
}

const getCategoryIcon = (category: ExpenseCategory) => {
  switch (category) {
    case 'food':
      return <Utensils className="h-6 w-6 text-white" />;
    case 'shopping':
      return <ShoppingBag className="h-6 w-6 text-white" />;
    case 'coffee':
      return <Coffee className="h-6 w-6 text-white" />;
    default:
      return <CreditCard className="h-6 w-6 text-white" />;
  }
};

const getCategoryColor = (category: ExpenseCategory) => {
  switch (category) {
    case 'food':
      return 'from-orange-400 to-red-500';
    case 'shopping':
      return 'from-blue-400 to-blue-600';
    case 'coffee':
      return 'from-yellow-500 to-amber-600';
    case 'transport':
      return 'from-green-400 to-emerald-600';
    default:
      return 'from-purple-400 to-indigo-500';
  }
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({ category, amount, date, vendor, index }) => {
  const iconColor = getCategoryColor(category);
  const animationDelay = index * 100;
  
  return (
    <div className="expense-card glass-card animate-slide-in" style={{ animationDelay: `${animationDelay}ms` }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${iconColor} flex items-center justify-center mr-4`}>
            {getCategoryIcon(category)}
          </div>
          <div>
            <h3 className="font-medium text-sm text-gray-900">{vendor}</h3>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-4">₹{amount.toFixed(2)}</span>
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors duration-300">
            <ArrowRight className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
