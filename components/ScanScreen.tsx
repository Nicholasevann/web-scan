import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Camera, Upload, Scan } from 'lucide-react';

interface ScanScreenProps {
  onScanComplete: (data: any) => void;
}

export function ScanScreen({ onScanComplete }: ScanScreenProps) {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      const mockScanResult = {
        id: Date.now(),
        date: new Date().toISOString(),
        merchantName: "Supermarket ABC",
        total: 125000,
        items: [
          { name: "Beras 5kg", price: 65000, quantity: 1 },
          { name: "Minyak Goreng", price: 25000, quantity: 2 },
          { name: "Gula Pasir", price: 10000, quantity: 1 }
        ],
        category: "Groceries"
      };
      
      setIsScanning(false);
      onScanComplete(mockScanResult);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleScan();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold mb-2">Scan Struk</h1>
          <p className="text-muted-foreground">
            Foto atau upload struk belanja Anda
          </p>
        </div>

        {/* Camera Preview Area */}
        <Card className="aspect-[3/4] overflow-hidden">
          <CardContent className="p-0 h-full">
            {isScanning ? (
              <div className="h-full flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <Scan className="w-12 h-12 mx-auto mb-4 animate-pulse text-primary" />
                  <p>Memproses struk...</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100 relative">
                <div className="text-center text-muted-foreground">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <p>Posisikan struk di dalam frame</p>
                </div>
                
                {/* Scan overlay */}
                <div className="absolute inset-4 border-2 border-primary border-dashed rounded-lg opacity-50"></div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full py-6 text-lg"
            size="lg"
          >
            <Camera className="w-6 h-6 mr-2" />
            {isScanning ? 'Memproses...' : 'Scan Sekarang'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Atau
              </span>
            </div>
          </div>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isScanning}
            />
            <Button
              variant="outline"
              disabled={isScanning}
              className="w-full py-6 text-lg"
              size="lg"
            >
              <Upload className="w-6 h-6 mr-2" />
              Upload Foto Struk
            </Button>
          </div>
        </div>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tips untuk hasil terbaik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm text-muted-foreground">
                Pastikan struk dalam kondisi terang dan tidak buram
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm text-muted-foreground">
                Posisikan struk rata dan tidak terlipat
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
              <p className="text-sm text-muted-foreground">
                Pastikan seluruh teks terlihat jelas
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}