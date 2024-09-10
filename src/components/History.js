import { Image, Pressable, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AxiosInstance from '../utils/AxiosIntance'
import { AppContext } from '../utils/AppContext'
import ItemOrder from './item/ItemOrder'
import { Picker } from '@react-native-picker/picker';



const History = (props) => {
    const { navigation } = props
    const { infoUser, dataOrder, setdataOrder } = useContext(AppContext)
    const [isLoading, setisLoading] = useState(true)
    const [selectedStatus, setSelectedStatus] = useState('all')

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
    }, [])

    const filteredOrders = selectedStatus === 'all'
        ? dataOrder
        : dataOrder.filter(order => order.status === selectedStatus)


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
            <View style={{ borderRadius: 20, backgroundColor: '#E9EDEF', paddingHorizontal: 20, marginTop: 10, marginHorizontal: 10, backgroundColor: 'white' }}>
                <Picker
                    mode='dropdown'
                    selectedValue={selectedStatus}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSelectedStatus(itemValue)}
                >
                    <Picker.Item label="All" value="all" style={styles.pickerItem} />
                    <Picker.Item label="Pending" value="pending" style={styles.pickerItem} />
                    <Picker.Item label="Confirmed" value="confirmed" style={styles.pickerItem} />
                    <Picker.Item label="Shipped" value="shipped" style={styles.pickerItem} />
                    <Picker.Item label="Delivered" value="delivered" style={styles.pickerItem} />
                    <Picker.Item label="Cancelled" value="cancelled" style={styles.pickerItem} />
                </Picker>

            </View>
            <ScrollView>
                {
                    isLoading == true ?
                        <View style={styles.loading}>
                            <ActivityIndicator size='large' color='#fff00' />
                            <Text>Loading....</Text>
                        </View>
                        :
                        // <FlatList
                        //     data={filteredOrders}
                        //     renderItem={({ item }) => <ItemOrder dulieu={item} navigation={navigation}
                        //     />}
                        //     keyExtractor={item => item._id}
                        //     showsVerticalScrollIndicator={false}
                        //     style={{ marginTop: 3, height: 450 }}
                        // />
                        <View style={{ paddingBottom: 10 }}>
                            {filteredOrders.map((item) => <ItemOrder key={item._id} dulieu={item} navigation={navigation} />)}
                        </View>
                }
            </ScrollView>
        </View>
    )
}

export default History

const styles = StyleSheet.create({
    pickerItem: {
        fontSize: 15,
        fontFamily: 'Airbnb-Cereal-App-Medium', // Use your desired font family
        color: '1A2530', // Use your desired font color,
        // borderRadius: 20,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
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
        backgroundColor: '#f2f2f2'
    }
})