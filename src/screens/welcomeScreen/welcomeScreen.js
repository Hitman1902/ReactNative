import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import background from '@assets/background.png';
import chatLogo from '@assets/chatLogo.png';
import styles from './styles';
const Welcome = ({navigation}) => {
  return (
    <ImageBackground source={background} style={styles.imageBackground}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={{
            uri: 'http://assets.stickpng.com/images/580b57fcd9996e24bc43c536.png',
          }}
          style={styles.avatar}
        />
        <Text style={styles.text}>Baat-Cheet</Text>
      </View>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          marginTop: 300,
          width: '100%',
          height: '100%',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 24,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            margin: 20,
          }}>
          Let's get Started
        </Text>
        <TouchableOpacity
          style={styles.Login}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              color: 'black',
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              padding: 20,
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Signup}
          onPress={() => navigation.navigate('Signup')}>
          <Text
            style={{
              color: 'white',
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              padding: 20,
            }}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Welcome;
