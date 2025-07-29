import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Store, Search, Filter, Receipt, Trash2, Edit } from 'lucide-react';

interface ReceiptData {
  id: number;
  date: string;
  merchantName: string;
  total: number;
  itemCount: number;
  category: string;
}

const mockReceipts: ReceiptData[] = [
  {
    id: 1,
    date: '2024-12-28',
    merchantName: 'Supermarket ABC',
    total: 125000,
    itemCount: 5,
    category: 'Groceries'
  },
  {
    id: 2,
    date: '2024-12-27',
    merchantName: 'Warung Bu Sari',
    total: 25000,
    itemCount: 2,
    category: 'Food & Drink'
  },
  {
    id: 3,
    date: '2024-12-26',
    merchantName: 'Shell Gas Station',
    total: 50000,
    itemCount: 1,
    category: 'Transportation'
  },
  {
    id: 4,
    date: '2024-12-25',
    merchantName: 'Guardian Pharmacy',
    total: 89000,
    itemCount: 4,
    category: 'Healthcare'
  },
  {
    id: 5,
    date: '2024-12-24',
    merchantName: 'Indomaret',
    total: 35000,
    itemCount: 8,
    category: 'Groceries'
  },
  {
    id: 6,
    date: '2024-12-23',
    merchantName: 'Starbucks',
    total: 65000,
    itemCount: 2,
    category: 'Food & Drink'
  }
];

const categories = ['Semua', 'Groceries', 'Food & Drink', 'Transportation', 'Healthcare', 'Others'];

interface HistoryScreenProps {
  onReceiptClick?: (receipt: ReceiptData) => void;
}

export function HistoryScreen({ onReceiptClick }: HistoryScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('date');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Groceries': 'bg-blue-100 text-blue-800',
      'Food & Drink': 'bg-orange-100 text-orange-800',
      'Transportation': 'bg-red-100 text-red-800',
      'Healthcare': 'bg-green-100 text-green-800',
      'Others': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const filteredReceipts = mockReceipts
    .filter(receipt => {
      const matchesSearch = receipt.merchantName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || receipt.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'amount') {
        return b.total - a.total;
      }
      return 0;
    });

  const totalAmount = filteredReceipts.reduce((sum, receipt) => sum + receipt.total, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10 p-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Riwayat</h1>
              <p className="text-sm text-muted-foreground">
                {filteredReceipts.length} struk • {formatCurrency(totalAmount)}
              </p>
            </div>
            <Receipt className="w-8 h-8 text-muted-foreground" />
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari nama toko..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex space-x-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Tanggal</SelectItem>
                  <SelectItem value="amount">Nominal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Receipts List */}
      <div className="max-w-md mx-auto p-4">
        {filteredReceipts.length === 0 ? (
          <div className="text-center py-12">
            <Receipt className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">Tidak ada struk ditemukan</h3>
            <p className="text-muted-foreground text-sm">
              Coba ubah filter atau kata kunci pencarian
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReceipts.map((receipt) => (
              <Card 
                key={receipt.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => onReceiptClick?.(receipt)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Store className="w-4 h-4 text-muted-foreground" />
                        <h3 className="font-semibold">{receipt.merchantName}</h3>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(receipt.date)}</span>
                        </div>
                        <span>{receipt.itemCount} item</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-lg">
                        {formatCurrency(receipt.total)}
                      </p>
                      <Badge 
                        variant="secondary"
                        className={`text-xs ${getCategoryColor(receipt.category)}`}
                      >
                        {receipt.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-2 border-t">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Hapus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}