import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useTheme} from '../../components/context/ThemeContext';
const ChatDetailScreen = ({route, navigation}) => {
  const {colors} = useTheme();
  const {user} = route.params;
  const currentUser = getAuth().currentUser;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const chatId = [currentUser.uid, user.id].sort().join('_');

  useEffect(() => {
    if (!currentUser) return;
    navigation.setOptions({title: user.name});

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(async snapshot => {
        const batch = firestore().batch();
        const msgs = [];

        for (const doc of snapshot.docs) {
          const data = doc.data();

          if (
            data.senderId === user.id &&
            (!data.readBy || !data.readBy.includes(currentUser.uid))
          ) {
            batch.update(doc.ref, {
              readBy: firestore.FieldValue.arrayUnion(currentUser.uid),
            });
          }

          msgs.push({
            id: doc.id,
            text: data.text,
            senderId: data.senderId,
            timestamp:
              data.timestamp?.toDate()?.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }) || '',
            isCurrentUser: data.senderId === currentUser.uid,
          });
        }

        setMessages(msgs);
        try {
          await batch.commit();
        } catch (error) {
          console.error('Error updating read status:', error);
        }
      });

    return () => unsubscribe();
  }, [chatId, currentUser, user.id, navigation, user.name]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .add({
          text: message,
          senderId: currentUser.uid,
          timestamp: firestore.FieldValue.serverTimestamp(),
          readBy: [currentUser.uid],
        });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({item}) => (
    <View
      style={[
        styles.messageWrapper,
        {
          alignItems: item.isCurrentUser ? 'flex-end' : 'flex-start',
          marginBottom: 12,
        },
      ]}>
      <View
        style={[
          styles.messageBubble,
          {
            backgroundColor: item.isCurrentUser ? '#D6B5F9' : '#F0F0F0',
            maxWidth: '80%',
          },
        ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text
          style={[
            styles.messageTime,
            {color: item.isCurrentUser ? '#6A3093' : '#666'},
          ]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {backgroundColor: colors.cardBackground}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={28} color={colors.text} />
        </TouchableOpacity>
        <Image
          source={{
            uri:
              user.photoURL || 'https://randomuser.me/api/portraits/men/41.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={[styles.name, {color: colors.text}]}>{user.name}</Text>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesContainer}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type here..."
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Icon name="send" size={24} color="#6A3093" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatDetailScreen;
