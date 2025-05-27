import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatItem from '@screens/chatItem/chatItems';
import styles from './styles';
import {getAuth} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useTheme} from '@components/context/ThemeContext';

const ChatListScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = getAuth().currentUser;
  const [search, setSearch] = useState('');
  const {colors} = useTheme();
  useEffect(() => {
    if (!currentUser) {
      setError('No authenticated user found');
      setLoading(false);
      return;
    }

    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(
        async snapshot => {
          try {
            setLoading(true);
            const userList = [];

            const otherUsers = snapshot.docs.filter(
              doc => doc.id !== currentUser.uid,
            );

            if (otherUsers.length === 0) {
              setUsers([]);
              setLoading(false);
              return;
            }
            for (const doc of otherUsers) {
              try {
                const userData = doc.data();
                const otherUser = {
                  id: doc.id,
                  name: userData.name || userData.displayName || 'Unknown User',
                  photoURL: userData.photoURL || null,
                  lastMessage: '',
                  lastMessageTime: '',
                  unreadCount: 0,
                };

                const chatId = [currentUser.uid, doc.id].sort().join('_');

                const lastMessageSnapshot = await firestore()
                  .collection('chats')
                  .doc(chatId)
                  .collection('messages')
                  .orderBy('timestamp', 'desc')
                  .limit(1)
                  .get();

                if (!lastMessageSnapshot.empty) {
                  const lastMessage = lastMessageSnapshot.docs[0].data();
                  otherUser.lastMessage = lastMessage.text || '';

                  if (lastMessage.timestamp) {
                    otherUser.lastMessageTime = lastMessage.timestamp
                      .toDate()
                      .toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      });
                  }

                  if (lastMessage.senderId === doc.id) {
                    const unreadMessages = await firestore()
                      .collection('chats')
                      .doc(chatId)
                      .collection('messages')
                      .where('senderId', '==', doc.id)
                      .where('readBy', 'array-contains', currentUser.uid)
                      .get();

                    otherUser.unreadCount = unreadMessages.size;
                  }
                }

                userList.push(otherUser);
              } catch (userError) {
                console.error(`Error processing user ${doc.id}:`, userError);
              }
            }

            setUsers(userList);
            setError(null);
          } catch (mainError) {
            console.error('Main error:', mainError);
            setError('Failed to load users');
          } finally {
            setLoading(false);
          }
        },
        error => {
          console.error('Snapshot error:', error);
          setError('Error listening for users');
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const handleUserPress = async user => {
    const chatId = [currentUser.uid, user.id].sort().join('_');

    const unreadMessagesSnapshot = await firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .where('senderId', '==', user.id)
      .where('readBy', 'not-in', [[currentUser.uid]])
      .get();

    if (!unreadMessagesSnapshot.empty) {
      const batch = firestore().batch();
      unreadMessagesSnapshot.forEach(doc => {
        batch.update(doc.ref, {
          readBy: firestore.FieldValue.arrayUnion(currentUser.uid),
        });
      });

      try {
        await batch.commit();

        setUsers(prevUsers =>
          prevUsers.map(u => (u.id === user.id ? {...u, unreadCount: 0} : u)),
        );
      } catch (error) {
        console.error('Error updating read status:', error);
      }
    }

    navigation.navigate('ChatDetails', {user});
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{color: 'red'}}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View
        style={[styles.searchBar, {backgroundColor: colors.inputBackground}]}>
        <Icon name="search-outline" size={20} color={colors.text} />
        <TextInput
          placeholder="Search message..."
          placeholderTextColor={colors.placeholder}
          style={[styles.searchInput, {color: colors.inputText}]}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {filteredUsers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={{color: colors.text}}>No users found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ChatItem
              name={item.name}
              message={item.lastMessage}
              time={item.lastMessageTime}
              unreadCount={item.unreadCount}
              onPress={() => handleUserPress(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default ChatListScreen;
