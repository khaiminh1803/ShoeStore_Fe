import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useEffect } from 'react'

const Welcome = (props) => {
    const { navigation } = props
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Onboard1');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require('../media/background/bg_welcome.jpg')} />
            <View style={styles.overlay}>
                <Text style={styles.text}>SHOES STORE</Text>
            </View>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative', // Đảm bảo phần tử con có thể được đặt tuyệt đối
    },
    img: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Đặt vị trí tuyệt đối cho phần tử con
        justifyContent: 'center', // Căn chỉnh văn bản vào giữa theo chiều dọc
        alignItems: 'center', // Căn chỉnh văn bản vào giữa theo chiều ngang
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
})