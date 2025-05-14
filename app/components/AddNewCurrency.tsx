import React, { useEffect } from 'react';
import { Sheet, Button, XStack, YStack, Text, Input, Form, useTheme, Select, RadioGroup } from 'tamagui';
import { Currency } from '../types/Currency';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { RadioGroupItemWithLabel } from './RadioGroupItemWithLabel';

interface AddNewCurrencyProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddCurrency: (currency: Currency) => void;
}

const AddNewCurrency: React.FC<AddNewCurrencyProps> = ({ open, onOpenChange, onAddCurrency }) => {
    const { t } = useTranslation();
    const theme = useTheme();

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<Currency>({
        defaultValues: {
            id: '',
            code: '',
            name: '',
            symbol: '',
            type: 'crypto',
        }
    });

    const onSubmit: SubmitHandler<Currency> = (currency) => {
        // console.log('Adding new currency:', currency);

        onAddCurrency(currency);
        onClose();

    };

    const onClose = () => {
        reset();
        onOpenChange(false);
    };

    return (
        <Sheet
            modal
            open={open}
            onOpenChange={() => onClose()}
            position={0}
            dismissOnSnapToBottom
        >
            <Sheet.Overlay
                animation="lazy"
                backgroundColor="$shadow6"
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />

            <Sheet.Handle />
            <Sheet.Frame padding="$4" justifyContent="center" alignItems="center">
                <YStack gap="$4" width="100%">
                    <Text fontSize="$6" fontWeight="bold" textAlign="center">{t('add_new')}</Text>

                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <YStack gap="$3">
                            <Controller
                                control={control}
                                name="type"
                                rules={{ required: true }}
                                render={({ field: { onChange, value } }) => (
                                    <YStack gap="$2">
                                        <Text>{t('currency_type')}</Text>
                                        <RadioGroup value={value} onValueChange={onChange} defaultValue="crypto">
                                            <XStack gap="$4">
                                                <RadioGroupItemWithLabel
                                                    size="$4"
                                                    value="fiat"
                                                    label={t('fiat')}
                                                />
                                                <RadioGroupItemWithLabel
                                                    size="$4"
                                                    value="crypto"
                                                    label={t('crypto')}
                                                />
                                            </XStack>
                                        </RadioGroup>
                                    </YStack>
                                )}
                            />

                            <Controller
                                control={control}
                                name="id"
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input placeholder={t('currency_id')} onBlur={onBlur} onChangeText={onChange} value={value} />
                                )}
                            />
                            {errors.id && <Text color={theme.red10}>{t('input_required', { field: t('currency_id') })}</Text>}

                            <Controller
                                control={control}
                                name="name"
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input placeholder={t('currency_name')} onBlur={onBlur} onChangeText={onChange} value={value} />
                                )}
                            />
                            {errors.name && <Text color={theme.red10}>{t('input_required', { field: t('currency_name') })}</Text>}

                            <Controller
                                control={control}
                                name="code"
                                rules={{ required: true }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input placeholder={t('currency_code')} onBlur={onBlur} onChangeText={onChange} value={value} />
                                )}
                            />
                            {errors.code && <Text color={theme.red10}>{t('input_required', { field: t('currency_code') })}</Text>}

                            <Controller
                                control={control}
                                name="symbol"
                                rules={{ required: false }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input placeholder={t('currency_symbol')} onBlur={onBlur} onChangeText={onChange} value={value} />
                                )}
                            />

                            <XStack gap="$3" justifyContent="flex-end" marginTop="$2">
                                <Button variant="outlined" onPress={onClose}>{t('cancel')}</Button>

                                <Form.Trigger asChild>
                                    <Button theme="accent">{t('save')}</Button>
                                </Form.Trigger>
                            </XStack>
                        </YStack>
                    </Form>
                </YStack>
            </Sheet.Frame>
        </Sheet>
    );
}

export default AddNewCurrency