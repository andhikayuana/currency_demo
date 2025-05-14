import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next';

interface ListEmptyProps {
    isListEmpty: boolean;
    searchQuery: string;
}

export default function ListEmpty({ isListEmpty = false, searchQuery = '' }: ListEmptyProps) {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>
                {searchQuery === "" ? "📋" : "🔍"}
            </Text>
            <Text style={styles.message}>
                {isListEmpty && searchQuery !== ""
                    ? t('no_results_found', { query: searchQuery})
                    : t('no_items_available')}
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
