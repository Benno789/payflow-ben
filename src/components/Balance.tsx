
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface BalanceProps {
  balance: number;
  currency: string;
  previousBalance?: number;
}

const Balance: React.FC<BalanceProps> = ({ 
  balance, 
  currency,
  previousBalance
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const calculateChange = () => {
    if (!previousBalance) return null;
    
    const change = ((balance - previousBalance) / previousBalance) * 100;
    const isPositive = change >= 0;
    
    return (
      <div className={`flex items-center text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? (
          <ArrowUp className="h-3 w-3 mr-1" />
        ) : (
          <ArrowDown className="h-3 w-3 mr-1" />
        )}
        <span>{Math.abs(change).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="text-sm text-gray-500 mb-1">Kontostand</div>
      <div className="flex items-center">
        <h2 className="text-3xl font-bold mr-2">{formatCurrency(balance)}</h2>
        {calculateChange()}
      </div>
    </div>
  );
};

export default Balance;
