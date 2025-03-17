
import React, { useState } from 'react';
import { Transaction, SuspiciousTransaction } from '@/types';
import TransactionItem from './TransactionItem';
import { Button } from '@/components/ui/button';
import { ChevronRight, Filter, AlertTriangle, Check, X } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface TransactionListProps {
  transactions: Transaction[];
  limit?: number;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions,
  limit
}) => {
  const [suspiciousTransactions, setSuspiciousTransactions] = useState<SuspiciousTransaction[]>([
    {
      id: '1',
      transactionId: '2',
      reason: 'Ungewöhnlich hoher Betrag für Transport',
      resolved: false
    },
    {
      id: '2',
      transactionId: '5',
      reason: 'Mehrere Streaming-Dienst Abbuchungen in kurzer Zeit',
      resolved: false
    }
  ]);

  const displayedTransactions = limit 
    ? transactions.slice(0, limit)
    : transactions;

  const handleConfirmTransaction = (id: string) => {
    setSuspiciousTransactions(prev => 
      prev.map(st => st.id === id ? { ...st, resolved: true } : st)
    );
    toast.success('Transaktion wurde bestätigt');
  };

  const handleReportTransaction = (id: string) => {
    setSuspiciousTransactions(prev => 
      prev.map(st => st.id === id ? { ...st, resolved: true } : st)
    );
    toast.success('Transaktion wurde als verdächtig gemeldet');
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Letzte Transaktionen</h3>
        <Button variant="outline" size="sm" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      {suspiciousTransactions.filter(st => !st.resolved).map(suspiciousTx => {
        const transaction = transactions.find(t => t.id === suspiciousTx.transactionId);
        if (!transaction) return null;
        
        return (
          <Alert 
            key={suspiciousTx.id} 
            className="mb-4 border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-900/50"
          >
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            <AlertTitle className="text-amber-800 dark:text-amber-400">Verdächtige Transaktion</AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-300">
              <p className="mb-2">{suspiciousTx.reason}</p>
              <p className="mb-3 font-medium">
                {transaction.recipient} • {transaction.amount.toLocaleString('de-DE', { style: 'currency', currency: transaction.currency })}
              </p>
              <div className="flex space-x-2 justify-end">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-white text-amber-700 border-amber-200 hover:bg-amber-50 dark:bg-gray-800 dark:text-amber-400 dark:border-amber-900/50"
                  onClick={() => handleReportTransaction(suspiciousTx.id)}
                >
                  <X className="mr-1 h-4 w-4" /> Verdächtig
                </Button>
                <Button 
                  size="sm"
                  className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
                  onClick={() => handleConfirmTransaction(suspiciousTx.id)}
                >
                  <Check className="mr-1 h-4 w-4" /> Bestätigen
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        );
      })}
      
      <div className="divide-y dark:divide-gray-800">
        {displayedTransactions.map(transaction => (
          <TransactionItem 
            key={transaction.id} 
            transaction={transaction} 
          />
        ))}
      </div>
      
      {limit && transactions.length > limit && (
        <Button variant="ghost" className="w-full mt-4 flex items-center justify-center text-primary">
          Alle Transaktionen anzeigen
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
};

export default TransactionList;
