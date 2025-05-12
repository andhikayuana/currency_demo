import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface ListEmptyProps {
    isListEmpty: boolean;
    searchQuery: string;
}

export default function ListEmpty({ isListEmpty = false, searchQuery = '' }: ListEmptyProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.icon}>
                {searchQuery === "" ? "📋" : "🔍"}
            </Text>
            <Text style={styles.message}>
                {isListEmpty && searchQuery !== ""
                    ? `No results found for "${searchQuery}"`
                    : "No items available, please add currencies to your list."}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    icon: {
        fontSize: 50,
        marginBottom: 10,
        color: '#999'
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666'
    }
});
