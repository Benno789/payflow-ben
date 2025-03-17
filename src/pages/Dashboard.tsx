
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { Category, Subscription, Transaction } from '@/types';
import Navigation from '@/components/Navigation';
import { ChevronRight, ChevronDown } from 'lucide-react';

// Mock-Daten für das Dashboard
const categories: Category[] = [
  { id: '1', name: 'Wohnen', percentage: 30, color: '#caf9c0' },
  { id: '2', name: 'Transport', percentage: 15, color: '#aae9a0' },
  { id: '3', name: 'Lebensmittel', percentage: 20, color: '#8ad980' },
  { id: '4', name: 'Unterhaltung', percentage: 25, color: '#6ac960' },
  { id: '5', name: 'Sonstiges', percentage: 10, color: '#4ab940' }
];

const pieData = categories.map(cat => ({
  name: cat.name,
  value: cat.percentage,
  color: cat.color
}));

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const navigate = useNavigate();
  
  const totalExpenses = 1600.54;
  const lastMonthExpenses = 1333.78;
  const percentageChange = ((totalExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;
  const toSave = 533.51;

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
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        
        <div className="flex space-x-2 mb-4 overflow-x-auto">
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
              activeTab === 'categories' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('categories')}
          >
            categories
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'subscriptions' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setActiveTab('subscriptions')}
          >
            subscriptions
          </button>
        </div>
        
        <div className="bg-green-100 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">expenses</p>
          <h2 className="text-3xl font-bold">{totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h2>
          <p className={`text-sm ${percentageChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
            {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(0)}% over last month
          </p>
        </div>
        
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                stroke="#000"
                strokeWidth={1}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-black"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <p className="text-sm text-gray-600 mb-1">to save</p>
          <h2 className="text-3xl font-bold">{toSave.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h2>
        </div>
      </main>

      <Navigation active="home" />
    </div>
  );
};

export default Dashboard;
