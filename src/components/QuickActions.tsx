
import React from 'react';
import { ArrowUpRight, ArrowDownLeft, CreditCard, Copy, BarChart, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuickActions: React.FC = () => {
  const actions = [
    { 
      icon: <ArrowUpRight className="h-5 w-5" />, 
      label: 'Senden', 
      color: 'bg-green-100 text-green-600' 
    },
    { 
      icon: <ArrowDownLeft className="h-5 w-5" />, 
      label: 'Empfangen', 
      color: 'bg-blue-100 text-blue-600' 
    },
    { 
      icon: <CreditCard className="h-5 w-5" />, 
      label: 'Karten', 
      color: 'bg-purple-100 text-purple-600' 
    },
    { 
      icon: <Copy className="h-5 w-5" />, 
      label: 'Kopieren', 
      color: 'bg-orange-100 text-orange-600' 
    },
    { 
      icon: <BarChart className="h-5 w-5" />, 
      label: 'Statistiken', 
      color: 'bg-payflow-purple-lighter text-payflow-purple-dark' 
    },
    { 
      icon: <FileText className="h-5 w-5" />, 
      label: 'Rechnungen', 
      color: 'bg-gray-100 text-gray-600' 
    },
  ];

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-4">Schnellzugriff</h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex flex-col items-center justify-center h-20 p-2 border rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${action.color} mb-1`}>
              {action.icon}
            </div>
            <span className="text-xs mt-1">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
