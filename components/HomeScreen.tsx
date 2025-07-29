import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Scan, TrendingUp, Receipt, Target, Calendar } from 'lucide-react';

interface HomeScreenProps {
  onQuickScan: () => void;
  onViewDashboard: () => void;
}

export function HomeScreen({ onQuickScan, onViewDashboard }: HomeScreenProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Selamat Datang!</h1>
          <p className="opacity-90">Mari kelola pengeluaran Anda</p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6 -mt-4">
        {/* Quick Scan Button */}
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scan className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-semibold mb-2">Scan Struk Baru</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Foto struk belanja dan biarkan AI menganalisisnya
            </p>
            <Button onClick={onQuickScan} className="w-full">
              <Scan className="w-5 h-5 mr-2" />
              Mulai Scan
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bulan Ini</p>
                  <p className="font-semibold">Rp 2.5M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Struk</p>
                  <p className="font-semibold">47</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Receipt className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Supermarket ABC</p>
                  <p className="text-xs text-muted-foreground">Kemarin, 14:30</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatCurrency(125000)}</p>
                <Badge variant="outline" className="text-xs">Groceries</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Receipt className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Shell Gas Station</p>
                  <p className="text-xs text-muted-foreground">2 hari lalu, 09:15</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatCurrency(50000)}</p>
                <Badge variant="outline" className="text-xs">Transport</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Receipt className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Guardian Pharmacy</p>
                  <p className="text-xs text-muted-foreground">3 hari lalu, 16:45</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formatCurrency(89000)}</p>
                <Badge variant="outline" className="text-xs">Healthcare</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Summary */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ringkasan Desember</CardTitle>
              <Button variant="ghost" size="sm" onClick={onViewDashboard}>
                Lihat Detail
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Target Budget</span>
              </div>
              <span className="text-sm font-medium">{formatCurrency(3000000)}</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: '85%' }}
              />
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">85% terpakai</span>
              <span className="font-medium text-green-600">Sisa {formatCurrency(450000)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Tips Card */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-medium text-purple-900 mb-1">Tips Hari Ini</h3>
                <p className="text-sm text-purple-700">
                  Scan struk setiap kali berbelanja untuk tracking yang lebih akurat. 
                  Dengan begitu Anda bisa mengontrol pengeluaran lebih baik!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}