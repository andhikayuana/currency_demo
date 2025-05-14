import { Button, ScrollView, XStack } from 'tamagui'
import React from 'react'
import { useTranslation } from 'react-i18next';

interface HomeToolbarProps {
    onAddCryptos?: () => void;
    onAddFiats?: () => void;
    onClear?: () => void;
    onAddNew?: () => void;
}

const HomeToolbar: React.FC<HomeToolbarProps> = ({
    onAddCryptos = () => { },
    onAddFiats = () => { },
    onClear = () => { },
    onAddNew = () => { }
}) => {
    const { t, i18n } = useTranslation();

    return (
        <ScrollView horizontal>
            <XStack flexWrap="wrap" alignItems="center" justifyContent="center" padding="$2" gap="$2">
                <Button theme={'accent'} onPress={onAddCryptos}>{t('add_cryptos')}</Button>
                <Button theme={'accent'} onPress={onAddFiats}>{t('add_fiats')}</Button>
                <Button theme={'accent'} onPress={onClear}>{t('clear')}</Button>
                <Button theme={'accent'} onPress={onAddNew}>{t('add_new')}</Button>
            </XStack>
        </ScrollView>
    )
}

export default HomeToolbar