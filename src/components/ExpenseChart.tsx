
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, CreditCard } from 'lucide-react';

interface ChartDataPoint {
  name: string;
  expenses: number;
  income: number;
  savings: number;
}

const weeklyData: ChartDataPoint[] = [
  { name: 'Mon', expenses: 420, income: 700, savings: 280 },
  { name: 'Tue', expenses: 380, income: 700, savings: 320 },
  { name: 'Wed', expenses: 510, income: 700, savings: 190 },
  { name: 'Thu', expenses: 350, income: 700, savings: 350 },
  { name: 'Fri', expenses: 520, income: 700, savings: 180 },
  { name: 'Sat', expenses: 350, income: 0, savings: -350 },
  { name: 'Sun', expenses: 190, income: 0, savings: -190 },
];

const monthlyData: ChartDataPoint[] = [
  { name: 'Jan', expenses: 4200, income: 7000, savings: 2800 },
  { name: 'Feb', expenses: 3800, income: 7000, savings: 3200 },
  { name: 'Mar', expenses: 5100, income: 7000, savings: 1900 },
  { name: 'Apr', expenses: 3500, income: 7000, savings: 3500 },
  { name: 'May', expenses: 4800, income: 7200, savings: 2400 },
  { name: 'Jun', expenses: 4600, income: 7500, savings: 2900 },
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

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  currency: Currency;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100 animate-fade-in">
        <p className="font-medium text-sm text-gray-600 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center my-1">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: entry.color }} 
            />
            <p className="text-sm">
              <span className="font-medium">{entry.name}: </span>
              <span>{currency.symbol}{(entry.value * currency.exchangeRate).toFixed(2)}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const ExpenseChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(currencies.inr);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setChartData(activeTab === 'weekly' ? weeklyData : monthlyData);
      setIsAnimating(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleCurrencyChange = (value: string) => {
    setSelectedCurrency(currencies[value]);
  };

  return (
    <Card className="glass-panel animate-slide-up mt-6 overflow-hidden" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Expense Overview</CardTitle>
          <div className="flex items-center gap-4">
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
            <Tabs defaultValue="weekly" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="bg-secondary/80">
                <TabsTrigger value="weekly" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300">
                  Weekly
                </TabsTrigger>
                <TabsTrigger value="monthly" className="data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-300">
                  Monthly
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`transition-opacity duration-300 h-80 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="weekly" className="mt-0 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34D399" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#34D399" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    width={45} 
                    tickFormatter={(value) => `${selectedCurrency.symbol}${(value * selectedCurrency.exchangeRate).toFixed(0)}`}
                  />
                  <Tooltip content={<CustomTooltip currency={selectedCurrency} />} />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                  <Bar 
                    dataKey="expenses" 
                    name="Expenses" 
                    fill="url(#expenseGradient)" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <Bar 
                    dataKey="income" 
                    name="Income" 
                    fill="url(#incomeGradient)" 
                    radius={[4, 4, 0, 0]} 
                    animationDuration={1500}
                    animationBegin={600}
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="monthly" className="mt-0 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <defs>
                    <linearGradient id="expenseGradientArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#F43F5E" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="incomeGradientArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#34D399" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    width={45} 
                    tickFormatter={(value) => `${selectedCurrency.symbol}${(value * selectedCurrency.exchangeRate).toFixed(0)}`}
                  />
                  <Tooltip content={<CustomTooltip currency={selectedCurrency} />} />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    name="Expenses" 
                    stroke="#F43F5E" 
                    fillOpacity={1} 
                    fill="url(#expenseGradientArea)" 
                    animationDuration={1500}
                    animationBegin={300}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    name="Income" 
                    stroke="#34D399" 
                    fillOpacity={1} 
                    fill="url(#incomeGradientArea)" 
                    animationDuration={1500}
                    animationBegin={600}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
