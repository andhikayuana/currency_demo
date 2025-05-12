import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HomeScreenProps } from '../navigation/RootStackNavigator'
import { useTranslation } from 'react-i18next'
import useCurrencyStore from '../store/currencyStore'
import { Header } from '@react-navigation/elements'
import CurrencyItem from '../component/CurrencyItem'
import HorizontalSeparator from '../component/HorizontalSeparator'
import ListEmpty from '../component/ListEmpty'
import AddNewCurrency from '../component/AddNewCurrency'

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const { t, i18n } = useTranslation();
    const {
        currencies,
        getFilteredCurrencies,
        fetchCurrencies,
        clearCurrencies,
        setSearchQuery,
        isLoading,
        searchQuery,
        addCurrency,
    } = useCurrencyStore();
    const [modalVisible, setModalVisible] = useState(false);

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
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.buttonContainer}>
                    <TouchableOpacity style={styles.actionButton} onPress={() => fetchCurrencies("crypto")}>
                        <Text style={styles.buttonText}>{t('add_cryptos')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => fetchCurrencies("fiat")}>
                        <Text style={styles.buttonText}>{t('add_fiats')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => clearCurrencies()}>
                        <Text style={styles.buttonText}>{t('clear')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton} onPress={() => { setModalVisible(!modalVisible) }}>
                        <Text style={styles.buttonText}>{t('add_new')}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            // Add New Currency Modal
            <AddNewCurrency
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(!modalVisible);
                 }}
                onSubmit={(currencyData) => {
                    // Handle the submission of new currency data
                    addCurrency(currencyData);
                }}
            />

            <FlatList
                style={styles.currencyList}
                data={getFilteredCurrencies()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <CurrencyItem currency={item} />}
                contentContainerStyle={{ paddingBottom: 200 }}
                ItemSeparatorComponent={() => <HorizontalSeparator />}
                ListEmptyComponent={() => {
                    return <ListEmpty isListEmpty={getFilteredCurrencies().length < 1} searchQuery={searchQuery} />
                }}
            />

            {getFilteredCurrencies().length === 0 && !isLoading && (
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    padding: 20
                }}>
                    <Text style={{ fontSize: 18, color: '#666', textAlign: 'center' }}>
                        {t('noCurrenciesFound')}
                    </Text>
                </View>
            )}

            {isLoading && (
                <View style={{
                    flex: 1,
                    alignItems: 'center'
                }}>
                    <Text style={{ fontSize: 18, color: '#666' }}>
                        {t('loading')}
                    </Text>
                </View>
            )}
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

