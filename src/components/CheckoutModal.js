import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const CheckoutModal = (props) => {
    const { navigation, changeModalVisible } = props;

    const closeModal = (bool) => {
        changeModalVisible(bool);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <View style={styles.imgView}>
                    <Image
                        source={require('../media/icon_button/cheer.png')}
                        style={styles.img}
                    />
                </View>
                <View style={styles.textView}>
                    <Text style={styles.text}>Your Order Is Successful</Text>
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => closeModal(false)}
                    >
                        <Text style={styles.btnText}>Back To Shopping</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CheckoutModal;

const styles = StyleSheet.create({
    img: {
        width: 86,
        height: 86,
    },
    imgView: {
        width: 134,
        height: 134,
        borderRadius: 100,
        padding: 24,
        gap: 8,
        backgroundColor: '#DFEFFF',
        marginBottom: 20,
    },
    text: {
        whiteSpace: 'wrap',
        width: 150,
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 28,
        textAlign: 'center',
        color: '#1A2530',
        fontFamily: 'Airbnb-Cereal-App-Medium',
    },
    textView: {
        marginBottom: 20,
    },
    btn: {
        backgroundColor: '#5B9EE1',
        borderRadius: 30,
        height: 60,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 22,
        color: '#FFFFFF',
        fontFamily: 'Airbnb-Cereal-App-Medium',
    },
    view: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    container: {
        paddingVertical: 180,
        paddingHorizontal: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
