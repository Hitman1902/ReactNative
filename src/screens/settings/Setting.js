import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../../components/context/ThemeContext';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
const SettingsScreen = ({navigation}) => {
  const {isDark, colors, toggleTheme} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.text}]}>Settings</Text>
      </View>

      <View style={[styles.card, {backgroundColor: colors.cardBackground}]}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/9790/9790788.png',
          }}
          style={[styles.icon, {tintColor: colors.icon}]}
        />
        <Text style={[styles.label, {color: colors.text}]}>Dark Mode</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={colors.toggleThumb}
          trackColor={{false: colors.toggleFalse, true: colors.toggleTrue}}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;
