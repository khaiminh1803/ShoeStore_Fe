import { StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../utils/AppContext'

const Profile = () => {

  const { infoUser } = useContext(AppContext)
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{width: 24, height: 24}}></View>
        <Text style={styles.title}>Profile</Text>
        <Image source={require('../media/icon_button/edit.png')} style={{width: 24, height: 24}} />
      </View>
      <View style={styles.borderAvatar}>
        <Image source={{ uri: infoUser.avatar }} style={styles.image} />
        <Image source={require('../media/icon_button/camera.png')} style={styles.camera} />
      </View>
      <Text style={styles.namUser}>{infoUser.name}</Text>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.textInput} value={infoUser.name} />
      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.textInput} value={infoUser.email} />
      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.textInput} value={infoUser.address} />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.textInput} value={infoUser.phonenumber} />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    height: 48,
    padding: 10,
    paddingLeft: 20
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  namUser: {
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
    color: '#1A2530',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
    fontFamily: 'Airbnb Cereal App'
  },
  camera: {
    position: 'absolute',
    bottom: -30
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 20
  },
  borderAvatar: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Airbnb-Cereal-App-Bold',
    color: '#1A2530',
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa'
  },
})