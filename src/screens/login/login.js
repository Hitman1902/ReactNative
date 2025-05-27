import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Please fill all the fields');
      return;
    }
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      const user = getAuth().currentUser;
      if (user) {
        await AsyncStorage.setItem('name', user.displayName);
        Alert.alert('Login Successful', user.displayName);
        navigation.navigate('Main');
      }
    } catch (error) {
      console.log(error);
      let message = 'Something went wrong';
      if (error.code === 'auth/user-not-found') {
        message = 'User not found';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Wrong password';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email';
      }
      Alert.alert('Login Failed', message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>👻</Text>
        <Text style={styles.logoText}>Chat App</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputWrapper}>
          <AntDesign name="user" size={20} color="#8a8a8a" />
          <TextInput
            placeholder="andrew123@gmail.com"
            placeholderTextColor="#8a8a8a"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <Text style={styles.label}>Passwords</Text>
        <View style={styles.inputWrapper}>
          <Feather name="lock" size={20} color="#8a8a8a" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#8a8a8a"
            secureTextEntry={!showPassword}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#8a8a8a"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialIcon}>
            <AntDesign name="google" size={30} color="#db4437" />
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Sign Up.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
