import { Image, Pressable, StyleSheet, Text, ToastAndroid } from 'react-native';
import React, { useContext } from 'react';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { AppContext } from '../../utils/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ip } from '../../utils/AxiosIntance';

GoogleSignin.configure({
  webClientId:
    '19014457952-a8g2db3qgp67ee0i7fnlhrc6rmgn67c3.apps.googleusercontent.com',
});

const ButtonLoginGoogle = () => {
  const { setisLogin, setinfoUser } = useContext(AppContext);

  _signIn = async () => {
    try {
      // Đăng xuất tài khoản Google nếu đã đăng nhập trước đó
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo ~ ', userInfo);
      const {
        user: { email, name, photo, id },
      } = userInfo;
      await login({ email, id, name, photo });
    } catch (error) {
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };
  const login = async (data: {
    id: String,
    name: String,
    email: String,
    photo: string,
  }) => {
    try {
      const response = await axios.post(
        `http://${ip}:3000/auth/google/login`,
        data,
      );
      console.log(response.data);
      await AsyncStorage.setItem('token', response.data.token);
      ToastAndroid.show('Đăng nhập thành công', ToastAndroid.SHORT);
      setinfoUser(response.data.data);
      setisLogin(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Pressable style={styles.btnGoogle} onPress={_signIn}>
      <Image source={require('../../media/icon_button/google.png')} />
      <Text style={styles.btnGoogleLabel}>Sign in with Google</Text>
    </Pressable>
  );
};

export default ButtonLoginGoogle;

const styles = StyleSheet.create({
  btnGoogle: {
    // borderWidth: 0.1,
    marginTop: 30,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3
  },
  btnGoogleLabel: {
    marginStart: 5,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.12,
    fontFamily: 'Airbnb-Cereal-App-Bold',
  },
});
