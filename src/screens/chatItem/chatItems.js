import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useTheme} from '@components/context/ThemeContext';
const ChatItem = ({name, message, time, unreadCount, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: colors.cardBackground}]}
      onPress={onPress}>
      <Image
        source={{uri: 'https://randomuser.me/api/portraits/men/41.jpg'}}
        style={styles.avatar}
      />
      <View style={styles.textSection}>
        <Text style={[styles.name, {color: colors.text}]}>{name}</Text>
        <Text style={[styles.message, {color: colors.text}]} numberOfLines={1}>
          {message}
        </Text>
      </View>
      <View style={styles.metaSection}>
        <Text style={[styles.time, {color: colors.text}]}>{time}</Text>
        {unreadCount > 0 && (
          <View
            style={[
              styles.unreadBadge,
              {backgroundColor: colors.messageBubbleCurrent},
            ]}>
            <Text style={[styles.unreadText, {color: colors.inputText}]}>
              {unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
