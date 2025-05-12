import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Currency } from '../store/currencyStore';

interface AddNewCurrencyProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (currencyData: Currency) => void;
}


const AddNewCurrency: React.FC<AddNewCurrencyProps> = ({ visible, onClose, onSubmit }) => {
    const [currencyData, setCurrencyData] = useState<Currency>({
        id: '',
        code: '',
        name: '',
        symbol: '',
        type: 'crypto', 
    });

    const handleChange = (field: keyof Currency, value: string) => {
        setCurrencyData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSubmit(currencyData);
        setCurrencyData({ id: '', code: '', name: '', symbol: '', type: 'crypto' });
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Add New Currency</Text>
                    
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>ID</Text>
                        <TextInput
                            style={styles.input}
                            value={currencyData.id}
                            onChangeText={(value) => handleChange('id', value)}
                            placeholder="Enter currency ID"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Code</Text>
                        <TextInput
                            style={styles.input}
                            value={currencyData.code}
                            onChangeText={(value) => handleChange('code', value)}
                            placeholder="Enter currency code"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            value={currencyData.name}
                            onChangeText={(value) => handleChange('name', value)}
                            placeholder="Enter currency name"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Symbol</Text>
                        <TextInput
                            style={styles.input}
                            value={currencyData.symbol}
                            onChangeText={(value) => handleChange('symbol', value)}
                            placeholder="Enter currency symbol"
                        />
                    </View>

                    

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 12,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    submitButton: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerArrow: {
        marginLeft: 10,
        fontSize: 16,
    },
    typeOptions: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        zIndex: 1,
    },
    typeOption: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    selectedType: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginBottom: 5,
    },
});

export default AddNewCurrency;