import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AppContext } from '../utils/AppContext';
import AxiosInstance from '../utils/AxiosIntance'
import ItemOrder from './item/ItemOrder';
import ItemOrderDetail from './item/ItemOrderDetail';
import { formatCurrency } from '../utils/GlobalFunction';


const DetailOrder = (props) => {
    const { navigation, route } = props
    const { params } = route
    const [isLoading, setisLoading] = useState(true)
    const [email, setemail] = useState("")
    const [phonenumber, setphonenumber] = useState("")
    const [address, setaddress] = useState("")
    const [totalPrice, settotalPrice] = useState("")
    const [items, setitems] = useState([])

    useEffect(() => {
        const getDetail = async () => {
            console.log(params.id);
            const response = await AxiosInstance().get("/products/orderUser/" + params.id + "/detail")
            console.log(response)
            if (response.result == true) {
                // lấy dữ liệu thành công
                setemail(response.orderDetail.email)
                setphonenumber(response.orderDetail.phonenumber)
                setaddress(response.orderDetail.shippingAddress)
                setitems(response.orderDetail.items)
                settotalPrice(response.orderDetail.totalPrice)
                setisLoading(false)
            } else {
                ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
            }
        }
        getDetail()
        return () => {

        }
    }, [])

    return (
        isLoading == true ?
            <View style={styles.loading}>
                <ActivityIndicator size='large' color='#fff00' />
                <Text>Loading....</Text>
            </View>
            :
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Image source={require('../media/icon_button/arrow.png')}
                            style={{ width: 30, height: 30 }} />
                    </TouchableOpacity>
                    <Text style={{
                        textAlign: 'center', fontFamily: 'Airbnb Cereal App'
                        , fontSize: 20, 
                        color: 'white', fontWeight: 'bold'
                    }}>Detail Order</Text>
                    <Pressable  >
                        <Image source={require('../media/icon_button/bag.png')}
                            style={{ width: 30, height: 30 }} />
                    </Pressable>
                </View>
                <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
                <View style={{ backgroundColor: '#5b9ee1', height: 100, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, marginTop: 10 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: '#ffffff', fontSize: 16 }}>Đơn hàng đã hoàn thành</Text>
                        <Text style={{ color: '#ffffff', fontSize: 14 }}>Cảm ơn bạn đã mua sắm tại Oxy boots</Text>
                    </View>
                    <Image style={{ marginLeft: 'auto' }} source={require('../media/icon_button/acceptable-risk.png')} />
                </View>
                <View style={styles.inforUser}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image source={require('../media/icon_button/pin.png')} style={{ width: 20, height: 20, marginEnd: 10 }} />
                        <Text style={styles.pinTitle}>Địa chỉ nhận hàng</Text>
                    </View>
                    <View style={{ marginTop: 5, marginLeft: 30 }}>
                        <Text style={styles.txtUser}>{email}</Text>
                        <Text style={styles.txtUser}>(+84) {phonenumber}</Text>
                        <Text style={styles.txtUser}>{address}</Text>
                    </View>
                </View>

                <View>
                    {
                        isLoading == true ?
                            <View style={styles.loading}>
                                <ActivityIndicator size='large' color='#fff00' />
                                <Text>Loading....</Text>
                            </View>
                            :
                            <View style={{ backgroundColor: '#ffffff', marginTop: 10 }}>
                                {items.map((item) => <ItemOrderDetail key={item._id} dulieu={item} />)}
                            </View>
                    }
                </View>
                <View style={{ padding: 10, backgroundColor: '#ffffff', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 20,
                            fontWeight: '500',
                            fontFamily: 'Airbnb-Cereal-App-Medium',
                            color: '#1A2530',
                           
                        }}>Thành tiền</Text>
                        <Text style={{ fontSize: 14,
                            lineHeight: 20,
                            fontWeight: '500',
                            fontFamily: 'Airbnb-Cereal-App-Medium',
                            color: '#1A2530',}}>{formatCurrency(totalPrice)} </Text>
                    </View>
                    <Text>Vui lòng thành toán <Text style={{ color: 'red' }}>{formatCurrency(totalPrice)} </Text>khi nhận hàng.</Text>
                </View>

                <View style={{ padding: 10, backgroundColor: '#ffffff', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ width: 25, height: 25, marginRight: 10 }} source={require('../media/icon_button/income.png')} />
                        <Text style={{
                            fontSize: 16,
                            lineHeight: 20,
                            fontWeight: '500',
                            fontFamily: 'Airbnb-Cereal-App-Medium',
                            color: '#1A2530',
                        }}>Phương thức thanh toán</Text>
                    </View>
                    <Text style={{
                        marginLeft: 35, priceShoe: {
                            fontSize: 14,
                            lineHeight: 20,
                            fontWeight: '500',
                            fontFamily: 'Airbnb-Cereal-App-Medium',
                            color: '#1A2530',
                            marginTop: 5
                        },
                    }}>Thanh toán khi nhận hàng</Text>
                </View>
                </ScrollView>
                
            </View>
    )
}

export default DetailOrder

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtUser: {
        fontSize: 16,
        lineHeight: 20,
        fontFamily: 'Airbnb-Cereal-App-light',
        fontWeight: '400'
    },
    pinTitle: {
        fontSize: 20,
        color: '#1A2530',
        fontFamily: 'Airbnb-Cereal-App-Regular',
        fontWeight: '800',
    },
    inforUser: {
        backgroundColor: '#ffffff',
        marginTop: 20,
        padding: 10,
        borderWidth: 0
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#5b9ee1',
        height: 50,
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    }
})