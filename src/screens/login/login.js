import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import black from '../../assets/black.png';
import {getAuth, signInWithEmailAndPassword} from '@react-native-firebase/auth';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [pressed, setPressed] = useState(false);
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
    <ImageBackground source={black} style={styles.background}>
      <Text style={styles.heading}>CHAT{'\n'}APPLICATION</Text>
      <View style={styles.container}>
        <Text style={styles.label}>Enter your login information</Text>

        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}>
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <LinearGradient
            colors={['#4c6ef5', '#5f87ff']}
            style={styles.gradient}>
            <Text style={styles.loginText}>LOGIN</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <Pressable
          onPress={() => {
            setPressed(!pressed);
            navigation.navigate('Signup');
          }}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Login;
