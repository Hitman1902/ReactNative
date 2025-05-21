import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import Navigation from './navigation';
import {useTheme} from '../components/context/ThemeContext';
const Navigate = () => {
  const theme = useTheme();
  return (
    <NavigationContainer theme={theme.isDark ? DarkTheme : DefaultTheme}>
      <Navigation />
    </NavigationContainer>
  );
};

export default Navigate;
