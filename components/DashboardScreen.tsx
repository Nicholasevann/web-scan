import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Receipt, Calendar, DollarSign, ShoppingBag } from 'lucide-react';

const monthlyData = [
  { category: 'Groceries', amount: 1250000, color: '#3b82f6' },
  { category: 'Transportation', amount: 450000, color: '#ef4444' },
  { category: 'Food & Drink', amount: 380000, color: '#f59e0b' },
  { category: 'Healthcare', amount: 290000, color: '#10b981' },
  { category: 'Others', amount: 180000, color: '#8b5cf6' }
];

const weeklyData = [
  { week: 'Ming 1', amount: 650000 },
  { week: 'Ming 2', amount: 480000 },
  { week: 'Ming 3', amount: 720000 },
  { week: 'Ming 4', amount: 600000 }
];

const stats = [
  {
    title: 'Total Pengeluaran',
    value: 'Rp 2.550.000',
    change: '+12%',
    trend: 'up',
    icon: DollarSign
  },
  {
    title: 'Jumlah Transaksi',
    value: '47',
    change: '+5',
    trend: 'up',
    icon: Receipt
  },
  {
    title: 'Rata-rata/hari',
    value: 'Rp 85.000',
    change: '-3%',
    trend: 'down',
    icon: Calendar
  },
  {
    title: 'Kategori Terbanyak',
    value: 'Groceries',
    change: '49%',
    trend: 'up',
    icon: ShoppingBag
  }
];

export function DashboardScreen() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
          <p className="opacity-90">Ringkasan Pengeluaran Desember 2024</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className="w-5 h-5 text-muted-foreground" />
                    <div className="flex items-center space-x-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ${
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Spending by Category - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Pengeluaran per Kategori
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={monthlyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    label={(entry) => `${((entry.amount / 2550000) * 100).toFixed(0)}%`}
                  >
                    {monthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2 mt-4">
              {monthlyData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Trend - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              Trend Mingguan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis dataKey="week" />
                  <YAxis tickFormatter={(value) => `${(value/1000)}k`} />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Insight Bulan Ini</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <Badge variant="secondary" className="mt-1">💡</Badge>
              <div>
                <p className="text-sm font-medium">Pengeluaran Groceries naik 15%</p>
                <p className="text-sm text-muted-foreground">
                  Dibandingkan bulan lalu. Pertimbangkan untuk berbelanja lebih efisien.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge variant="secondary" className="mt-1">🎯</Badge>
              <div>
                <p className="text-sm font-medium">Target bulanan tercapai 85%</p>
                <p className="text-sm text-muted-foreground">
                  Masih ada sisa budget Rp 450.000 untuk 5 hari ke depan.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Badge variant="secondary" className="mt-1">⚡</Badge>
              <div>
                <p className="text-sm font-medium">Hari termahal: Sabtu</p>
                <p className="text-sm text-muted-foreground">
                  Rata-rata pengeluaran weekend 40% lebih tinggi dari weekday.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}