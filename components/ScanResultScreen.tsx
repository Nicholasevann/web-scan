import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Edit2, Save, X, Calendar, Store, Receipt } from 'lucide-react';

interface ScanResult {
  id: number;
  date: string;
  merchantName: string;
  total: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  category: string;
}

interface ScanResultScreenProps {
  scanResult: ScanResult;
  onSave: (result: ScanResult) => void;
  onCancel: () => void;
}

export function ScanResultScreen({ scanResult, onSave, onCancel }: ScanResultScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedResult, setEditedResult] = useState(scanResult);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSave = () => {
    onSave(editedResult);
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const updatedItems = [...editedResult.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setEditedResult({
      ...editedResult,
      items: updatedItems,
      total: newTotal
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b z-10 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold">Hasil Scan</h1>
              <p className="text-sm text-muted-foreground">Verifikasi data</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="w-5 h-5" />
            </Button>
            <Button onClick={handleSave} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Simpan
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* OCR Preview */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Receipt className="w-5 h-5 mr-2" />
                Informasi Struk
              </CardTitle>
              <Badge variant="secondary">OCR Result</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="merchant">Nama Toko</Label>
                {isEditing ? (
                  <Input
                    id="merchant"
                    value={editedResult.merchantName}
                    onChange={(e) => setEditedResult({
                      ...editedResult,
                      merchantName: e.target.value
                    })}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Store className="w-4 h-4 mr-2 text-muted-foreground" />
                    <p>{editedResult.merchantName}</p>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="date">Tanggal</Label>
                {isEditing ? (
                  <Input
                    id="date"
                    type="date"
                    value={editedResult.date.split('T')[0]}
                    onChange={(e) => setEditedResult({
                      ...editedResult,
                      date: e.target.value + 'T00:00:00.000Z'
                    })}
                  />
                ) : (
                  <div className="flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                    <p>{new Date(editedResult.date).toLocaleDateString('id-ID')}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="category">Kategori</Label>
              {isEditing ? (
                <Input
                  id="category"
                  value={editedResult.category}
                  onChange={(e) => setEditedResult({
                    ...editedResult,
                    category: e.target.value
                  })}
                />
              ) : (
                <div className="mt-1">
                  <Badge variant="outline">{editedResult.category}</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Daftar Belanja</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {editedResult.items.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <Label>Nama Item</Label>
                    {isEditing ? (
                      <Input
                        value={item.name}
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                      />
                    ) : (
                      <p className="mt-1">{item.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Qty</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                      />
                    ) : (
                      <p className="mt-1">{item.quantity}x</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex-1 mr-2">
                    <Label>Harga</Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', parseInt(e.target.value) || 0)}
                      />
                    ) : (
                      <p className="mt-1">{formatCurrency(item.price)}</p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <Label>Subtotal</Label>
                    <p className="mt-1 font-medium">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
                
                {index < editedResult.items.length - 1 && <Separator />}
              </div>
            ))}
            
            <Separator className="my-4" />
            
            <div className="flex justify-between items-center text-lg">
              <span>Total:</span>
              <span className="font-bold text-primary">
                {formatCurrency(editedResult.total)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button variant="outline" onClick={onCancel} className="flex-1">
            Batal
          </Button>
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Simpan Struk
          </Button>
        </div>
      </div>
    </div>
  );
}