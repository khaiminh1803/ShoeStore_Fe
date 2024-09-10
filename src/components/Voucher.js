import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, ToastAndroid, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AxiosInstance from '../utils/AxiosIntance'
import { AppContext } from '../utils/AppContext';
import ItemVoucher from './item/ItemVoucher';


const Voucher = (props) => {
    const { navigation , route} = props
    const subtotalPrice = route?.params.subtotalPrice
    const [isLoading, setisLoading] = useState(true)
    const [tempSelectedVoucher, setTempSelectedVoucher] = useState(null); 
    const { dataVoucher, setdataVoucher,selectedVoucher,setselectedVoucher } = useContext(AppContext)
    const getAllVouchers = async () => {
        // http://localhost:3000/api/products/getAllVoucher
        const response = await AxiosInstance().get("/products/getAllVoucher")
        console.log(response)
        if (response.result == true) { // lấy dữ liệu thành công
            setdataVoucher(response.vouchers)
            setisLoading(false)
        } else {
            ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
        }
    }
    useEffect(() => {
        getAllVouchers()
    }, [])

    const handleClickSelect = () => {
        console.log('Subtotal Price:', subtotalPrice);
        console.log('Selected Voucher Minimum Purchase Amount:', tempSelectedVoucher?.minPurchaseAmount);
        if (!tempSelectedVoucher) {
            ToastAndroid.show("Không có voucher được chọn", ToastAndroid.SHORT);
            return;
        }
        if (tempSelectedVoucher && subtotalPrice >= tempSelectedVoucher.minPurchaseAmount) {
            setselectedVoucher(tempSelectedVoucher);
            navigation.goBack();
        } else {
            ToastAndroid.show("Voucher không phù hợp", ToastAndroid.SHORT);
        }
    };

    const handleSelectVoucher = (voucher) => {
        setTempSelectedVoucher(voucher); 
        console.log(tempSelectedVoucher);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { navigation.navigate('Home') }}>
                    <Image source={require('../media/icon_button/arrow.png')}
                        style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{
                    textAlign: 'center', fontFamily: 'Airbnb Cereal App'
                    , fontSize: 20,
                    color: '#1A2530', fontWeight: 'bold', color: 'white'
                }}>Chọn hoặc nhập voucher</Text>
                <Pressable onPress={() => {console.log(subtotalPrice);}}>
                    <Image source={require('../media/icon_button/bag.png')}
                        style={{ width: 30, height: 30 }} />
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 10 }}>
                <Text>---------------------------</Text>
                <Text>Chỉ chọn 1 voucher</Text>
                <Text>---------------------------</Text>
            </View>
            <View style={{ backgroundColor: '#ffffff', paddingHorizontal: 10, paddingVertical: 20, marginTop: 10 }}>
                <Text style={[styles.txtText, { marginBottom: 10 }]}>Voucher của shop</Text>
                <View>
                    {
                        isLoading == true ?
                            <View style={styles.loading}>
                                <ActivityIndicator size='large' color='#fff00' />
                                <Text>Loading....</Text>
                            </View>
                            :
                            <FlatList
                                data={dataVoucher}
                                renderItem={({ item }) => <ItemVoucher dulieu={item} navigation={navigation} onSelectVoucher={handleSelectVoucher}
                                />}
                                keyExtractor={item => item._id}
                                showsVerticalScrollIndicator={false}
                                style={{ marginTop: 3 }}
                            />
                    }
                </View>
            </View>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, backgroundColor: '#ffffff', justifyContent: 'center' }}>
                <Pressable style={styles.btnLoginBorder} onPress={handleClickSelect}>
                    <Text style={styles.btnLoginLabel}>Select</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Voucher

const styles = StyleSheet.create({
    btnLoginLabel: {
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#fff',
        fontFamily: 'Airbnb-Cereal-App-Bold'
    },
    btnLoginBorder: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#5b9ee1',
        height: 60,
        paddingVertical: 13,
        paddingHorizontal: 24,
        marginHorizontal: 10
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtText: {
        color: '#1A2530',
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#5b9ee1',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
})

const dataNe = [
    {
        "id": "1",
        "title": "Man",
        "name": "Nike Jordan 2",
        "price": "160$",
        "image": "https://golfcity.com.vn/wp-content/uploads/2020/12/giay-golf-nam-Ecco-Mens-Golf-Casual-Hybrid-1.jpg",
        "description": "Giảm 20k cho đơn từ 50k"
    },
    {
        "id": "2",
        "title": "Woman",
        "name": "Nike Jordan 2",
        "price": "240$",
        "image": "https://thesneakerhouse.com/wp-content/uploads/2022/07/NMD-360-SHOES-4-300x300.jpg",
        "description": "Giảm 50k cho đơn từ 100k"
    },
    {
        "id": "3",
        "title": "Unisex",
        "name": "Nike Jordan 2",
        "price": "123$",
        "image": "https://thesneakerhouse.com/wp-content/uploads/2022/07/NMD-360-SHOES-4-300x300.jpg",
        "description": "Giảm 1000k cho đơn từ 200k"
    },
    {
        "id": "4",
        "title": "Unisex",
        "name": "Nike Jordan 2",
        "price": "123$",
        "image": "https://thesneakerhouse.com/wp-content/uploads/2022/07/NMD-360-SHOES-4-300x300.jpg",
        "description": "Giảm 1000k cho đơn từ 200k"
    },
    {
        "id": "5",
        "title": "Unisex",
        "name": "Nike Jordan 2",
        "price": "123$",
        "image": "https://thesneakerhouse.com/wp-content/uploads/2022/07/NMD-360-SHOES-4-300x300.jpg",
        "description": "Giảm 1000k cho đơn từ 200k"
    },
    {
        "id": "6",
        "title": "Unisex",
        "name": "Nike Jordan 2",
        "price": "123$",
        "image": "https://thesneakerhouse.com/wp-content/uploads/2022/07/NMD-360-SHOES-4-300x300.jpg",
        "description": "Giảm 1000k cho đơn từ 200k"
    },
    {
        "id": "6",
        "title": "Unisex",
        "name": "Nike Jordan 2",
        "price": "123$",
        "image": "https://thesneakerhouse.com/wp-content/uploads/2022/07/NMD-360-SHOES-4-300x300.jpg",
        "description": "Giảm 1000k cho đơn từ 200k"
    },
]