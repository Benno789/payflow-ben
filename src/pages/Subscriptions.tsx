
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Subscription } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '@/components/Navigation';

// Mock-Daten für Abonnements
const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 14.99,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'entertainment',
    nextPaymentDate: new Date(2023, 7, 15)
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 9.99,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'entertainment',
    nextPaymentDate: new Date(2023, 7, 20)
  },
  {
    id: '3',
    name: 'Gym Membership',
    amount: 29.99,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'lifestyle',
    nextPaymentDate: new Date(2023, 7, 5)
  },
  {
    id: '4',
    name: 'Landlord',
    amount: 850.00,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'bills',
    nextPaymentDate: new Date(2023, 7, 1)
  },
  {
    id: '5',
    name: 'Techniker Krankenkasse',
    amount: 110.00,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'insurance',
    nextPaymentDate: new Date(2023, 7, 10)
  }
];

const Subscriptions: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [expandedSubscription, setExpandedSubscription] = useState<string | null>('1');
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

  const toggleSubscription = (id: string) => {
    if (expandedSubscription === id) {
      setExpandedSubscription(null);
    } else {
      setExpandedSubscription(id);
    }
  };

  const filteredSubscriptions = activeTab === 'overall' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.category === activeTab);

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
        <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
        
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'overall' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('overall')}
          >
            overall
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'entertainment' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('entertainment')}
          >
            entertainment
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'lifestyle' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('lifestyle')}
          >
            lifestyle
          </button>
        </div>
        
        <div className="space-y-3">
          {filteredSubscriptions.map(subscription => (
            <div 
              key={subscription.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button 
                className="w-full flex items-center justify-between p-4"
                onClick={() => toggleSubscription(subscription.id)}
              >
                <span className="font-medium">{subscription.name}</span>
                <div className="flex items-center">
                  <span className="mr-2">
                    {subscription.amount.toLocaleString('de-DE', { style: 'currency', currency: subscription.currency })} {subscription.frequency}
                  </span>
                  {expandedSubscription === subscription.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>
              
              {expandedSubscription === subscription.id && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-600">Next payment</p>
                      <p>
                        {subscription.nextPaymentDate.toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Category</p>
                      <p className="capitalize">{subscription.category}</p>
                    </div>
                    <div className="col-span-2 mt-2">
                      <button className="text-red-500 text-sm">Cancel subscription</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Navigation active="documents" />
    </div>
  );
};

export default Subscriptions;
