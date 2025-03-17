
import React from 'react';
import { Transaction } from '@/types';
import TransactionItem from './TransactionItem';
import { Button } from '@/components/ui/button';
import { ChevronRight, Filter } from 'lucide-react';

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions,
  limit
}) => {
  const displayedTransactions = limit 
    ? transactions.slice(0, limit)
    : transactions;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Letzte Transaktionen</h3>
        <Button variant="outline" size="sm" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="divide-y">
        {displayedTransactions.map(transaction => (
          <TransactionItem 
            key={transaction.id} 
            transaction={transaction} 
          />
        ))}
      </div>
      
      {limit && transactions.length > limit && (
        <Button variant="ghost" className="w-full mt-4 flex items-center justify-center text-payflow-purple">
          Alle Transaktionen anzeigen
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
};

export default TransactionList;
