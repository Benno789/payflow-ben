
import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import { Account, Card, Transaction } from '@/types';

const Index = () => {
  // Mock-Daten für die App
  const account: Account = {
    id: '1',
    balance: 13450.75,
    currency: 'EUR',
    name: 'Girokonto',
    number: 'DE89 3704 0044 0532 0130 00',
    type: 'checking'
  };

  const card: Card = {
    id: '1',
    type: 'Debit Karte',
    number: '4539 1488 0343 6467',
    expiryDate: '05/25',
    holderName: 'MAX BECKER',
    provider: 'visa'
  };

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'incoming',
      amount: 2500.00,
      currency: 'EUR',
      sender: 'Arbeitgeber GmbH',
      date: new Date('2023-06-15'),
      description: 'Gehalt Juni',
      status: 'completed'
    },
    {
      id: '2',
      type: 'outgoing',
      amount: 42.50,
      currency: 'EUR',
      recipient: 'REWE Supermarkt',
      date: new Date('2023-06-12'),
      description: 'Lebensmittel',
      category: 'shopping',
      status: 'completed'
    },
    {
      id: '3',
      type: 'outgoing',
      amount: 850.00,
      currency: 'EUR',
      recipient: 'Vermieter',
      date: new Date('2023-06-01'),
      description: 'Miete Juni',
      category: 'bills',
      status: 'completed'
    },
    {
      id: '4',
      type: 'outgoing',
      amount: 15.90,
      currency: 'EUR',
      recipient: 'Café Sonnenschein',
      date: new Date('2023-06-10'),
      description: 'Brunch',
      category: 'food',
      status: 'completed'
    },
    {
      id: '5',
      type: 'incoming',
      amount: 120.00,
      currency: 'EUR',
      sender: 'Lisa Müller',
      date: new Date('2023-06-08'),
      description: 'Rückzahlung',
      status: 'completed'
    },
    {
      id: '6',
      type: 'outgoing',
      amount: 59.99,
      currency: 'EUR',
      recipient: 'Amazon',
      date: new Date('2023-06-05'),
      description: 'Bestellung #12345',
      category: 'shopping',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-6 px-4">
        <Dashboard 
          account={account}
          card={card}
          transactions={transactions}
        />
      </main>
    </div>
  );
};

export default Index;
