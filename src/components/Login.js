import { StyleSheet, Text, View, Pressable, Image, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import AxiosInstance from '../utils/AxiosIntance'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../utils/AppContext';
import ButtonLoginGoogle from './common/ButtonLoginGoogle';

const Login = (props) => {
  const { navigation } = props
  const [emailUser, setemailUser] = useState("")
  const [passwordUser, setpasswordUser] = useState("")
  const { setisLogin, setinfoUser } = useContext(AppContext)
  const [passStatus, setpassStatus] = useState(true)

  const handleClickEye = () => {
    if (passStatus) {
      setpassStatus(false)
    } else {
      setpassStatus(true)
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  const validatePassword = (password) => {
    return password.length >= 6;
  }
  const handleClickLogin = async () => {
    if (!emailUser.trim()) {
      ToastAndroid.show("Email không được để trống", ToastAndroid.SHORT);
      return;
    }
    if (!validateEmail(emailUser)) {
      ToastAndroid.show("Email không hợp lệ", ToastAndroid.SHORT);
      return;
    }
    if (!passwordUser.trim()) {
      ToastAndroid.show("Mật khẩu không được để trống", ToastAndroid.SHORT);
      return;
    }
    if (!validatePassword(passwordUser)) {
      ToastAndroid.show("Mật khẩu phải có ít nhất 6 ký tự", ToastAndroid.SHORT);
      return;
    }
    try {
      // http://localhost:3000/api/users/login
      const response = await AxiosInstance().post("/users/login", { email: emailUser, password: passwordUser })
      if (response.error == false) {
        console.log(response.data.token)
        console.log(response.data.user);
        await AsyncStorage.setItem("token", response.data.token)
        ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
        setinfoUser(response.data.user)
        setisLogin(true)
      } else {
        ToastAndroid.show("Đăng nhập thất bại", ToastAndroid.SHORT);
      }
    } catch (error) {
      if (error.response && error.response.status === 410) {
        ToastAndroid.show("Tài khoản chưa xác thực.", ToastAndroid.SHORT);
      } else if (error.response && error.response.status === 400) {
        ToastAndroid.show("Sai email hoặc mật khẩu.", ToastAndroid.SHORT);

      } else {
        ToastAndroid.show("Có lỗi xảy ra, vui lòng thử lại sau.", ToastAndroid.SHORT);

      }
      console.log('Error during login:', error);
    }
  }
  return (
    <View style={styles.container}>
      <Image source={require('../media/icon_button/back.png')} />
      <View style={styles.header}>
        <Text style={styles.hello}>Hello Again!</Text>
        <Text style={styles.welcome}>Welcome Back You've Been Missed</Text>
      </View>
      <View style={styles.formLogin}>
        <Text style={styles.labelLogin}>Email Address</Text>
        <TextInput style={styles.textInput} onChangeText={setemailUser} />
        <Text style={[styles.labelLogin, { marginTop: 20 }]}>Password</Text>
        <View style={styles.passwordInput}>
          <TextInput style={styles.textInput} secureTextEntry={passStatus} onChangeText={setpasswordUser} />
          <TouchableOpacity onPress={handleClickEye} style={styles.eyeIcon}>
            <Image
              source={require('../media/icon_button/eye.png')}
            />
          </TouchableOpacity>

        </View>
      </View>
      <TouchableOpacity style={{ marginTop: 10}} onPress={() => { navigation.navigate('ForgotPassword') }}>
        <Text style={{ textAlign: 'right', fontFamily: 'Airbnb-Cereal-App-Bold', fontSize: 14 }}>
          Forgot Password</Text>
      </TouchableOpacity>

      <Pressable style={styles.btnLoginBorder} onPress={handleClickLogin}>
        <Text style={styles.btnLoginLabel}>Sign In</Text>
      </Pressable>
      <ButtonLoginGoogle />
      <View style={styles.footer}>
        <Text style={styles.footer1}>Don't Have An Account?</Text>
        <Pressable onPress={() => { navigation.navigate('Register') }}>
          <Text style={styles.footer2}>Sign Up For Free</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  footer2: {
    fontFamily: 'Airbnb-Cereal-App-Bold',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#1A2530',
  },
  footer1: {
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 100
  },
  btnGoogleLabel: {
    marginStart: 5,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.12,
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  btnGoogle: {
    borderWidth: 0.1,
    marginTop: 30,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnLoginLabel: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#fff',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  btnLoginBorder: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#5b9ee1',
    height: 60,
    paddingVertical: 13,
    paddingHorizontal: 24,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 27,
  },
  passwordInput: {
    position: 'relative',
  },
  textInput: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    width: '100%',
    height: 48,
    padding: 10,
    paddingLeft: 20,
    // elevation: 0.5
  },
  labelLogin: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  formLogin: {
    marginTop: 80
  },
  welcome: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 5,
    fontFamily: 'Airbnb-Cereal-App-light'
  },
  hello: {
    fontSize: 28,
    lineHeight: 36,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  header: {
    alignItems: 'center',
    marginTop: 30
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa'
    // f8f9fa
    //f2f3f5
  }
})