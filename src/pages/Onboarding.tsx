
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { UserProfile, BankConnection } from '@/types';
import { ChevronRight, X, Search } from 'lucide-react';
import { toast } from 'sonner';

const bankConnections: BankConnection[] = [
  {
    id: '1',
    name: 'PayPal',
    description: 'Online payment service',
    logo: 'P',
    connected: true
  },
  {
    id: '2',
    name: 'N26',
    description: 'Digital bank',
    logo: 'N',
    connected: true
  },
  {
    id: '3',
    name: 'Commerzbank',
    description: 'Traditional bank',
    logo: 'C',
    connected: true
  },
  {
    id: '4',
    name: 'Deutsche Bank',
    description: 'Commercial bank',
    logo: 'D',
    connected: false
  },
  {
    id: '5',
    name: 'Sparkasse',
    description: 'Local savings bank',
    logo: 'S',
    connected: false
  }
];

const Onboarding: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>('about you');
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: localStorage.getItem('userEmail') || '',
    address: '',
    monthlyIncome: undefined,
    rentAmount: undefined,
    doesRent: undefined
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedBanks, setSelectedBanks] = useState<BankConnection[]>(bankConnections.slice(0, 3));
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    const numValue = value === '' ? undefined : parseFloat(value);
    
    setProfile({
      ...profile,
      [field]: numValue
    });
  };

  const handleSelectChange = (value: string, field: string) => {
    setProfile({
      ...profile,
      [field]: value === 'yes'
    });
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'about you') {
      setStep(1);
    } else if (tab === 'accounts') {
      if (!validatePersonalInfo()) {
        toast.error("Bitte fülle zuerst deine persönlichen Informationen aus");
        setActiveTab('about you');
        return;
      }
      setStep(2);
    } else if (tab === 'subscriptions') {
      toast.info("Abonnements werden nach der Kontoverbindung angezeigt");
    }
  };

  const validatePersonalInfo = () => {
    if (!profile.firstName || !profile.lastName || !profile.email) {
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validatePersonalInfo()) {
        toast.error("Bitte fülle alle erforderlichen Felder aus");
        return;
      }
      setStep(2);
      setActiveTab('accounts');
    } else if (step === 2) {
      if (selectedBanks.length === 0) {
        toast.error("Bitte verbinde mindestens ein Bankkonto");
        return;
      }
      // In einer echten App würden wir hier die Daten speichern
      localStorage.setItem('userProfile', JSON.stringify(profile));
      localStorage.setItem('onboardingCompleted', 'true');
      navigate('/dashboard');
    }
  };

  const filteredBanks = bankConnections.filter(bank => 
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleBankSelection = (bank: BankConnection) => {
    if (selectedBanks.some(b => b.id === bank.id)) {
      setSelectedBanks(selectedBanks.filter(b => b.id !== bank.id));
    } else {
      setSelectedBanks([...selectedBanks, bank]);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Help us setting up your profile</h1>
        
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'about you' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleTabClick('about you')}
          >
            about you
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'accounts' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleTabClick('accounts')}
          >
            accounts
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm ${
              activeTab === 'subscriptions' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleTabClick('subscriptions')}
          >
            subscriptions
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700`}
          >
            Categories
          </button>
        </div>
        
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <p className="mb-1">do you rent?</p>
              <Select 
                onValueChange={(value) => handleSelectChange(value, 'doesRent')}
                value={profile.doesRent === undefined ? undefined : profile.doesRent ? 'yes' : 'no'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="choose answer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {profile.doesRent && (
              <div>
                <p className="mb-1">how much do you pay for rent</p>
                <Input
                  type="number"
                  placeholder="e.g. 950€"
                  value={profile.rentAmount || ''}
                  onChange={(e) => handleNumberInputChange(e, 'rentAmount')}
                />
              </div>
            )}
            
            <div>
              <p className="mb-1">what is your monthly income?</p>
              <Input
                type="number"
                placeholder="e.g. 2500€"
                value={profile.monthlyIncome || ''}
                onChange={(e) => handleNumberInputChange(e, 'monthlyIncome')}
              />
            </div>
            
            <div>
              <p className="mb-1">Name</p>
              <Input
                name="firstName"
                placeholder="Max"
                value={profile.firstName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <p className="mb-1">Surname</p>
              <Input
                name="lastName"
                placeholder="Mustermann"
                value={profile.lastName}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <p className="mb-1">Email</p>
              <Input
                name="email"
                type="email"
                placeholder="max.mustermann@gmail.com"
                value={profile.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <p className="mb-1">Address</p>
              <Input
                name="address"
                placeholder="Musterstr. 1, 11111 Berlin"
                value={profile.address || ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Which bank accounts do you want to connect</h2>
            
            <div className="relative mb-4">
              <Input
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              {searchTerm ? (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchTerm('')}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              ) : (
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              )}
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <h3 className="text-sm font-medium mb-3">added bank accounts</h3>
              
              {selectedBanks.length > 0 ? (
                <div className="space-y-3">
                  {selectedBanks.map(bank => (
                    <div key={bank.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-bold">
                        {bank.logo}
                      </div>
                      <div>
                        <p className="font-medium">{bank.name}</p>
                        <p className="text-xs text-gray-500">{bank.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No banks selected</p>
              )}
            </div>
            
            {searchTerm && filteredBanks.length > 0 && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {filteredBanks.map(bank => (
                  <button
                    key={bank.id}
                    className="w-full text-left p-3 hover:bg-gray-50 flex items-center"
                    onClick={() => toggleBankSelection(bank)}
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 text-blue-700 font-bold">
                      {bank.logo}
                    </div>
                    <div>
                      <p className="font-medium">{bank.name}</p>
                      <p className="text-xs text-gray-500">{bank.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleNext}
            className="bg-gray-900 hover:bg-black"
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
