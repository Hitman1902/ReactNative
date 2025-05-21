import React, {useEffect} from 'react';
import {View, Text, StyleSheet, PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Navigate from './src/routes/index';
import {ThemeProvider} from './src/components/context/ThemeContext';
const App = () => {
  // useEffect(() => {
  //   // Request permission for push notifications (only iOS, Android is automatic)
  //   messaging().requestPermission();

  //   // Initialize Firebase Analytics
  //   analytics().logEvent('app_open', {});

  //   // Foreground message handler for push notifications
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('Foreground Message: ', remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const notify = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      },
    );
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    messaging().onMessage(async remoteMessage => {
      console.log('Foreground Message: ', remoteMessage);
    });
    // return()=> {
    //   notify.remove
    // }
  }, []);

  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ).catch(err => {
      console.log('ERROR GRANTING PERMISSION', err);
    });
    if (PermissionsAndroid.RESULTS.GRANTED) {
      console.log('GRANTED');
    } else {
      console.log('NOT GRANTED');
    }
  }, []);

  return (
    <ThemeProvider>
      <Navigate />
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
