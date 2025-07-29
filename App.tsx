import { useState, useEffect } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { ScanScreen } from './components/ScanScreen';
import { ScanResultScreen } from './components/ScanResultScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { BottomNavigation } from './components/BottomNavigation';

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

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [currentScanResult, setCurrentScanResult] = useState<ScanResult | null>(null);
  const [showScanResult, setShowScanResult] = useState(false);
  const [savedReceipts, setSavedReceipts] = useState<ScanResult[]>([]);

  // Check if user has completed onboarding
  useEffect(() => {
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    setHasCompletedOnboarding(!!onboardingComplete);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setHasCompletedOnboarding(true);
  };

  const handleScanComplete = (scanResult: ScanResult) => {
    setCurrentScanResult(scanResult);
    setShowScanResult(true);
  };

  const handleSaveScanResult = (scanResult: ScanResult) => {
    setSavedReceipts(prev => [scanResult, ...prev]);
    setShowScanResult(false);
    setCurrentScanResult(null);
    setActiveTab('home');
  };

  const handleCancelScan = () => {
    setShowScanResult(false);
    setCurrentScanResult(null);
    setActiveTab('home');
  };

  const handleQuickScan = () => {
    setActiveTab('scan');
  };

  const handleViewDashboard = () => {
    setActiveTab('dashboard');
  };

  const handleReceiptClick = (receipt: any) => {
    console.log('Receipt clicked:', receipt);
    // Could navigate to detailed view
  };

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  // Show scan result screen
  if (showScanResult && currentScanResult) {
    return (
      <ScanResultScreen
        scanResult={currentScanResult}
        onSave={handleSaveScanResult}
        onCancel={handleCancelScan}
      />
    );
  }

  // Main app with bottom navigation
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pb-16">
        {activeTab === 'home' && (
          <HomeScreen 
            onQuickScan={handleQuickScan}
            onViewDashboard={handleViewDashboard}
          />
        )}
        
        {activeTab === 'scan' && (
          <ScanScreen onScanComplete={handleScanComplete} />
        )}
        
        {activeTab === 'dashboard' && <DashboardScreen />}
        
        {activeTab === 'history' && (
          <HistoryScreen onReceiptClick={handleReceiptClick} />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  );
}