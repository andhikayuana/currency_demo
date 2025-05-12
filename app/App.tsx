import { NavigationContainer } from '@react-navigation/native';
import RootStackNavigator from './navigation/RootStackNavigator';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={ i18n }>
          <NavigationContainer>
            <RootStackNavigator />
          </NavigationContainer>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}

export default App