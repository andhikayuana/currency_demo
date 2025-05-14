import { StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HomeScreenProps } from '../navigation/RootStackNavigator'
import { useTranslation } from 'react-i18next'
import useCurrencyStore from '../stores/currencyStore'
import { Header } from '@react-navigation/elements'
import CurrencyItem from '../components/CurrencyItem'
import ListEmpty from '../components/ListEmpty'
import AddNewCurrency from '../components/AddNewCurrency'
import { Separator, Spinner, Text, View } from 'tamagui'
import HomeToolbar from '../components/HomeToolbar'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const { t } = useTranslation();
    const {
        getFilteredCurrencies,
        fetchCurrencies,
        clearCurrencies,
        setSearchQuery,
        isLoading,
        searchQuery,
        addCurrency,
    } = useCurrencyStore();
    const [addNewSheetVisible, setAddNewSheetVisible] = useState(false);

    useEffect(() => {
        fetchCurrencies('');
    }, []);

    return (
        <View>
            <Header
                title={t('app_name')}
                headerSearchBarOptions={{
                    placeholder: t('search'),
                    onChangeText: (e) => {
                        setSearchQuery(e.nativeEvent.text);
                    }
                }}
            />
            <HomeToolbar
                onAddCryptos={() => fetchCurrencies('crypto')}
                onAddFiats={() => fetchCurrencies('fiat')}
                onClear={clearCurrencies}
                onAddNew={() => setAddNewSheetVisible(!addNewSheetVisible)}
            />

            <AddNewCurrency
                open={addNewSheetVisible}
                onOpenChange={(open) => setAddNewSheetVisible(open)}
                onAddCurrency={(currency) => {
                    console.log('Adding new currency:', currency);
                    // Call the addCurrency function from the store
                    addCurrency(currency);
                }}
            />

            <FlatList
                style={styles.currencyList}
                data={getFilteredCurrencies()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CurrencyItem currency={item} />}
                contentContainerStyle={{ paddingBottom: 200 }}
                ItemSeparatorComponent={() => <Separator />}
                ListEmptyComponent={() => {
                    return isLoading ? undefined : <ListEmpty isListEmpty={getFilteredCurrencies().length < 1} searchQuery={searchQuery} />
                }}
                ListFooterComponent={() => isLoading && <Spinner size="large" /> }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    currencyList: {
        padding: 10,
    },
    buttonContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default HomeScreen

