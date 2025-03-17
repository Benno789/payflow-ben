
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, TrendingUp, AlertTriangle, Landmark, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import ProfileSettings from '@/components/ProfileSettings';

const Analysis: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const navigate = useNavigate();
  
  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('onboardingCompleted') === 'true';
  
  // Load user profile data
  React.useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      if (profile.monthlyIncome) {
        setMonthlyIncome(profile.monthlyIncome);
      }
    }
    
    // Check for dark mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
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
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Analysis</h1>
        
        <div className="border-b border-gray-300 dark:border-gray-700 mb-8 pb-1"></div>
        
        <div className="mb-8">
          <div className="h-6 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full mb-4"></div>
          <div className="flex items-center mb-2">
            <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-300" />
            </div>
            <h2 className="text-3xl font-bold dark:text-white">87% Optimierung</h2>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Basierend auf deinem Einkommen von {monthlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</p>
          
          {showAlert && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 relative">
              <button 
                onClick={() => setShowAlert(false)}
                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-amber-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Abonnements</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Du zahlst überdurchschnittlich viel für Unterhaltungs-Abonnements. Überprüfe deine monatlichen Zahlungen.
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      className="text-sm dark:text-gray-300"
                      onClick={() => setShowAlert(false)}
                    >
                      Später
                    </Button>
                    <Button 
                      className="text-sm bg-black dark:bg-primary hover:bg-gray-800 dark:hover:bg-purple-600 text-white"
                      onClick={() => navigate('/subscriptions')}
                    >
                      Zeig mir mehr
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Einkommensverteilung</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                  <Landmark className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <span className="font-medium dark:text-white">Wohnen</span>
                <span className="ml-auto font-semibold dark:text-white">40%</span>
              </div>
              <Progress value={40} className="h-2 mb-1" />
              <p className="text-xs text-red-500">+10% über der Empfehlung</p>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Du gibst {(monthlyIncome * 0.4).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} für Wohnen aus.</p>
                <p className="mt-2">Empfehlung: Maximal 30% deines Einkommens.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                  <ShoppingBag className="h-4 w-4 text-green-600 dark:text-green-300" />
                </div>
                <span className="font-medium dark:text-white">Einkaufen</span>
                <span className="ml-auto font-semibold dark:text-white">15%</span>
              </div>
              <Progress value={15} className="h-2 mb-1" />
              <p className="text-xs text-green-500">Im empfohlenen Bereich</p>
              
              <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Du gibst {(monthlyIncome * 0.15).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} für Einkäufe aus.</p>
                <p className="mt-2">Empfehlung: 10-15% deines Einkommens.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="font-medium dark:text-white">Sparpotenzial</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Basierend auf deinen Ausgabengewohnheiten könntest du zusätzlich 
              {(monthlyIncome * 0.06).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} 
              pro Monat sparen, indem du deine Unterhaltungsausgaben reduzierst.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-1 dark:text-white">Einkommensverteilung</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Du gibst 40% deines Einkommens für Wohnen aus, was über den empfohlenen 30% liegt.
              {monthlyIncome > 0 && ` Bei deinem Einkommen von ${monthlyIncome.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })} 
              sind das ${(monthlyIncome * 0.4).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}.`}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-1 dark:text-white">Ausgabentrends</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Deine Ausgaben sind im Vergleich zum Vormonat um 15% gestiegen, hauptsächlich in der Kategorie Einkaufen.
            </p>
          </div>
        </div>
      </main>

      <ProfileSettings open={profileOpen} onOpenChange={setProfileOpen} />
      <Navigation active="profile" />
    </div>
  );
};

export default Analysis;
