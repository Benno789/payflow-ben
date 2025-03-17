
import React, { useState } from 'react';
import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react';

// Mock-Daten für das Aktienportfolio
const stocks = [
  {
    id: 1,
    name: 'AAPL',
    companyName: 'Apple Inc.',
    shares: 5,
    price: 172.69,
    change: 1.32,
    value: 863.45
  },
  {
    id: 2,
    name: 'MSFT',
    companyName: 'Microsoft Corp.',
    shares: 3,
    price: 323.87,
    change: -0.65,
    value: 971.61
  },
  {
    id: 3,
    name: 'GOOGL',
    companyName: 'Alphabet Inc.',
    shares: 2,
    price: 128.64,
    change: 2.47,
    value: 257.28
  },
  {
    id: 4,
    name: 'AMZN',
    companyName: 'Amazon.com Inc.',
    shares: 4,
    price: 127.83,
    change: 0.78,
    value: 511.32
  }
];

const StockPortfolio: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  
  const totalValue = stocks.reduce((sum, stock) => sum + stock.value, 0);
  const displayedStocks = expanded ? stocks : stocks.slice(0, 2);

  // Berechne die Gesamtveränderung des Portfolios
  const totalChange = stocks.reduce((sum, stock) => sum + (stock.change * stock.shares), 0);
  const totalChangePercent = (totalChange / (totalValue - totalChange)) * 100;

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Investment Portfolio</h3>
          <div className="flex items-center mt-1">
            <span className="text-xl font-bold mr-2">
              {totalValue.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
            </span>
            <div className={`flex items-center text-sm ${totalChangePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalChangePercent > 0 
                ? <TrendingUp className="h-3 w-3 mr-1" /> 
                : <TrendingDown className="h-3 w-3 mr-1" />
              }
              <span>
                {totalChangePercent > 0 ? '+' : ''}
                {totalChangePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
        <button className="px-3 py-1.5 bg-payflow-green text-black rounded-lg text-sm hover:bg-payflow-green-dark transition-colors">
          Investieren
        </button>
      </div>

      <div className="space-y-3">
        {displayedStocks.map(stock => (
          <div key={stock.id} className="stock-card p-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <span className="font-semibold">{stock.name}</span>
                  <span className="text-xs ml-2 text-gray-500">{stock.companyName}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {stock.shares} Aktien × {stock.price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  {stock.value.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })}
                </div>
                <div className={`flex items-center justify-end text-sm ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change > 0 
                    ? <ArrowUp className="h-3 w-3 mr-1" /> 
                    : <ArrowDown className="h-3 w-3 mr-1" />
                  }
                  <span>
                    {stock.change > 0 ? '+' : ''}
                    {stock.change.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {stocks.length > 2 && (
        <button 
          className="w-full mt-3 text-sm text-payflow-green hover:underline flex items-center justify-center" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Weniger anzeigen' : 'Alle anzeigen'}
          {expanded ? (
            <ArrowUp className="h-3 w-3 ml-1" />
          ) : (
            <ArrowDown className="h-3 w-3 ml-1" />
          )}
        </button>
      )}
    </div>
  );
};

export default StockPortfolio;
