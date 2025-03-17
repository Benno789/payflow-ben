
import React from 'react';
import { Card as CardType } from '@/types';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { toast } = useToast();

  const formatCardNumber = (number: string) => {
    // Only show last 4 digits
    return `•••• •••• •••• ${number.slice(-4)}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(card.number);
    toast({
      title: 'Kartennummer kopiert',
      description: 'Die Kartennummer wurde in die Zwischenablage kopiert.'
    });
  };

  return (
    <div className="gradient-card rounded-xl p-5 text-white shadow-lg w-full max-w-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-xs text-white/70 mb-1">Karte</p>
          <p className="font-semibold">{card.type}</p>
        </div>
        <div className="text-2xl font-light">
          {card.provider === 'visa' && 'VISA'}
          {card.provider === 'mastercard' && 'MasterCard'}
          {card.provider === 'amex' && 'AMEX'}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center">
          <p className="text-lg tracking-wider">{formatCardNumber(card.number)}</p>
          <button 
            onClick={copyToClipboard}
            className="ml-2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-end">
        <div>
          <p className="text-xs text-white/70 mb-1">Karteninhaber</p>
          <p className="font-medium">{card.holderName}</p>
        </div>
        <div>
          <p className="text-xs text-white/70 mb-1">Gültig bis</p>
          <p className="font-medium">{card.expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
