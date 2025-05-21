import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {getAuth, updateProfile} from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
const PersonalDetails = ({navigation}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = async () => {
    try {
      await updateProfile(user, {
        displayName: name,
      });
      Alert.alert('Success', 'Name updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update name');
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ios: 'padding', android: null})}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Details</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
          placeholder="Enter your name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, {backgroundColor: '#f0f0f0'}]}
          value={email}
          editable={false}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails;
