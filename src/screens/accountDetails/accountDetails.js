import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAuth, signOut} from '@react-native-firebase/auth';
import styles from './styles';
import {useTheme} from '@components/context/ThemeContext';
const AccountDetails = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const auth = getAuth();
  const {colors} = useTheme();
  useEffect(() => {
    const fetchUserInfo = () => {
      const user = auth.currentUser;
      if (user) {
        setName(user.displayName || 'User');
        setEmail(user.email || '');
      }
    };

    fetchUserInfo();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserInfo();
    });

    return unsubscribe;
  }, [navigation, auth]);

  const handleLogout = async () => {
    await signOut(auth)
      .then(() => {
        console.log('user signed out');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log('error signing out', error);
      });
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <TouchableOpacity>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/41.jpg'}}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={[styles.name, {color: colors.text}]}>{name}</Text>
          <Text style={[styles.email, {color: colors.text}]}>{email}</Text>
        </View>

        {[
          {
            label: 'Personal Details',
            icon: 'person-outline',
            screen: 'PersonalDetails',
          },
          {label: 'Reports', icon: 'bar-chart-outline', screen: 'Reports'},
          {label: 'Settings', icon: 'settings-outline', screen: 'Settings'},
          {label: 'Help', icon: 'help-circle-outline', screen: 'Help'},
          {
            label: 'Privacy & Security',
            icon: 'lock-closed-outline',
            screen: 'Privacy',
          },
        ].map(({label, icon, screen}) => (
          <TouchableOpacity
            key={screen}
            style={[styles.menuItem, {backgroundColor: colors.cardBackground}]}
            onPress={() => navigation.navigate(screen)}>
            <Icon
              name={icon}
              size={24}
              color={colors.text}
              style={[styles.icon, {color: colors.text}]}
            />
            <Text style={[styles.menuText, {color: colors.text}]}>{label}</Text>
            <Icon
              name="chevron-forward-outline"
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[
            styles.menuItem,
            {marginTop: 20, backgroundColor: colors.cardBackground},
          ]}
          onPress={handleLogout}>
          <Icon
            name="log-out-outline"
            size={24}
            color="#d9534f"
            style={styles.icon}
          />
          <Text
            style={[styles.menuText, {color: '#d9534f', fontWeight: 'bold'}]}>
            Log out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountDetails;
