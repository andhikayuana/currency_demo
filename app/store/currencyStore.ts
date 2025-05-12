import { create } from 'zustand';

// Define types for our currency models
export interface Currency {
    id: string;
    code: string;
    name: string;
    symbol: string;
    type: 'fiat' | 'crypto';
}

interface CurrencyState {
    currencies: Currency[];
    searchQuery: string;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchCurrencies: (type: String) => Promise<void>;
    addCurrency: (currency: Currency) => void;
    clearCurrencies: () => void;
    setSearchQuery: (query: string) => void;

    // Computed values (selectors)
    getFilteredCurrencies: () => Currency[];
}

const cryptoCurrencies: Currency[] = [
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
    { id: 'USDC', code: 'USDC', name: 'USD Coin', symbol: 'USDC', type: 'crypto' }
];

// Fiat currencies
const fiatCurrencies: Currency[] = [
    { id: 'USD', code: 'USD', name: 'United States Dollar', symbol: '$', type: 'fiat' },
    { id: 'EUR', code: 'EUR', name: 'Euro', symbol: '€', type: 'fiat' },
    { id: 'GBP', code: 'GBP', name: 'British Pound', symbol: '£', type: 'fiat' },
    { id: 'SGD', code: 'SGD', name: 'Singapore Dollar', symbol: '$', type: 'fiat' },
    { id: 'HKD', code: 'HKD', name: 'Hong Kong Dollar', symbol: '$', type: 'fiat' },
    { id: 'JPY', code: 'JPY', name: 'Japanese Yen', symbol: '¥', type: 'fiat' },
    { id: 'AUD', code: 'AUD', name: 'Australian Dollar', symbol: '$', type: 'fiat' }
];

const useCurrencyStore = create<CurrencyState>((set, get) => ({
    currencies: [],
    searchQuery: '',
    isLoading: false,
    error: null,

    fetchCurrencies: async (type: String) => {
        set({ isLoading: true, error: null });

        try {

            // Add a delay to simulate API fetch
            // await new Promise(resolve => setTimeout(resolve, 500));

            // Combine both arrays
            let currencies: Currency[] = [];
            if (type.toLowerCase() === 'crypto') {
                // Get current currencies and filter out duplicates before adding crypto currencies
                const currentCurrencies = get().currencies;
                const newCurrencies = cryptoCurrencies.filter(
                  crypto => !currentCurrencies.some(curr => curr.id === crypto.id)
                );
                currencies = [...currentCurrencies, ...newCurrencies];
            } else if (type.toLowerCase() === 'fiat') {
                // Get current currencies and filter out duplicates before adding fiat currencies
                const currentCurrencies = get().currencies;
                const newCurrencies = fiatCurrencies.filter(
                  fiat => !currentCurrencies.some(curr => curr.id === fiat.id)
                );
                currencies = [...currentCurrencies, ...newCurrencies];
            }

            set({ currencies: currencies, isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch currencies',
                isLoading: false
            });
        }
    },

    addCurrency: (currency) => {
        const { currencies } = get();
        const exists = currencies.some(c => c.id === currency.id);

        if (!exists) {
            set({ currencies: [...currencies, currency] });
        }
    },

    clearCurrencies: () => set({ currencies: [] }),

    setSearchQuery: (query) => set({ searchQuery: query }),

    getFilteredCurrencies: () => {
        const { currencies, searchQuery } = get();
        const query = searchQuery.toLowerCase().trim();

        if (!query) return currencies;

        return currencies.filter(currency => {
            // Condition 1: Name starts with the search term
            const nameStartsWithQuery = currency.name.toLowerCase().startsWith(query);
            
            // Condition 2: Name contains a space followed by the search term
            const nameContainsSpaceQuery = currency.name.toLowerCase().includes(' ' + query);
            
            // Condition 3: Symbol starts with the search term
            const symbolStartsWithQuery = currency.code.toLowerCase().startsWith(query);
            
            return nameStartsWithQuery || nameContainsSpaceQuery || symbolStartsWithQuery;
        });
    },
}));

export default useCurrencyStore;
