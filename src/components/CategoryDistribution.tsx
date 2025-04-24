
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample data - in a real app, this would come from props or API
const categoryData = [
  { name: 'Food & Dining', value: 1250, color: '#F97316' },
  { name: 'Shopping', value: 900, color: '#0EA5E9' },
  { name: 'Transport', value: 650, color: '#10B981' },
  { name: 'Coffee & Drinks', value: 350, color: '#F59E0B' },
  { name: 'Other', value: 450, color: '#8B5CF6' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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

const CategoryDistribution: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = React.useState<Currency>(currencies.inr);

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(currencies[value]);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm font-medium text-gray-700">
            {selectedCurrency.symbol}{(payload[0].value * selectedCurrency.exchangeRate).toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-panel animate-slide-up mt-6" style={{ animationDelay: '300ms' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Spending by Category</CardTitle>
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
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1500}
                animationBegin={300}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${selectedCurrency.symbol}${(value * selectedCurrency.exchangeRate).toFixed(2)}`, 'Amount']}
                content={<CustomTooltip />}
              />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryDistribution;
