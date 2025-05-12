import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Currency } from '../store/currencyStore'

interface CurrencyItemProps {
    currency: Currency;
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({ currency }) => {
    const { name, code, symbol } = currency;

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {/* Leading Icon */}
                <Text style={styles.iconText}>{code[0]}</Text>
            </View>

            <View style={styles.contentContainer}>
                {/* Title */}
                <Text style={styles.title}>{name}</Text>
            </View>

            {currency.type == "crypto" && (
                <View style={styles.trailingContainer}>
                    {/* Crypto Code */}
                    <Text style={styles.codeText}>{code}</Text>
                    {/* Trailing Icon */}
                    <Text style={styles.chevron}>〉</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white'
    },
    iconContainer: {
        marginRight: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#444444',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconText: {
        fontSize: 20,
        color: 'white'
    },
    contentContainer: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: '500'
    },
    trailingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    codeText: {
        fontSize: 14,
        color: '#666',
        marginRight: 8
    },
    chevron: {
        fontSize: 24
    }
});

export default CurrencyItem