
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Moon, Sun, User, Settings, LogOut } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserProfile } from '@/types';
import { toast } from 'sonner';

interface ProfileSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ open, onOpenChange }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
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
    // Load profile data from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    // Check for dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UserProfile) => {
    const value = e.target.value;
    const numValue = value === '' ? undefined : parseFloat(value);
    
    setProfile(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    toast.success('Profil wurde aktualisiert');
  };

  const handleLogout = () => {
    localStorage.removeItem('onboardingCompleted');
    navigate('/signin');
    toast.info('Du wurdest abgemeldet');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-900 dark:text-white">
        <DialogHeader>
          <DialogTitle>Profileinstellungen</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appearance">Aussehen</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="settings">Einstellungen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-4 pt-4">
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
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-4 pt-4">
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
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                name="address"
                value={profile.address || ''}
                onChange={handleInputChange}
                placeholder="Straße, Stadt"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monatliches Einkommen (€)</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={profile.monthlyIncome || ''}
                onChange={(e) => handleNumberInputChange(e, 'monthlyIncome')}
                placeholder="z.B. 2500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rentAmount">Miethöhe (€)</Label>
              <Input
                id="rentAmount"
                type="number"
                value={profile.rentAmount || ''}
                onChange={(e) => handleNumberInputChange(e, 'rentAmount')}
                placeholder="z.B. 950"
              />
            </div>
            
            <Button onClick={handleSaveProfile} className="w-full">Speichern</Button>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 pt-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Abmelden
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSettings;
