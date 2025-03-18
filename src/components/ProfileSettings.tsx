
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Moon, Sun, User, Settings, LogOut, ArrowLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { UserProfile } from '@/types';
import { toast } from 'sonner';

interface ProfileSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ open, onOpenChange }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    monthlyIncome: undefined,
    rentAmount: undefined,
    doesRent: undefined
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));

    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    toast.success(`${newDarkMode ? 'Dark' : 'Light'} Mode aktiviert`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setShowPersonalInfo(false);
    toast.success('Profil wurde aktualisiert');
  };

  const handleLogout = () => {
    localStorage.removeItem('onboardingCompleted');
    navigate('/signin');
    toast.info('Du wurdest abgemeldet');
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md dark:bg-gray-900 dark:text-white overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold flex items-center">
            {showPersonalInfo ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2" 
                onClick={() => setShowPersonalInfo(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            ) : null}
            {showPersonalInfo ? 'Persönliche Angaben' : 'Einstellungen'}
          </SheetTitle>
        </SheetHeader>

        {!showPersonalInfo ? (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              onClick={() => setShowPersonalInfo(true)}
            >
              <User className="mr-2 h-5 w-5" />
              Persönliche Angaben
            </Button>

            <div className="space-y-4">
              <h3 className="font-medium">Verbundene Banken</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-300">DB</span>
                    </div>
                    <span>Deutsche Bank</span>
                  </div>
                  <Button variant="ghost" size="sm">Bearbeiten</Button>
                </div>
                
                <Button variant="outline" className="w-full">
                  + Neue Bank hinzufügen
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Darstellung</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={handleDarkModeToggle}
                />
              </div>
            </div>

            <Button 
              variant="destructive" 
              className="w-full mt-auto"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Abmelden
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Vorname</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  placeholder="Vorname"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nachname</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  placeholder="Nachname"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleInputChange}
                placeholder="name@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monatliches Einkommen (€)</Label>
              <Input
                id="monthlyIncome"
                name="monthlyIncome"
                type="number"
                value={profile.monthlyIncome || ''}
                onChange={handleInputChange}
                placeholder="z.B. 2500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rentAmount">Miethöhe (€)</Label>
              <Input
                id="rentAmount"
                name="rentAmount"
                type="number"
                value={profile.rentAmount || ''}
                onChange={handleInputChange}
                placeholder="z.B. 950"
              />
            </div>
            
            <Button onClick={handleSaveProfile} className="w-full">
              Speichern
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSettings;
