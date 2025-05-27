import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert, TextInput} from 'react-native';
import {getAuth, sendPasswordResetEmail} from '@react-native-firebase/auth';
import styles from './styles';
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Please enter your email');
      return;
    }
    try {
      await sendPasswordResetEmail(getAuth(), email);
      Alert.alert('Password reset email sent successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      let message = 'Something went wrong';
      if (error.code === 'auth/user-not-found') {
        message = 'User not found';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email';
      }
      Alert.alert('Error', message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#8a8a8a"
        onChangeText={email => setEmail(email)}
        keyboardType="email-address"
        value={email}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleForgotPassword()}>
        <Text style={styles.buttonText}>Send Reset Link</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ForgotPassword;
