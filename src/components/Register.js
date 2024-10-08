import { StyleSheet, Text, View, Pressable, Image, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AxiosInstance from '../utils/AxiosIntance'


const Register = (props) => {
  const { navigation } = props
  const [emailUser, setemailUser] = useState("")
  const [passwordUser, setpasswordUser] = useState("")
  const [nameUser, setnameUser] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")

  const validateForm = () => {
    if (!nameUser.trim()) {
      ToastAndroid.show("Name cannot be blank", ToastAndroid.SHORT);
      return false;
    }

    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if (!emailRegex.test(emailUser)) {
      ToastAndroid.show("Email is not in correct format", ToastAndroid.SHORT);
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(passwordUser)) {
      ToastAndroid.show("Password must have at least 8 characters, uppercase letters, lowercase letters, numbers and special characters", ToastAndroid.SHORT);
      return false;
    }

    if (passwordUser !== confirmPassword) {
      ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
      return false;
    }

    return true;
  }


  const handleClickRegister = async () => {
    console.log(emailUser, passwordUser, nameUser, confirmPassword)
    if (!validateForm()) {
      return;
    }
    try {
      // http://localhost:3000/api/users/register
      const response = await AxiosInstance().post("/users/register", { email: emailUser, password: passwordUser, name: nameUser, confirm_password: confirmPassword })
      console.log(response)
      if (response.result == true) {
        ToastAndroid.show("Register successfully", ToastAndroid.SHORT)
        navigation.navigate("Verifycation", { email: emailUser })
      } else {
        ToastAndroid.show("Register fail", ToastAndroid.SHORT)
      }
    } catch (error) {
      // console.log(e);
      if (error && error.response.status === 400) {
        ToastAndroid.show("Register fail", ToastAndroid.SHORT)
      }
    }

  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { navigation.goBack() }}>
        <Image source={require('../media/icon_button/back.png')} />

      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.hello}>Create Account</Text>
        <Text style={styles.welcome}>Let's Create Account Together</Text>
      </View>
      <View style={styles.formLogin}>
        <Text style={styles.labelLogin}>Full Name</Text>
        <TextInput style={styles.textInput} onChangeText={setnameUser} />
        <Text style={[styles.labelLogin, { marginTop: 5 }]}>Email Address</Text>
        <TextInput style={styles.textInput} onChangeText={setemailUser} />
        <Text style={[styles.labelLogin, { marginTop: 5 }]}>Password</Text>
        <View style={styles.passwordInput}>
          <TextInput style={styles.textInput} secureTextEntry onChangeText={setpasswordUser} />
          <Image
            source={require('../media/icon_button/eye.png')}
            style={styles.eyeIcon}
          />
        </View>
        <Text style={[styles.labelLogin, { marginTop: 5 }]}>Confirm Password</Text>
        <View style={styles.passwordInput}>
          <TextInput style={styles.textInput} secureTextEntry onChangeText={setconfirmPassword} />
          <Image
            source={require('../media/icon_button/eye.png')}
            style={styles.eyeIcon}
          />
        </View>
      </View>
      <TouchableOpacity style={{ marginTop: 10}} onPress={() => { navigation.navigate('ForgotPassword') }}>
        <Text style={{ textAlign: 'right', fontFamily: 'Airbnb-Cereal-App-Bold', fontSize: 14 }}>
          Forgot Password</Text>
      </TouchableOpacity>
      <Pressable style={styles.btnLoginBorder} onPress={handleClickRegister}>
        <Text style={styles.btnLoginLabel}>Sign Up</Text>
      </Pressable>
      <Pressable style={styles.btnGoogle}>
        <Image source={require('../media/icon_button/google.png')} />
        <Text style={styles.btnGoogleLabel}>Sign in with google</Text>
      </Pressable>
      <View style={styles.footer}>
        <Text style={styles.footer1}>Already Have An Account?</Text>
        <Pressable onPress={() => { navigation.navigate('Login') }}>
          <Text style={styles.footer2}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Register

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
    marginTop: 25,

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
    backgroundColor: '#FFFfff',
    width: '100%',
    height: 48,
    padding: 10,
    paddingLeft: 20
  },
  labelLogin: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  formLogin: {
    marginTop: 30
  },
  welcome: {
    fontSize: 18,
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
    marginTop: 15
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa'
  }
})