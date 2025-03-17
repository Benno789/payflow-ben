
export interface Transaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  currency: string;
  sender?: string;
  recipient?: string;
  date: Date;
  description?: string;
  category?: string;
  status?: 'completed' | 'pending' | 'failed';
}

export interface Account {
  id: string;
  balance: number;
  currency: string;
  name: string;
  number: string;
  type: 'checking' | 'savings' | 'credit';
}

export interface Card {
  id: string;
  type: string;
  number: string;
  expiryDate: string;
  holderName: string;
  provider: 'visa' | 'mastercard' | 'amex';
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  monthlyIncome?: number;
  rentAmount?: number;
  doesRent?: boolean;
}

export interface BankConnection {
  id: string;
  name: string;
  description: string;
  logo: string;
  connected: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  currency: string;
  frequency: 'monthly' | 'yearly' | 'weekly';
  category: string;
  nextPaymentDate: Date;
}

export interface Category {
  id: string;
  name: string;
  percentage: number;
  color: string;
}
