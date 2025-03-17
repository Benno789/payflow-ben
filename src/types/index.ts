
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
