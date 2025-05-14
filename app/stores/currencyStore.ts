import { create } from 'zustand';
import { cryptoCurrencies, Currency, fiatCurrencies } from '../types/Currency';

type State = {
    currencies: Currency[];
    searchQuery: string;
    isLoading: boolean;
    error: string | null;
    getFilteredCurrencies: () => Currency[];
}

type Actions = {
    fetchCurrencies: (type: String) => Promise<void>;
    addCurrency: (currency: Currency) => void;
    clearCurrencies: () => void;
    setSearchQuery: (query: string) => void;
}

const useCurrencyStore = create<State & Actions>((set, get) => ({
    currencies: [],
    searchQuery: '',
    isLoading: false,
    error: null,

    fetchCurrencies: async (type: String) => {
        set({ isLoading: true, error: null });

        try {
            // Simulate a network request
            await new Promise((resolve) => setTimeout(resolve, 500));

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
            const nameContainsSpaceQuery = currency.name.toLowerCase().includes(` ${query}`);
            
            // Condition 3: Code starts with the search term
            const codeStartsWithQuery = currency.code.toLowerCase().startsWith(query);
            
            return nameStartsWithQuery || nameContainsSpaceQuery || codeStartsWithQuery;
        });
    },
}));

export default useCurrencyStore;
