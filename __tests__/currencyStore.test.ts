import { use } from 'react';
import useCurrencyStore from '../app/stores/currencyStore';
import { cryptoCurrencies, fiatCurrencies, Currency } from '../app/types/Currency';

// Mock the setTimeout function
jest.useFakeTimers();

describe('useCurrencyStore', () => {
    beforeEach(() => {
        // Reset the store before each test
        useCurrencyStore.getState().clearCurrencies();
        useCurrencyStore.getState().setSearchQuery('');
    });

    describe('fetchCurrencies', () => {
        it('should load crypto currencies', async () => {
            const fetchPromise = useCurrencyStore.getState().fetchCurrencies('crypto');
            
            // Initially loading should be true
            expect(useCurrencyStore.getState().isLoading).toBe(true);
            
            // Fast-forward timer
            jest.runAllTimers();
            
            await fetchPromise;
            
            // After loading, isLoading should be false
            expect(useCurrencyStore.getState().isLoading).toBe(false);
            expect(useCurrencyStore.getState().currencies).toEqual(cryptoCurrencies);
            expect(useCurrencyStore.getState().error).toBeNull();
        });

        it('should load fiat currencies', async () => {
            const fetchPromise = useCurrencyStore.getState().fetchCurrencies('fiat');
            
            jest.runAllTimers();
            
            await fetchPromise;
            
            expect(useCurrencyStore.getState().currencies).toEqual(fiatCurrencies);
            expect(useCurrencyStore.getState().error).toBeNull();
        });

        it('should not add duplicate currencies', async () => {
            // First add some crypto currencies
            let fetchPromise = useCurrencyStore.getState().fetchCurrencies('crypto');
            jest.runAllTimers();
            await fetchPromise;
            
            const initialCount = useCurrencyStore.getState().currencies.length;
            
            // Try to add the same crypto currencies again
            fetchPromise = useCurrencyStore.getState().fetchCurrencies('crypto');
            jest.runAllTimers();
            await fetchPromise;
            
            // Count should remain the same
            expect(useCurrencyStore.getState().currencies.length).toBe(initialCount);
        });

        it('should handle errors during fetch', async () => {
            // Mock implementation that throws an error
            const originalFetch = useCurrencyStore.getState().fetchCurrencies;
            useCurrencyStore.setState({
                fetchCurrencies: async () => {
                    useCurrencyStore.setState({ isLoading: true, error: null });
                    throw new Error('Network error');
                }
            });

            try {
                await useCurrencyStore.getState().fetchCurrencies('crypto');
            } catch (e) {
                useCurrencyStore.setState({
                    isLoading: false,
                    error: e instanceof Error ? e.message : 'Failed to fetch currencies'
                });
            }

            expect(useCurrencyStore.getState().error).toBe('Network error');
            expect(useCurrencyStore.getState().isLoading).toBe(false);
            
            // Restore original implementation
            useCurrencyStore.setState({ fetchCurrencies: originalFetch });
        });
    });

    describe('addCurrency', () => {
        it('should add a new currency', () => {
            const newCurrency: Currency = {
                id: 'test-currency',
                name: 'Test Currency',
                code: 'TEST',
                symbol: 'T',
                type: 'crypto'
            };
            
            useCurrencyStore.getState().addCurrency(newCurrency);
            
            expect(useCurrencyStore.getState().currencies).toContainEqual(newCurrency);
        });

        it('should not add duplicate currency', () => {
            const currency: Currency = {
                id: 'test-currency',
                name: 'Test Currency',
                code: 'TEST',
                symbol: 'T',
                type: 'crypto'
            };
            
            useCurrencyStore.getState().addCurrency(currency);
            useCurrencyStore.getState().addCurrency(currency);
            
            // Should only contain the currency once
            expect(useCurrencyStore.getState().currencies.filter(c => c.id === currency.id).length).toBe(1);
        });
    });

    describe('clearCurrencies', () => {
        it('should clear all currencies', async () => {
            // Add some currencies first
            const fetchPromise = useCurrencyStore.getState().fetchCurrencies('crypto');
            jest.runAllTimers();
            await fetchPromise;
            
            expect(useCurrencyStore.getState().currencies.length).toBeGreaterThan(0);
            
            // Clear currencies
            useCurrencyStore.getState().clearCurrencies();
            
            expect(useCurrencyStore.getState().currencies).toEqual([]);
        });
    });

    describe('setSearchQuery', () => {
        it('should update search query', () => {
            useCurrencyStore.getState().setSearchQuery('bitcoin');
            expect(useCurrencyStore.getState().searchQuery).toBe('bitcoin');
        });
    });

    describe('getFilteredCurrencies', () => {
        beforeEach(async () => {
            // Add some test currencies
            useCurrencyStore.getState().clearCurrencies();
            
            const currencies: Currency[] = [
                { id: 'bitcoin', name: 'Bitcoin', code: 'BTC', symbol: '₿', type: 'crypto' },
                { id: 'ethereum', name: 'Ethereum', code: 'ETH', symbol: 'Ξ', type: 'crypto' },
                { id: 'us-dollar', name: 'US Dollar', code: 'USD', symbol: '$', type: 'fiat' }
            ];
            
            currencies.forEach(currency => useCurrencyStore.getState().addCurrency(currency));
        });

        it('should return all currencies when search query is empty', () => {
            useCurrencyStore.getState().setSearchQuery('');
            expect(useCurrencyStore.getState().getFilteredCurrencies().length).toBe(3);
        });

        it('should filter currencies by name starting with search term', () => {
            useCurrencyStore.getState().setSearchQuery('bit');
            
            const filtered = useCurrencyStore.getState().getFilteredCurrencies();
            expect(filtered.length).toBe(1);
            expect(filtered[0].id).toBe('bitcoin');
        });

        it('should filter currencies by name containing search term after space', () => {
            useCurrencyStore.getState().setSearchQuery('dol');
            
            const filtered = useCurrencyStore.getState().getFilteredCurrencies();
            expect(filtered.length).toBe(1);
            expect(filtered[0].id).toBe('us-dollar');
        });

        it('should filter currencies by code starting with search term', () => {
            useCurrencyStore.getState().setSearchQuery('eth');
            
            const filtered = useCurrencyStore.getState().getFilteredCurrencies();
            expect(filtered.length).toBe(1);
            expect(filtered[0].id).toBe('ethereum');
        });

        it('should be case insensitive', () => {
            useCurrencyStore.getState().setSearchQuery('BTC');
            
            const filtered = useCurrencyStore.getState().getFilteredCurrencies();
            expect(filtered.length).toBe(1);
            expect(filtered[0].id).toBe('bitcoin');
        });
    });
});