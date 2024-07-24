import { Image, Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import ItemFavourite from './item/ItemFavourite'
import AxiosInstance from '../utils/AxiosIntance'
import { AppContext } from '../utils/AppContext'
import ItemOrder from './item/ItemOrder'


const History = (props) => {
    const { navigation } = props
    const { infoUser, dataOrder, setdataOrder } = useContext(AppContext)
    const [isLoading, setisLoading] = useState(true)

    useEffect(() => {
        const getOrders = async () => {
            // http://localhost:3000/api/products/get-all
            const response = await AxiosInstance().get("/products/orderUser", { params: { userId: infoUser._id } })
            console.log(response)
            if (response.result == true) { // lấy dữ liệu thành công
                setdataOrder(response.orders)
                setisLoading(false)
            } else {
                ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
            }
        }
        getOrders()
        return () => {
        }
    }, [setdataOrder])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={require('../media/icon_button/arrow.png')}
                        style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{
                    textAlign: 'center', fontFamily: 'Airbnb Cereal App'
                    , fontSize: 20, lineHeight: 20,
                    color: 'white', fontWeight: 'bold'
                }}>History</Text>
                <View style={{ width: 30, height: 30 }}>
                </View>
            </View>
            {
                isLoading == true ?
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color='#fff00' />
                        <Text>Loading....</Text>
                    </View>
                    :
                    <FlatList
                        data={dataOrder}
                        renderItem={({ item }) => <ItemOrder dulieu={item} navigation={navigation}
                        />}
                        keyExtractor={item => item._id}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 3, height: 450 }}
                    />
            }
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#5b9ee1',
        height: 50
    },
    row: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 10, // Khoảng cách giữa các hàng
    },
    text: {
        fontSize: 20,

        fontFamily: 'Airbnb-Cereal-App-Bold',
        color: '#ffffff ',
        textAlign: 'center'
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    }
})