import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingSlide {
  title: string;
  description: string;
  illustration: string;
}

const slides: OnboardingSlide[] = [
  {
    title: "Scan Struk Belanja",
    description: "Foto struk belanja Anda dengan mudah dan otomatis tersimpan",
    illustration: "📱"
  },
  {
    title: "Analisis Otomatis",
    description: "AI kami akan menganalisis pengeluaran dan kategori otomatis",
    illustration: "🤖"
  },
  {
    title: "Laporan Keuangan",
    description: "Lihat ringkasan pengeluaran bulanan dengan grafik yang mudah dipahami",
    illustration: "📊"
  }
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-between p-6">
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-sm mx-auto">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-6">
              {slides[currentSlide].illustration}
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              {slides[currentSlide].title}
            </h2>
            <p className="text-muted-foreground">
              {slides[currentSlide].description}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {/* Progress indicators */}
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Kembali</span>
          </Button>

          <Button onClick={nextSlide} className="flex items-center space-x-2">
            <span>{currentSlide === slides.length - 1 ? 'Mulai' : 'Lanjut'}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={onComplete}>
            Lewati
          </Button>
        </div>
      </div>
    </div>
  );
}