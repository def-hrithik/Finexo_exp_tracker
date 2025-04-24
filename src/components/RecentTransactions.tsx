
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ExpenseCard from './ExpenseCard';

const transactions = [
  {
    id: 1,
    category: 'food' as const,
    amount: 24.50,
    date: 'Today, 2:30 PM',
    vendor: 'Urban Bistro'
  },
  {
    id: 2,
    category: 'shopping' as const,
    amount: 89.99,
    date: 'Yesterday, 4:45 PM',
    vendor: 'Nordstrom'
  },
  {
    id: 3,
    category: 'coffee' as const,
    amount: 5.75,
    date: 'Yesterday, 10:15 AM',
    vendor: 'Starbucks'
  },
  {
    id: 4,
    category: 'transport' as const,
    amount: 32.50,
    date: 'May 14, 5:30 PM',
    vendor: 'Uber'
  },
  {
    id: 5,
    category: 'shopping' as const,
    amount: 128.99,
    date: 'May 13, 3:20 PM',
    vendor: 'Amazon'
  }
];

const RecentTransactions: React.FC = () => {
  return (
    <Card className="glass-panel animate-slide-up mt-6" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <ExpenseCard
              key={transaction.id}
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.date}
              vendor={transaction.vendor}
              index={index}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
