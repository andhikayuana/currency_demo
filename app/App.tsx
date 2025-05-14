import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './navigation/RootStackNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createTamagui, TamaguiProvider } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'
import { themes } from './ui/themes';

const config = createTamagui({
  ...defaultConfig,
  themes,
})

const App = () => {
  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
        </I18nextProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}

export default App