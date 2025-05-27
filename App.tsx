import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Navigate from '@routes/index';
import {ThemeProvider} from '@components/context/ThemeContext';
const App = () => {
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
