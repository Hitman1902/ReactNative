import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatListScreen from '@screens/chatList/ChatListScreen';
import AccountDetails from '@screens/accountDetails/accountDetails';
const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Chats') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'accounts') {
            iconName = 'person-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C47FF',
        tabBarInactiveTintColor: '#aaa',
      })}>
      <Tab.Screen name="Chats" component={ChatListScreen} />
      <Tab.Screen name="accounts" component={AccountDetails} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
