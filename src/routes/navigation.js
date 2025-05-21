import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login/login';
import Signup from '../screens/signup/signup';
import Routes from './routes';
import BottomTabs from './BottomTab';
import ChatDetailScreen from '../screens/chatDetailsList/ChatDetailsList';
import PersonalDetails from '../screens/personalDetails/personalDetails';
import SettingsScreen from '../screens/settings/Setting';
import Privacy from '../screens/privacy/privacy';
import Help from '../screens/help/help';
import Reports from '../screens/reports/reports';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.LOGIN}
        component={Login}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name={Routes.SIGNUP}
        component={Signup}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name={Routes.Main}
        component={BottomTabs}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name={Routes.CHATDETAILS}
        component={ChatDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.PERSONALDETAILS}
        component={PersonalDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.SETTINGS}
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.REPORTS}
        component={Reports}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.PRIVACY}
        component={Privacy}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={Routes.HELP}
        component={Help}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
