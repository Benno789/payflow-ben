
import React from 'react';
import { Transaction } from '@/types';
import { ArrowUpRight, ArrowDownLeft, CreditCard, ShoppingBag, Coffee, Home } from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: transaction.currency,
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getIcon = () => {
    if (transaction.type === 'incoming') {
      return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
    } else if (transaction.type === 'outgoing') {
      if (transaction.category === 'shopping') {
        return <ShoppingBag className="h-5 w-5 text-purple-500" />;
      } else if (transaction.category === 'food') {
        return <Coffee className="h-5 w-5 text-orange-500" />;
      } else if (transaction.category === 'bills') {
        return <Home className="h-5 w-5 text-blue-500" />;
      } else {
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      }
    } else {
      return <CreditCard className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center justify-between py-3 border-b last:border-b-0">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 mr-4">
          {getIcon()}
        </div>
        <div>
          <h4 className="font-medium">
            {transaction.type === 'incoming' 
              ? transaction.sender 
              : transaction.recipient}
          </h4>
          <p className="text-sm text-gray-500">
            {transaction.description || 
              (transaction.type === 'incoming' ? 'Eingehende Zahlung' : 'Ausgehende Zahlung')}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'}`}>
          {transaction.type === 'incoming' ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
        <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
      </div>
    </div>
  );
};

export default TransactionItem;
