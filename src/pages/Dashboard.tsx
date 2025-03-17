
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  Area,
  AreaChart
} from 'recharts';
import { Category, Subscription, Transaction, UserProfile } from '@/types';
import Navigation from '@/components/Navigation';
import { ChevronRight, ChevronDown, TrendingUp, TrendingDown, PieChart as PieChartIcon, BarChart as BarChartIcon, ArrowRight } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionList from '@/components/TransactionList';
import StockPortfolio from '@/components/StockPortfolio';
import NetWorthChart from '@/components/NetWorthChart';
import ProfileSettings from '@/components/ProfileSettings';

// Mock-Daten für das Dashboard
const categories: Category[] = [
  { id: '1', name: 'Wohnen', percentage: 30, color: '#42FF9F' },
  { id: '2', name: 'Transport', percentage: 15, color: '#34CC7F' },
  { id: '3', name: 'Lebensmittel', percentage: 20, color: '#8CFFCB' },
  { id: '4', name: 'Unterhaltung', percentage: 25, color: '#E2FFF2' },
  { id: '5', name: 'Sonstiges', percentage: 10, color: '#1A1F2C' }
];

// Abonnement-Daten
const subscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix',
    amount: 12.99,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'Unterhaltung',
    nextPaymentDate: new Date('2023-07-15')
  },
  {
    id: '2',
    name: 'Spotify',
    amount: 9.99,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'Unterhaltung',
    nextPaymentDate: new Date('2023-07-10')
  },
  {
    id: '3',
    name: 'Fitnessstudio',
    amount: 29.99,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'Gesundheit',
    nextPaymentDate: new Date('2023-07-05')
  },
  {
    id: '4',
    name: 'Amazon Prime',
    amount: 8.99,
    currency: 'EUR',
    frequency: 'monthly',
    category: 'Einkaufen',
    nextPaymentDate: new Date('2023-07-20')
  }
];

// Monatliche Ausgaben-Daten für Balkendiagramm
const monthlyExpenseData = [
  { name: 'Jan', amount: 1650 },
  { name: 'Feb', amount: 1480 },
  { name: 'Mar', amount: 1720 },
  { name: 'Apr', amount: 1590 },
  { name: 'Mai', amount: 1830 },
  { name: 'Jun', amount: 1620 }
];

// NetWorth-Daten
const netWorthData = [
  { month: 'Jan', value: 15000, percentChange: 0 },
  { month: 'Feb', value: 15750, percentChange: 5 },
  { month: 'Mar', value: 16200, percentChange: 2.8 },
  { month: 'Apr', value: 16500, percentChange: 1.8 },
  { month: 'Mai', value: 17200, percentChange: 4.2 },
  { month: 'Jun', value: 18500, percentChange: 7.5 },
  { month: 'Jul', value: 20000, percentChange: 8.1 },
  { month: 'Aug', value: 21500, percentChange: 7.5 },
];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overall');
  const [showExpenseBarChart, setShowExpenseBarChart] = useState(false);
  const [forecastMode, setForecastMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  
  // Load user profile data on initial render
  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUserProfile(profile);
      
      // Generate transactions based on profile data
      const generatedTransactions = generateTransactions(profile);
      setTransactions(generatedTransactions);
    }
    
    // Check for dark mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Function to generate transactions based on profile data
  const generateTransactions = (profile: UserProfile): Transaction[] => {
    const result: Transaction[] = [];
    
    if (profile.monthlyIncome) {
      // Income transaction
      result.push({
        id: '1',
        type: 'incoming',
        amount: profile.monthlyIncome,
        currency: 'EUR',
        sender: 'Arbeitgeber GmbH',
        date: new Date('2023-06-28'),
        description: 'Gehalt Juni',
        status: 'completed'
      });
      
      // Rent transaction
      if (profile.rentAmount && profile.doesRent) {
        result.push({
          id: '2',
          type: 'outgoing',
          amount: profile.rentAmount,
          currency: 'EUR',
          recipient: 'Vermietung GmbH',
          date: new Date('2023-06-01'),
          description: 'Miete Juni',
          category: 'Wohnen',
          status: 'completed'
        });
      }
      
      // Generate other transactions based on income
      result.push({
        id: '3',
        type: 'outgoing',
        amount: profile.monthlyIncome * 0.05,
        currency: 'EUR',
        recipient: 'ÖPNV',
        date: new Date('2023-06-03'),
        description: 'Monatsticket',
        category: 'Transport',
        status: 'completed'
      });
      
      result.push({
        id: '4',
        type: 'outgoing',
        amount: profile.monthlyIncome * 0.12,
        currency: 'EUR',
        recipient: 'Supermarkt',
        date: new Date('2023-06-05'),
        description: 'Wocheneinkauf',
        category: 'Lebensmittel',
        status: 'completed'
      });
      
      result.push({
        id: '5',
        type: 'outgoing',
        amount: 49.99,
        currency: 'EUR',
        recipient: 'Streaming-Dienst',
        date: new Date('2023-06-15'),
        description: 'Abonnement',
        category: 'Unterhaltung',
        status: 'completed',
        suspicious: true
      });
    } else {
      // Fallback to mock data if no income provided
      return [
        {
          id: '1',
          type: 'incoming',
          amount: 2800,
          currency: 'EUR',
          sender: 'Arbeitgeber GmbH',
          date: new Date('2023-06-28'),
          description: 'Gehalt Juni',
          status: 'completed'
        },
        {
          id: '2',
          type: 'outgoing',
          amount: 1200,
          currency: 'EUR',
          recipient: 'Vermietung GmbH',
          date: new Date('2023-06-01'),
          description: 'Miete Juni',
          category: 'Wohnen',
          status: 'completed'
        },
        {
          id: '3',
          type: 'outgoing',
          amount: 99.99,
          currency: 'EUR',
          recipient: 'ÖPNV',
          date: new Date('2023-06-03'),
          description: 'Monatsticket',
          category: 'Transport',
          status: 'completed',
          suspicious: true
        },
        {
          id: '4',
          type: 'outgoing',
          amount: 156.87,
          currency: 'EUR',
          recipient: 'Supermarkt',
          date: new Date('2023-06-05'),
          description: 'Wocheneinkauf',
          category: 'Lebensmittel',
          status: 'completed'
        },
        {
          id: '5',
          type: 'outgoing',
          amount: 49.99,
          currency: 'EUR',
          recipient: 'Streaming-Dienst',
          date: new Date('2023-06-15'),
          description: 'Abonnement',
          category: 'Unterhaltung',
          status: 'completed'
        }
      ];
    }
    
    return result;
  };

  // Calculate total expenses from transactions
  const totalExpenses = transactions
    .filter(tx => tx.type === 'outgoing')
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  // Last month's expenses (mock data with some relation to current expenses)
  const lastMonthExpenses = totalExpenses * 0.85;
  const percentageChange = ((totalExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;
  
  // To save amount (based on income or mock data)
  const monthlyIncome = userProfile?.monthlyIncome || 2800;
  const toSave = monthlyIncome * 0.2; // 20% of income for saving
  
  // Total subscriptions
  const totalSubscriptions = subscriptions.reduce((sum, sub) => sum + sub.amount, 0);

  // Calculate expenses by category
  const expensesByCategory = categories.map(cat => ({
    name: cat.name,
    value: (totalExpenses * cat.percentage) / 100,
    color: cat.color
  }));

  // Pie data
  const pieData = expensesByCategory.map(cat => ({
    name: cat.name,
    value: cat.value,
    color: cat.color
  }));

  // Check if the user is logged in
  const isLoggedIn = localStorage.getItem('onboardingCompleted') === 'true';
  
  if (!isLoggedIn) {
    // If not logged in, redirect to the sign-in page
    React.useEffect(() => {
      navigate('/signin');
    }, [navigate]);
    return null;
  }

  const handleViewTransactions = () => {
    navigate('/transactions');
  };

  const CategoriesContent = () => (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3 dark:text-white">Ausgaben nach Kategorie</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="category-card bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-sm mr-2" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="dark:text-white">{category.name}</span>
                </div>
                <span className="font-semibold dark:text-white">
                  {((totalExpenses * category.percentage) / 100).toLocaleString('de-DE', { 
                    style: 'currency', 
                    currency: 'EUR' 
                  })}
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ 
                    width: `${category.percentage}%`, 
                    backgroundColor: category.color 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 dark:text-white">Monatliche Ausgabenentwicklung</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyExpenseData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [
                  value.toLocaleString('de-DE', { 
                    style: 'currency', 
                    currency: 'EUR' 
                  }), 
                  "Ausgaben"
                ]}
              />
              <Bar dataKey="amount" fill="var(--chart-line, #42FF9F)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const SubscriptionsContent = () => {
    const totalMonthly = subscriptions.reduce((sum, sub) => 
      sub.frequency === 'monthly' ? sum + sub.amount : sum + (sub.amount / 12), 0);
      
    return (
      <div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold dark:text-white">Deine Abonnements</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monatliche Gesamtkosten</p>
              <p className="text-xl font-bold text-payflow-green-dark dark:text-primary">
                {totalMonthly.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              <button className="px-4 py-2 bg-payflow-green dark:bg-primary text-black dark:text-white rounded-lg text-sm font-medium hover:bg-payflow-green-dark dark:hover:bg-purple-600 transition-colors">
                Neues Abo hinzufügen
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3 dark:text-white">
                    {sub.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">{sub.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Nächste Zahlung: {sub.nextPaymentDate.toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold dark:text-white">
                    {sub.amount.toLocaleString('de-DE', { 
                      style: 'currency', 
                      currency: sub.currency 
                    })}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {sub.frequency === 'monthly' ? 'Monatlich' : 
                     sub.frequency === 'yearly' ? 'Jährlich' : 'Wöchentlich'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3 dark:text-white">Abonnements nach Kategorie</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Unterhaltung', value: 31.97, color: '#42FF9F' },
                    { name: 'Gesundheit', value: 29.99, color: '#34CC7F' },
                    { name: 'Einkaufen', value: 8.99, color: '#8CFFCB' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [
                    value.toLocaleString('de-DE', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    }), 
                    "Betrag"
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            {[
              { name: 'Unterhaltung', value: 31.97, color: '#42FF9F' },
              { name: 'Gesundheit', value: 29.99, color: '#34CC7F' },
              { name: 'Einkaufen', value: 8.99, color: '#8CFFCB' }
            ].map((item, index) => (
              <div key={index} className="legend-item mr-4">
                <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                <span className="dark:text-white">{item.name}: {item.value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

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

      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Dashboard</h1>
        
        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="flex w-full overflow-x-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            <TabsTrigger value="overall" className="flex-1 rounded-full data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-primary">
              overall
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex-1 rounded-full data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-primary">
              categories
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex-1 rounded-full data-[state=active]:bg-black data-[state=active]:text-white dark:data-[state=active]:bg-primary">
              subscriptions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="mt-0">
            <div className="bg-payflow-green dark:bg-primary rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-200 mb-1">expenses</p>
              <h2 className="text-3xl font-bold dark:text-white">{totalExpenses.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h2>
              <p className={`text-sm ${percentageChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {percentageChange > 0 ? '+' : ''}{percentageChange.toFixed(0)}% over last month
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white">Ausgabenverteilung</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setShowExpenseBarChart(false)}
                    className={`p-1.5 rounded-md ${!showExpenseBarChart ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  >
                    <PieChartIcon size={18} className="dark:text-white" />
                  </button>
                  <button 
                    onClick={() => setShowExpenseBarChart(true)}
                    className={`p-1.5 rounded-md ${showExpenseBarChart ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  >
                    <BarChartIcon size={18} className="dark:text-white" />
                  </button>
                </div>
              </div>
              
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  {!showExpenseBarChart ? (
                    <PieChart>
                      <Pie
                        data={expensesByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {expensesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [
                          value.toLocaleString('de-DE', { 
                            style: 'currency', 
                            currency: 'EUR' 
                          }), 
                          "Ausgaben"
                        ]}
                      />
                    </PieChart>
                  ) : (
                    <BarChart data={expensesByCategory} layout="vertical">
                      <YAxis type="category" dataKey="name" />
                      <XAxis type="number" />
                      <Tooltip 
                        formatter={(value) => [
                          value.toLocaleString('de-DE', { 
                            style: 'currency', 
                            currency: 'EUR' 
                          }), 
                          "Ausgaben"
                        ]}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {expensesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="chart-legend">
                {expensesByCategory.map((item, index) => (
                  <div key={index} className="legend-item mr-4">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <span className="dark:text-white">{item.name}: {item.value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">to save</p>
                  <h2 className="text-3xl font-bold dark:text-white">{toSave.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}</h2>
                </div>
                <button 
                  onClick={handleViewTransactions}
                  className="flex items-center text-payflow-green dark:text-primary hover:underline"
                >
                  <span className="mr-1">Transactions</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2">
                <StockPortfolio />
              </div>
              <div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 h-full">
                  <h3 className="text-lg font-semibold mb-2 dark:text-white">Abonnements</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Monatliche Ausgaben</p>
                  <p className="text-2xl font-bold text-payflow-green-dark dark:text-primary mb-4">
                    {totalSubscriptions.toLocaleString('de-DE', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </p>
                  <button className="text-sm text-payflow-green dark:text-primary hover:underline flex items-center">
                    <span>Alle anzeigen</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white">Nettovermögen</h3>
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
                    Next Month
                  </button>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center">
                  <h4 className="text-2xl font-bold mr-2 dark:text-white">
                    {forecastMode 
                      ? (netWorthData[netWorthData.length-1].value * 1.06).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
                      : netWorthData[netWorthData.length-1].value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
                    }
                  </h4>
                  <div className={`flex items-center text-sm ${
                    (forecastMode ? 6.0 : netWorthData[netWorthData.length-1].percentChange) > 0 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }`}>
                    {(forecastMode ? 6.0 : netWorthData[netWorthData.length-1].percentChange) > 0 
                      ? <TrendingUp className="h-3 w-3 mr-1" /> 
                      : <TrendingDown className="h-3 w-3 mr-1" />
                    }
                    <span>
                      {(forecastMode ? 6.0 : netWorthData[netWorthData.length-1].percentChange) > 0 ? '+' : ''}
                      {(forecastMode ? 6.0 : netWorthData[netWorthData.length-1].percentChange).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {forecastMode ? 'Prognose für nächsten Monat' : 'Aktuelle Entwicklung'}
                </p>
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

            <TransactionList transactions={transactions} limit={3} />
          </TabsContent>

          <TabsContent value="categories" className="mt-0">
            <CategoriesContent />
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-0">
            <SubscriptionsContent />
          </TabsContent>
        </Tabs>
      </main>

      <ProfileSettings open={profileOpen} onOpenChange={setProfileOpen} />
      <Navigation active="home" />
    </div>
  );
};

export default Dashboard;
