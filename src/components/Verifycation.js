import { StyleSheet, Text, View, Pressable, Image, TextInput, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../utils/AppContext'
import AxiosInstance from '../utils/AxiosIntance'
import OTPTextInput from 'react-native-otp-textinput';


const Verifycation = (props) => {
    const { navigation, route } = props
    const { params } = route
    const [code, setcode] = useState("")


    const handleClickVerify = async () => {
        console.log(params.email)
        try {
            // http://localhost:3000/api/users/register
            const response = await AxiosInstance().post("/users/verify", { email: params.email, code: code })
            console.log(response)
            if (response.result == true) {
                ToastAndroid.show("Xác thực thành công", ToastAndroid.SHORT)
                navigation.navigate("Login")
            } else {
                ToastAndroid.show("Xác thực thất bại", ToastAndroid.SHORT)
            }
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={() => { navigation.goBack() }}>
                <Image source={require('../media/icon_button/back.png')} />
            </Pressable>

            <View style={styles.header}>
                <Text style={styles.hello}>Verify Account</Text>
                <Text style={styles.welcome}>Please Enter Your Code To</Text>
                <Text style={styles.welcome}>Verification your account</Text>
            </View>
            <OTPTextInput
                ref={e => (this.otpInput = e)}
                handleTextChange={text => setcode(text)}
                inputCount={6}
                tintColor="#5b9ee1" // Active input border color
                offTintColor="#bdc3c7" // Inactive input border color
            />
            <Pressable style={styles.btnLoginBorder} onPress={handleClickVerify} >
                <Text style={styles.btnLoginLabel}>Verify</Text>
            </Pressable>

        </View>
    )
}

export default Verifycation

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