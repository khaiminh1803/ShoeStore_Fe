import { StyleSheet, Text, View, Pressable, Image, TextInput, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../utils/AppContext'

const ForgotPassword = (props) => {
  const { navigation } = props
  const back = () => {
    navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <Pressable onPress={back}>
        <Image source={require('../media/icon_button/back.png')} />
      </Pressable>
      
      <View style={styles.header}>
        <Text style={styles.hello}>Forgot Password</Text>
        <Text style={styles.welcome}>Please Enter Your Email Address To</Text>
        <Text style={styles.welcome}>Recieve a Verification Code</Text>
      </View>
      <View style={styles.formLogin}>
        <Text style={styles.labelLogin}>Email Address</Text>
        <TextInput style={styles.textInput} placeholder='Enter your email' />
      </View>
      <Pressable style={styles.btnLoginBorder} >
        <Text style={styles.btnLoginLabel}>Continue</Text>
      </Pressable>

    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
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