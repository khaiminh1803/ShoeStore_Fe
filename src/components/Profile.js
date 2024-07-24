import { StyleSheet, Text, View, TextInput, Image, Modal, TouchableOpacity, Button, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../utils/AppContext'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import AxiosInstance from '../utils/AxiosIntance'



const Profile = () => {
  const { infoUser, setinfoUser } = useContext(AppContext)
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };

  const capture = async () => {
    const result = await launchCamera()
    console.log(result.assets[0].uri)
    const formdata = new FormData()
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg',
    })
    const response = await AxiosInstance("multipart/form-data").post('/users/upload', formdata)
    console.log(response)
    if (response.result == true) {
      setinfoUser({ ...infoUser, avatar: response.url })
      ToastAndroid.show("Đăng ảnh thành công", ToastAndroid.SHORT)
    } else {
      ToastAndroid.show("Đăng ảnh thất bại", ToastAndroid.SHORT)
    }
  }

  const getImageLibrary = async () => {
    const result = await launchImageLibrary()
    console.log(result.assets[0].uri)
    const formdata = new FormData()
    formdata.append('image', {
      uri: result.assets[0].uri,
      type: 'image/jpeg',
      name: 'image.jpg'
    })
    const response = await AxiosInstance("multipart/form-data").post('/users/upload', formdata)
    console.log(response)
    if (response.result == true) {
      setinfoUser({ ...infoUser, avatar: response.url })
      ToastAndroid.show("Đăng ảnh thành công", ToastAndroid.SHORT)
    } else {
      ToastAndroid.show("Đăng ảnh thất bại", ToastAndroid.SHORT)
    }
  }

  const updateProfile = async () => {
    console.log("clickNEEEE");
    try {
      const response = await AxiosInstance().post('/users/update-profile', {
        id: infoUser._id,
        name: infoUser.name,
        email: infoUser.email,
        address: infoUser.address,
        phonenumber: infoUser.phonenumber,
        avatar: infoUser.avatar
      })
      console.log(response);
      if (response.result == true) {
        ToastAndroid.show("Update succesfully", ToastAndroid.SHORT)
      } else {
        ToastAndroid.show("Update failed", ToastAndroid.SHORT)
      }

    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 24, height: 24 }}></View>
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={updateProfile}>
          <Image source={require('../media/icon_button/edit.png')} style={{ width: 24, height: 24 }} />

        </TouchableOpacity>
      </View>
      <View style={styles.borderAvatar}>
        <Image source={{ uri: infoUser.avatar }} style={styles.image} />
        <TouchableOpacity onPress={handleOpenModal}>
          <Image source={require('../media/icon_button/camera.png')} style={styles.camera} />
        </TouchableOpacity>

      </View>
      <Text style={styles.namUser}>{infoUser.name}</Text>
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.textInput} value={infoUser.name} onChangeText={(text) => setinfoUser({ ...infoUser, name: text })} />
      <Text style={styles.label}>Email Address</Text>
      <TextInput style={styles.textInput} value={infoUser.email} onChangeText={(text) => setinfoUser({ ...infoUser, email: text })} />
      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.textInput} value={infoUser.address} onChangeText={(text) => setinfoUser({ ...infoUser, address: text })} />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.textInput} value={infoUser.phonenumber} onChangeText={(text) => setinfoUser({ ...infoUser, phonenumber: text })} />
      <Modal
        visible={visible}
        onRequestClose={handleCloseModal}
        transparent={true}
        animationType='fade'
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Chọn ảnh hoặc chụp ảnh</Text>

          <Button title="Chụp ảnh" onPress={capture} style={styles.modalButton} />
          <Button title="Chọn ảnh từ thiết bị" onPress={getImageLibrary} style={styles.modalButton} />

          <Button title="Hủy" onPress={handleCloseModal} style={styles.modalButton} />
        </View>
      </Modal>
    </View>

  )
}

export default Profile

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalButton: {
    margin: 5,
    padding: 10,
    backgroundColor: 'black'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
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