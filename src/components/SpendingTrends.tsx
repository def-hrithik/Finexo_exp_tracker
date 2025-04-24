
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data - in a real app, this would come from props or API
const monthlyData = [
  { month: 'Jan', spending: 3200 },
  { month: 'Feb', spending: 3500 },
  { month: 'Mar', spending: 3100 },
  { month: 'Apr', spending: 4200 },
  { month: 'May', spending: 3800 },
  { month: 'Jun', spending: 4500 },
  { month: 'Jul', spending: 4100 },
  { month: 'Aug', spending: 3700 },
  { month: 'Sep', spending: 4300 },
  { month: 'Oct', spending: 4000 },
  { month: 'Nov', spending: 4600 },
  { month: 'Dec', spending: 5100 },
];

type Currency = {
  symbol: string;
  code: string;
  name: string;
  exchangeRate: number;
};

const currencies: Record<string, Currency> = {
  inr: { symbol: '₹', code: 'INR', name: 'Indian Rupee', exchangeRate: 1 },
  usd: { symbol: '$', code: 'USD', name: 'US Dollar', exchangeRate: 0.012 },
  eur: { symbol: '€', code: 'EUR', name: 'Euro', exchangeRate: 0.011 },
  gbp: { symbol: '£', code: 'GBP', name: 'British Pound', exchangeRate: 0.0094 },
};

const SpendingTrends: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies.inr);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(currencies[value]);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 animate-fade-in">
          <p className="font-medium text-sm text-gray-600 mb-2">{label}</p>
          <p className="text-sm font-medium">
            <span>Total Spending: </span>
            <span>{selectedCurrency.symbol}{(payload[0].value * selectedCurrency.exchangeRate).toFixed(2)}</span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="glass-panel animate-slide-up mt-6" style={{ animationDelay: '400ms' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Yearly Spending Trends</CardTitle>
          <Select defaultValue="inr" onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[140px] bg-white/90">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(currencies).map(([key, currency]) => (
                <SelectItem key={key} value={key}>
                  <span className="flex items-center gap-2">
                    <span>{currency.symbol}</span>
                    <span>{currency.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                width={45} 
                tickFormatter={(value) => `${selectedCurrency.symbol}${(value * selectedCurrency.exchangeRate).toFixed(0)}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="spending" 
                name="Monthly Spending" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                activeDot={{ r: 8 }}
                animationDuration={2000}
                dot={{ strokeWidth: 2 }}
                fillOpacity={1} 
                fill="url(#spendingGradient)" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingTrends;
