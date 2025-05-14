import { StyleSheet } from 'react-native'
import React from 'react'
import { Currency } from '../types/Currency'
import { ListItem, View, Text, YStack } from 'tamagui';
interface CurrencyItemProps {
    currency: Currency;
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({ currency }) => {
    const { name, code, symbol, type } = currency;

    return (
        <ListItem
            size="$4"
            hoverTheme
            pressTheme
            title={name}
            icon={() => {
                return (
                    <View style={styles.iconContainer}>
                        <Text style={styles.iconText}>{code[0]}</Text>
                    </View>
                )
            }}
            iconAfter={() => {
                return (
                    type == "crypto" && (
                        <YStack flexDirection="row" alignItems="center" gap="$4">
                            <Text>{code}</Text>
                            <Text>〉</Text>
                        </YStack>
                    )
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    iconContainer: {
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
});

export default CurrencyItem