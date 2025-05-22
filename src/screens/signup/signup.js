import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import black from '../../assets/black.png';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pressed, setPressed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleSignup = async () => {
    console.log('Button pressed');
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Please fill all the fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password,
      );
      const user = userCredential.user;
      await user.updateProfile({displayName: name});
      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        displayName: name,
        email: user.email,
        photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
      });

      Alert.alert('User account created & signed in successfully!');
      navigation.navigate('Login');
    } catch (error) {
      console.log('error FIREBASE', error);
      let message = 'Something went wrong';
      if (error?.code === 'auth/email-already-in-use') {
        message = 'Email already in use';
      } else if (error?.code === 'auth/invalid-email') {
        message = 'Invalid email';
      } else if (error?.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters';
      }
      Alert.alert('Signup Failed', message);
    }
  };
  return (
    <ImageBackground source={black} style={styles.background}>
      <Text style={styles.heading}>CHAT{'\n'}APPLICATION</Text>
      <View style={styles.container}>
        <Text style={styles.label}>Enter your information</Text>

        <View style={styles.inputContainer}>
          <Icon name="person-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />
        </View>

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
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#999" />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeIcon}>
            <Icon
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleSignup}>
          <LinearGradient
            colors={['#4c6ef5', '#5f87ff']}
            style={styles.gradient}>
            <Text style={styles.loginText}>Signup</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <Pressable
          onPress={() => {
            setPressed(!pressed);
            navigation.navigate('Login');
          }}>
          <Text style={styles.signupText}>
            Already have an account?{' '}
            <Text style={styles.signupLink}>Login</Text>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default Signup;
