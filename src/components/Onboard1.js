import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Onboard1= (props) => {
  const {navigation} = props
  const click = () => {
    navigation.navigate('Onboard2')
  }
  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image style={{top: 150, left: 30}} source={require('../media/background/ellip.png')} />
        <Image style={{top: -100, left: 30,}} source={require('../media/background/nikeText.png')} />
        <Image style={{top: -260}} source={require('../media/background/shoe1.png')} />
      </View>
      <View style={styles.txt}>
        <Text style={{fontFamily: 'Airbnb Cereal App', fontSize: 40, fontWeight: 'bold', lineHeight: 56, color: '#1A2530'}}>Start Journey With Nike</Text>
        <Text style={{fontFamily: 'Airbnb Cereal App', fontSize: 20, lineHeight: 32, color: '#707B81', fontWeight:'400'}}>Smart, Gorgeous & Fashionable Collection</Text>
      </View>
      <View style={styles.start}>
      <Image source={require('../media/background/next1.png')} />
        <TouchableOpacity onPress={click} style={{borderStyle: 'solid',backgroundColor: '#5B9EE1', borderRadius: 50, width: 156, height: 54, left: 180, top: -30}}>
            <Text style={{textAlign: 'center', fontFamily: 'Airbnb Cereal App', fontSize: 18, lineHeight: 22, color: '#FFFFFF', fontWeight:'bold', top: 15,}}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Onboard1

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FA',
      },
        start:{
            top: 400,
            left: 10,
        },
        txt:{
            top: 240,
            height: 112,
            width: 300,
            left: 10,
        },
        img:{
            width: 300,
            height: 180,
            top: -70,
            left: -20,
        }
})