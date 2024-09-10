import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  Image,
  TouchableOpacity,
   
} from 'react-native';
import React, { useContext, useState } from 'react';
import { AppContext } from '../utils/AppContext';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../utils/AxiosIntance';




const ChangePassword = (props) => {
  const { navigation } = props
  const { infoUser } = useContext(AppContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword === confirmNewPassword) {
      try {
        const response = await AxiosInstance().post("/users/changePassword/" + infoUser._id,
          { oldPassword, newPassword },
        );
        console.log(response);
        if (response.error === false) {
          ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.LONG);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          ToastAndroid.show("Old password is incorrect", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Có lỗi xảy ra, vui lòng thử lại sau.", ToastAndroid.SHORT);
        }
      }
    } else {
      ToastAndroid.show('Xác nhận mật khẩu mới không khớp', ToastAndroid.LONG);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {navigation.goBack()}}>
      <Image source={require('../media/icon_button/back.png')} />

      </TouchableOpacity>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.title2}>Change Your Account Password Here</Text>
      <View>
        <Text style={styles.label}>Old Password</Text>
        <TextInput
          secureTextEntry
          style={styles.textInput}
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
        />
        <Text style={styles.label}>New Password</Text>
        <TextInput
          secureTextEntry
          style={styles.textInput}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
        <Text style={styles.label}>Confirm New Password</Text>
        <TextInput
          secureTextEntry
          style={styles.textInput}
          value={confirmNewPassword}
          onChangeText={text => setConfirmNewPassword(text)}
        />
        <Pressable style={styles.btnLoginBorder} onPress={handleChangePassword}>
          <Text style={styles.btnLoginLabel}>Change Password</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 24
   
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Bold',
    textAlign: 'center',
    marginTop: 60
  },
  title2: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 5,
    fontFamily: 'Airbnb-Cereal-App-light',
    textAlign: 'center',
    marginBottom: 30,
  },
  heading: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    marginBottom: 30,
    marginTop: 70
  },
  textInput: {
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    height: 48,
    padding: 10,
    paddingLeft: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Bold',
  },
  btnLoginLabel: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#fff',
    fontFamily: 'Airbnb-Cereal-App-Bold',
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
});
