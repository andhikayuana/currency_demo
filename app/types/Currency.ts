export interface Currency {
    id: string;
    code: string;
    name: string;
    symbol: string;
    type: 'fiat' | 'crypto';
}

export const cryptoCurrencies: Currency[] = [
    { id: 'BTC', code: 'BTC', name: 'Bitcoin', symbol: '₿', type: 'crypto' },
    { id: 'ETH', code: 'ETH', name: 'Ethereum', symbol: 'Ξ', type: 'crypto' },
    { id: 'XRP', code: 'XRP', name: 'XRP', symbol: 'XRP', type: 'crypto' },
    { id: 'BCH', code: 'BCH', name: 'Bitcoin Cash', symbol: 'BCH', type: 'crypto' },
    { id: 'LTC', code: 'LTC', name: 'Litecoin', symbol: 'LTC', type: 'crypto' },
    { id: 'EOS', code: 'EOS', name: 'EOS', symbol: 'EOS', type: 'crypto' },
    { id: 'BNB', code: 'BNB', name: 'Binance Coin', symbol: 'BNB', type: 'crypto' },
    { id: 'LINK', code: 'LINK', name: 'Chainlink', symbol: 'LINK', type: 'crypto' },
    { id: 'NEO', code: 'NEO', name: 'NEO', symbol: 'NEO', type: 'crypto' },
    { id: 'ETC', code: 'ETC', name: 'Ethereum Classic', symbol: 'ETC', type: 'crypto' },
    { id: 'ONT', code: 'ONT', name: 'Ontology', symbol: 'ONT', type: 'crypto' },
    { id: 'CRO', code: 'CRO', name: 'Crypto.com Chain', symbol: 'CRO', type: 'crypto' },
    { id: 'CUC', code: 'CUC', name: 'Cucumber', symbol: 'CUC', type: 'crypto' },
    { id: 'USDC', code: 'USDC', name: 'USD Coin', symbol: 'USDC', type: 'crypto' },
    { id: 'MCO', code: 'MCO', name: 'Monaco', symbol: 'MCO', type: 'crypto' }
];

// Fiat currencies
export const fiatCurrencies: Currency[] = [
    { id: 'USD', code: 'USD', name: 'United States Dollar', symbol: '$', type: 'fiat' },
    { id: 'EUR', code: 'EUR', name: 'Euro', symbol: '€', type: 'fiat' },
    { id: 'GBP', code: 'GBP', name: 'British Pound', symbol: '£', type: 'fiat' },
    { id: 'SGD', code: 'SGD', name: 'Singapore Dollar', symbol: '$', type: 'fiat' },
    { id: 'HKD', code: 'HKD', name: 'Hong Kong Dollar', symbol: '$', type: 'fiat' },
    { id: 'JPY', code: 'JPY', name: 'Japanese Yen', symbol: '¥', type: 'fiat' },
    { id: 'AUD', code: 'AUD', name: 'Australian Dollar', symbol: '$', type: 'fiat' }
];