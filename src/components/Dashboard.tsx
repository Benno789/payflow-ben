
import React from 'react';
import { Account, Card as CardType, Transaction } from '@/types';
import Balance from './Balance';
import Card from './Card';
import QuickActions from './QuickActions';
import TransactionList from './TransactionList';

interface DashboardProps {
  account: Account;
  card: CardType;
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({
  account,
  card,
  transactions
}) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <Balance
              balance={account.balance}
              currency={account.currency}
              previousBalance={12750.50}
            />
          </div>
          
          <QuickActions />
          
          <TransactionList transactions={transactions} limit={5} />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Your Card</h3>
            <Card card={card} />
          </div>
          
          <div className="bg-gradient-to-r from-payflow-purple to-payflow-purple-dark text-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Premium Upgrade</h3>
            <p className="text-sm mb-4">Enjoy advanced features with our Premium plan</p>
            <div className="flex gap-2">
              <button className="bg-white text-payflow-purple-dark px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                Upgrade
              </button>
              <button className="bg-transparent border border-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
