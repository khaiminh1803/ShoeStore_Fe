import { StyleSheet, Text, View, Pressable, Image, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import AxiosInstance from '../utils/AxiosIntance'
import OTPTextInput from 'react-native-otp-textinput';

const ResetPassword = (props) => {
  const { navigation, route } = props
  const { params } = route
  const [code, setcode] = useState("")
  const [newPassword, setnewPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")

  const handleResetPassword = async () => {
    try {
      // http://localhost:3000/api/users/forgotPassword
      const response = await AxiosInstance().post("/users/resetPassword", { email: params.email , code, newPassword, confirmPassword })
      console.log(response);
      
      if (response.success == true) {
        ToastAndroid.show("Reset Password Succesfully", ToastAndroid.SHORT);
        navigation.navigate('Login')
      } 
    } catch (error) {
      console.log('Error during login:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => { navigation.goBack() }}>
        <Image source={require('../media/icon_button/back.png')} />
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.hello}>Reset Password</Text>
        <Text style={styles.welcome}>Please Enter Your Code To</Text>
        <Text style={[styles.welcome, { marginBottom: 20 }]}>Reset your password</Text>
      </View>

      <OTPTextInput
        ref={e => (this.otpInput = e)}
        handleTextChange={text => setcode(text)}
        inputCount={6}
        tintColor="#5b9ee1" // Active input border color
        offTintColor="#bdc3c7" // Inactive input border color
        textInputStyle={styles.otpInput}
      />
      <Text style={[styles.labelLogin, { marginTop: 20 }]}>New Password</Text>
      <TextInput style={styles.textInput} onChangeText={setnewPassword} />
      <Text style={styles.labelLogin}>Confirm New Password</Text>
      <TextInput style={styles.textInput} onChangeText={setconfirmPassword} />
      <Pressable style={styles.btnLoginBorder} onPress={handleResetPassword} >
        <Text style={styles.btnLoginLabel}>Reset</Text>
      </Pressable>
    </View>
  )
}

export default ResetPassword

const styles = StyleSheet.create({

  otpInput: {
    borderWidth: 2,
    borderColor: '#bdc3c7',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    backgroundColor: '#ffffff',
    color: '#2c3e50',
    fontSize: 18,
    textAlign: 'center',
  },
  labelLogin: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  textInput: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    width: '100%',
    height: 48,
    padding: 10,
    paddingLeft: 20
  },
  btnLoginLabel: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#fff',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  btnLoginBorder: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#5b9ee1',
    height: 60,
    paddingVertical: 13,
    paddingHorizontal: 24,
  },

  textInput: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
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
    marginTop: 60
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8f9fa'
  }
})