
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stock, NetWorthDataPoint } from '@/types';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NetWorthChart from '@/components/NetWorthChart';
import StockPortfolio from '@/components/StockPortfolio';
import { ArrowUpRight, ArrowDownRight, Dumbbell, LampDesk, BarChart } from 'lucide-react';
import ProfileSettings from '@/components/ProfileSettings';

const Assets: React.FC = () => {
  const [forecastMode, setForecastMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bankBalance, setBankBalance] = useState(14500);
  const [investments, setInvestments] = useState(7000);
  const navigate = useNavigate();
  
  // Load the user profile to calculate real values
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  
  useEffect(() => {
    // Get user profile data
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      if (profile.monthlyIncome) {
        setMonthlyIncome(profile.monthlyIncome);
        setBankBalance(profile.monthlyIncome * 5); // Example: 5 months of savings
        setInvestments(profile.monthlyIncome * 3); // Example: 3 months in investments
      }
    }
    
    // Check for dark mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const totalAssets = bankBalance + investments;
  
  // Dynamic net worth data based on income
  const netWorthData: NetWorthDataPoint[] = [
    { month: 'Jan', value: totalAssets * 0.75, percentChange: 0 },
    { month: 'Feb', value: totalAssets * 0.79, percentChange: 5 },
    { month: 'Mar', value: totalAssets * 0.81, percentChange: 2.8 },
    { month: 'Apr', value: totalAssets * 0.82, percentChange: 1.8 },
    { month: 'Mai', value: totalAssets * 0.86, percentChange: 4.2 },
    { month: 'Jun', value: totalAssets * 0.92, percentChange: 7.5 },
    { month: 'Jul', value: totalAssets * 0.99, percentChange: 8.1 },
    { month: 'Aug', value: totalAssets, percentChange: 7.5 },
  ];

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('onboardingCompleted') === 'true';
  
  if (!isLoggedIn) {
    // If not logged in, redirect to the sign-in page
    React.useEffect(() => {
      navigate('/signin');
    }, [navigate]);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16">
      <header className="bg-payflow-green dark:bg-primary p-4 flex items-center justify-between">
        <button className="text-black dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center">
          <h1 className="font-bold text-xl mr-2">payflow</h1>
          <img src="/lovable-uploads/80f382fd-8b96-4c0e-bb3a-85d2daf023e5.png" alt="PayFlow Logo" className="w-6 h-6" />
        </div>
        <button className="text-black dark:text-white" onClick={() => setProfileOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Vermögensübersicht</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Gesamtvermögen</CardTitle>
              <CardDescription className="dark:text-gray-400">Aktueller Wert</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{totalAssets.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12.4%
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800 dark:text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Monatliche Sparrate</CardTitle>
              <CardDescription className="dark:text-gray-400">Basierend auf deinem Einkommen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-3xl font-bold">{(monthlyIncome * 0.2).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 flex items-center">
                  20% vom Einkommen
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Vermögensentwicklung</h3>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
              <button 
                onClick={() => setForecastMode(false)} 
                className={`px-3 py-1.5 text-xs ${!forecastMode ? 'bg-black text-white dark:bg-primary' : 'dark:text-white'}`}
              >
                Aktuell
              </button>
              <button 
                onClick={() => setForecastMode(true)} 
                className={`px-3 py-1.5 text-xs ${forecastMode ? 'bg-black text-white dark:bg-primary' : 'dark:text-white'}`}
              >
                Prognose
              </button>
            </div>
          </div>
          
          <style jsx>{`
            :root {
              --chart-gradient-start: #42FF9F;
              --chart-gradient-end: #42FF9F;
              --chart-line: #42FF9F;
            }
            
            .dark {
              --chart-gradient-start: #9b87f5;
              --chart-gradient-end: #9b87f5;
              --chart-line: #9b87f5;
            }
          `}</style>
          
          <NetWorthChart data={netWorthData} forecast={forecastMode} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
          <div className="md:col-span-8">
            <Card className="dark:bg-gray-800 dark:text-white h-full">
              <CardHeader>
                <CardTitle>Vermögensaufteilung</CardTitle>
                <CardDescription className="dark:text-gray-400">Verteilung deines Vermögens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 text-blue-600 dark:text-blue-300">
                        <LampDesk size={18} />
                      </div>
                      <span className="font-medium">Bankguthaben</span>
                    </div>
                    <p className="text-xl font-semibold">{bankBalance.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round(bankBalance/totalAssets*100)}% deines Vermögens</p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3 text-green-600 dark:text-green-300">
                        <BarChart size={18} />
                      </div>
                      <span className="font-medium">Investitionen</span>
                    </div>
                    <p className="text-xl font-semibold">{investments.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{Math.round(investments/totalAssets*100)}% deines Vermögens</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-4">
            <Card className="h-full dark:bg-gray-800 dark:text-white">
              <CardHeader>
                <CardTitle>Empfehlungen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-2 text-amber-600 dark:text-amber-300">
                    <Dumbbell size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Diversifiziere dein Portfolio</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mehr Aktien könnten dein Wachstum steigern</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2 text-green-600 dark:text-green-300">
                    <ArrowUpRight size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Erhöhe deine Sparrate</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Du könntest mehr als 20% sparen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <StockPortfolio />
      </main>

      <ProfileSettings open={profileOpen} onOpenChange={setProfileOpen} />
      <Navigation active="assets" />
    </div>
  );
};

export default Assets;
