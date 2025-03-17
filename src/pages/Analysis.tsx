
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';

const Analysis: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true);
  const navigate = useNavigate();
  
  // Überprüfe, ob der Benutzer angemeldet ist
  const isLoggedIn = localStorage.getItem('onboardingCompleted') === 'true';
  
  if (!isLoggedIn) {
    // Wenn nicht angemeldet, leite zur Anmeldeseite weiter
    React.useEffect(() => {
      navigate('/signin');
    }, [navigate]);
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-green-300 p-4 flex items-center justify-between">
        <button className="text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center">
          <h1 className="font-bold text-xl mr-2">payflow</h1>
          <img src="/lovable-uploads/80f382fd-8b96-4c0e-bb3a-85d2daf023e5.png" alt="PayFlow Logo" className="w-6 h-6" />
        </div>
        <button className="text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </header>

      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Analysis</h1>
        
        <div className="border-b border-gray-300 mb-8 pb-1"></div>
        
        <div className="mb-8">
          <div className="h-6 bg-gradient-to-r from-red-400 to-green-400 rounded-full mb-4"></div>
          <h2 className="text-3xl font-bold text-center mb-8">87% optimization</h2>
          
          {showAlert && (
            <div className="bg-white rounded-lg shadow-md p-4 relative">
              <button 
                onClick={() => setShowAlert(false)}
                className="absolute top-2 right-2"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-xl font-semibold mb-2">Subscriptions</h3>
              <p className="text-gray-700 mb-4">
                you are paying overproportionately much on entertainment
              </p>
              <div className="flex gap-2 justify-end">
                <Button 
                  variant="outline" 
                  className="text-sm"
                  onClick={() => setShowAlert(false)}
                >
                  dismiss
                </Button>
                <Button 
                  className="text-sm bg-black hover:bg-gray-800"
                  onClick={() => navigate('/subscriptions')}
                >
                  show me
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-1">Savings Potential</h3>
            <p className="text-sm text-gray-600">
              Based on your spending habits, you could save an additional 150€ per month by reducing entertainment expenses.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-1">Income Distribution</h3>
            <p className="text-sm text-gray-600">
              You spend 40% of your income on housing, which is above the recommended 30%.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-1">Spending Trends</h3>
            <p className="text-sm text-gray-600">
              Your spending has increased by 15% compared to last month, primarily in the shopping category.
            </p>
          </div>
        </div>
      </main>

      <Navigation active="profile" />
    </div>
  );
};

export default Analysis;
