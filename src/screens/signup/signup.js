import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import styles from './styles';
const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '901741907970-06tlg4l0ba0bha9g2da9iphp5m6obm37.apps.googleusercontent.com',
      offlineAccess: true,
    });
    console.log('These is working ');
  }, []);
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

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);

      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = GoogleAuthProvider.credential(idToken);

      const userCredential = await signInWithCredential(
        getAuth(),
        googleCredential,
      );

      const isNewUser = userCredential.additionalUserInfo?.isNewUser;

      if (isNewUser) {
        await firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .set({
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            photoURL:
              userCredential.user.photoURL ||
              'https://randomuser.me/api/portraits/men/1.jpg',
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
      }

      Alert.alert('Google Sign-In Successful');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      let errorMessage = 'Something went wrong';

      if (error.code === 'SIGN_IN_CANCELLED') {
        errorMessage = 'Sign in was cancelled';
      } else if (error.code === 'IN_PROGRESS') {
        errorMessage = 'Sign in is already in progress';
      } else if (error.code === 'PLAY_SERVICES_NOT_AVAILABLE') {
        errorMessage = 'Google Play Services not available or outdated';
      }

      Alert.alert('Google Sign-In Failed', errorMessage);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoIcon}>👻</Text>
        <Text style={styles.logoText}>Chat App</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.label}>Name</Text>
        <View style={styles.inputWrapper}>
          <AntDesign name="user" size={20} color="#8a8a8a" />
          <TextInput
            placeholder="John Doe"
            placeholderTextColor="#8a8a8a"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
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
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputWrapper}>
          <Feather name="lock" size={20} color="#8a8a8a" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#8a8a8a"
            secureTextEntry={!showConfirmPassword}
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Feather
              name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#8a8a8a"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignup}>
          <Text style={styles.signInButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or</Text>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialIcon}
            onPress={handleGoogleSignIn}>
            <AntDesign name="google" size={30} color="#db4437" />
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupText}>Login.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
