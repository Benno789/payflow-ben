
import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white border-b">
      <div className="flex items-center">
        <div className="mr-4 lg:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <h1 className="text-2xl font-bold text-payflow-purple">PayFlow</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="hidden md:flex items-center mr-2 bg-gray-100 rounded-full px-4 py-2">
          <Search className="h-4 w-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none text-sm w-32 md:w-48"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <div className="flex items-center ml-2">
          <div className="w-9 h-9 rounded-full bg-payflow-purple flex items-center justify-center text-white font-medium">
            MB
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
