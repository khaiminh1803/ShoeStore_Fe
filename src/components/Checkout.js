import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image, Modal, ScrollView, TextInput, ToastAndroid, Platform, DeviceEventEmitter, NativeModules, NativeEventEmitter } from 'react-native'
import React, { useState, useContext } from 'react'
import CheckoutModal from './CheckoutModal';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../utils/AppContext';
import ItemCheckout from './item/ItemCheckout';
import AxiosInstance from '../utils/AxiosIntance'
import { formatCurrency } from '../utils/GlobalFunction'

import RNMomosdk from 'react-native-momosdk';
// const RNMomosdkModule = NativeModules.RNMomosdk;
// const EventEmitter = new NativeEventEmitter(RNMomosdkModule);



const Checkout = (props) => {
    const { navigation, route } = props
    const { params } = route
    const { infoUser, dataOrder, setdataOrder, selectedVoucher, setselectedVoucher } = useContext(AppContext)
    const [address, setAddress] = useState(infoUser.address);
    const [addressProvince, setaddressProvince] = useState("Tp. Hồ Chí Minh")
    const [email, setEmail] = useState(infoUser.email);
    const [phonenumber, setPhoneNumber] = useState(infoUser.phonenumber);
    // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cod');
    const [isModalVisible, setisModalVisible] = useState(false);
    const dataNe = params?.selectedItems
    const payment = ["Momo", "Cash"]
    const [paymentMethod, setpaymentMethod] = useState(null)
    const subtotalPrice = params.totalPrice
    let shippingFee = addressProvince ? (addressProvince === 'Tp. Hồ Chí Minh' ? 40000 : 60000) : 0;

    // const shippingFee = 40000
    const voucherCode = selectedVoucher?.code || '';
    const voucherValue = selectedVoucher?.value || 0;
    const voucherId = selectedVoucher?._id || null;

    const totalPrice = subtotalPrice + shippingFee - voucherValue

    // momo
    const merchantname = "CGV Cinemas";
    const merchantcode = "CGV01";
    const merchantNameLabel = "Nhà cung cấp";
    const billdescription = "Thanh toán hóa đơn";
    const amount = 50000;
    const enviroment = "0"; //"0": SANBOX , "1": PRODUCTION

    const handleClickMomo = async () => {
        let jsonData = {};
        jsonData.enviroment = enviroment; //SANBOX OR PRODUCTION
        jsonData.action = "gettoken"; //DO NOT EDIT
        jsonData.merchantname = merchantname; //edit your merchantname here
        jsonData.merchantcode = merchantcode; //edit your merchantcode here
        jsonData.merchantnamelabel = merchantNameLabel;
        jsonData.description = billdescription;
        jsonData.amount = totalPrice;//order total amount
        jsonData.orderId = "ID20181123192300";
        jsonData.orderLabel = "Ma don hang";
        jsonData.appScheme = "momocgv20170101";// iOS App Only , match with Schemes Indentify from your  Info.plist > key URL types > URL Schemes
        console.log("data_request_payment " + JSON.stringify(jsonData));
        if (Platform.OS === 'android') {
            let dataPayment = await RNMomosdk.requestPayment(jsonData);
            momoHandleResponse(dataPayment);
        } else {
            RNMomosdk.requestPayment(jsonData);
        }
    }

    const momoHandleResponse = async (response) => {
        try {
            console.log(response);
            if (response && response.status == 0) {
                //SUCCESS continue to submit momoToken,phonenumber to server
                let fromapp = response.fromapp; //ALWAYS:: fromapp == momotransfer
                let momoToken = response.data;
                let phonenumber = response.phonenumber;
                let message = response.message;

            } else {
                //let message = response.message;
                //Has Error: show message here
            }
        } catch (ex) { }
    }
    const changeModalVisible = (bool) => {
        setisModalVisible(bool)
    }

    const handleSelectedPayment = (paymentname) => {
        console.log("Selected payment:", paymentname);
        console.log("clickne");
        setpaymentMethod(paymentname)
    }
    const handleClickPickVoucher = () => {
        console.log("Voucher ne");
        navigation.navigate('Voucher', { subtotalPrice: subtotalPrice })
    }

    const handleCreateOrder = async () => {
        console.log(infoUser._id, email, phonenumber, address, dataNe, paymentMethod, totalPrice, voucherId);
        if(phonenumber === 'Chưa cập nhật' || address === 'Chưa cập nhật') {
            ToastAndroid.show("Nhập đầy đủ thông tin", ToastAndroid.SHORT)
            return
        }
        try {
            const response = await AxiosInstance().post("/products/order", { userId: infoUser._id, email: email, phonenumber: phonenumber, shippingAddress: address, selectedItems: dataNe, paymentMethod: paymentMethod, totalPrice: totalPrice, voucherId: voucherId })
            console.log(response)
            if (response.result == true) {
                ToastAndroid.show("Thanh toán thành công", ToastAndroid.SHORT)
                // setdataOrder([...dataOrder, response.order]); // Thêm order mới vào dataOrder
                setdataOrder(prevOrders => [...prevOrders, response.order]);
                setselectedVoucher(null)
                changeModalVisible(true)
            }
        } catch (error) {
            ToastAndroid.show("Thanh toán thất bại", ToastAndroid.SHORT)
        }
    }


    const handleClickCheckout = async () => {
        if (!paymentMethod) {
            ToastAndroid.show("Select a payment method, please", ToastAndroid.SHORT);
            return;
        }
        if (paymentMethod === "Cash") {
            handleCreateOrder();
        } else if (paymentMethod === "Momo") {
            try {
                await handleClickMomo(); // Đợi thanh toán Momo hoàn tất
                handleCreateOrder(); // Tạo đơn hàng chỉ sau khi thanh toán Momo thành công
            } catch (error) {
                console.error("Thanh toán Momo thất bại", error);
                ToastAndroid.show("Thanh toán Momo thất bại", ToastAndroid.SHORT);
            }
        }
    }


    return (
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
                }}>Checkout</Text>
                <View style={{ width: 30, height: 30 }}>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 155 }}>
                <View style={styles.information}>
                    <Text style={{
                        color: '#1A2530', fontSize: 14,
                        lineHeight: 20, fontWeight: '500',
                        fontFamily: 'Airbnb-Cereal-App-Bold'
                    }}>Contact Information</Text>
                    <View style={styles.viewEmail}>
                        <Image source={require('../media/icon_button/mail.png')} />
                        <View style={{ marginLeft: 10 }}>
                            <TextInput style={styles.edtEmail}
                                value={email}
                                onChangeText={setEmail} />
                            <Text style={styles.txtEmail}>Email</Text>
                        </View>
                        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={handleClickMomo}>
                            <Image style={styles.btnEdit} source={require('../media/icon_button/edit2.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewEmail}>
                        <Image source={require('../media/icon_button/phone.png')} />
                        <View style={{ marginLeft: 10 }}>
                            <TextInput style={styles.edtEmail}
                                value={phonenumber}
                                onChangeText={setPhoneNumber} />
                            <Text style={styles.txtEmail}>Phone</Text>
                        </View>
                        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => { console.log(phonenumber); }}>
                            <Image style={styles.btnEdit} source={require('../media/icon_button/edit2.png')} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.txtAddress}>Address</Text>
                        <View style={styles.viewAddress}>
                            <TextInput style={styles.edtAddress} value={address} onChangeText={setAddress} />
                            <TouchableOpacity>
                                <Image source={require('../media/icon_button/show.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ borderRadius: 20, backgroundColor: '#E9EDEF', paddingHorizontal: 20 }}>
                            <Picker
                                mode='dropdown'
                                selectedValue={addressProvince}
                                onValueChange={(itemValue, itemIndex) =>
                                    setaddressProvince(itemValue)
                                }>
                                <Picker.Item label="Tp. Hồ Chí Minh" value="Tp. Hồ Chí Minh" style={styles.pickerItem} />
                                <Picker.Item label="Other" value="Other" style={styles.pickerItem} />

                            </Picker>
                        </View>
                        <Image style={{
                            width: 295, height: 101,
                            borderRadius: 16, marginTop: 10
                        }}
                            source={require('../media/icon_button/map.png')} />

                    </View>


                </View>
                {dataNe.map(item => (
                    <ItemCheckout key={item._id} dulieu={item} />
                ))}
                <View style={{ padding: 10, marginTop: 5, backgroundColor: '#FFFfFf' }}>
                    <View style={styles.viewSubtotal}>
                        <Text style={styles.txtSubtotal}>Subtotal</Text>
                        <Text style={styles.txtCost1}>{formatCurrency(subtotalPrice)}</Text>
                    </View>
                    <View style={styles.viewShopping}>
                        <Text style={styles.txtSubtotal}>Shipping Fee</Text>
                        <Text style={styles.txtCost1}>{formatCurrency(shippingFee)}</Text>
                    </View>
                    {voucherValue > 0 && (
                        <View style={styles.viewShopping}>
                            <Text style={styles.txtSubtotal}>Voucher value</Text>
                            <Text style={styles.txtCost1}>-{formatCurrency(voucherValue)}</Text>
                        </View>
                    )}

                    <Image source={require('../media/icon_button/line.png')} style={{ marginTop: 20, alignSelf: 'center' }} />
                    <View style={styles.viewTotalcost}>
                        <Text style={styles.txtTotalCost}>Total Cost</Text>
                        <Text style={styles.txtCost3}>{formatCurrency((totalPrice))}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', alignItems: 'center', marginTop: 5, paddingVertical: 10, paddingHorizontal: 5 }}>
                    <Image source={require('../media/icon_button/voucher.png')} />
                    <Text style={[styles.txtSubtotal, { marginStart: 10 }]}>Voucher</Text>
                    <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={handleClickPickVoucher}>
                        <Text style={styles.txtSubtotal}>{selectedVoucher && selectedVoucher != null ? voucherCode : 'Pick voucher'}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.popup}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {
                        payment.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelectedPayment(item)}
                                style={[
                                    styles.borderCategory,
                                    { backgroundColor: paymentMethod === item ? '#5B9EE1' : '#E9EDEF' },
                                ]}
                            >
                                <Text style={[
                                    styles.txtCategory,
                                    { color: paymentMethod === item ? '#FFFFFF' : '#707B81' },
                                ]}>{item}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                {/* <Text style={{ textAlign: 'center', marginBottom: 10, marginTop: 10 }}>Phương thức thanh toán khác</Text> */}
                <Pressable style={styles.btnSubmit} onPress={handleClickCheckout} >
                    <Text style={styles.btnSubmitLabel}>Payment - {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} </Text>
                    <Modal transparent={true}
                        animationType='fade'
                        visible={isModalVisible}
                        onRequestClose={() => changeModalVisible(false)}>
                        <CheckoutModal
                            changeModalVisible={changeModalVisible}
                            navigation={navigation}
                        />
                    </Modal>
                </Pressable>
            </View>
        </View>
    )
}

export default Checkout

const styles = StyleSheet.create({
    pickerItem: {
        fontSize: 15,
        fontFamily: 'Airbnb-Cereal-App-Medium', // Use your desired font family
        color: '1A2530', // Use your desired font color,
        borderRadius: 20,

    },
    txtCategory: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '500',
        color: '#707B81'
    },
    borderCategory: {
        width: 170,
        height: 48,
        padding: 5,
        backgroundColor: '#E9EDEF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnSubmitLabel: {
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#ffffff',
        fontFamily: 'Airbnb-Cereal-App-Bold'
    },
    btnSubmit: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#5b9ee1',
        height: 60,
        paddingVertical: 13,
        paddingHorizontal: 24,
    },
    txtCost3: {
        color: '#1A2530',
        fontSize: 20,
        lineHeight: 24,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium'
    },
    txtTotalCost: {
        color: '#1A2530',
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium'
    },
    viewTotalcost: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center'
    },
    viewShopping: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtCost1: {
        color: '#1A2530',
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium'
    },
    txtSubtotal: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        color: '#707B81'
    },
    viewSubtotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 20
    },
    popup: {
        backgroundColor: '#ffffff',
        // backgroundColor: 'red',
        height: 140,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        position: 'absolute', // Use absolute positioning
        bottom: 0, // Anchor to the bottom of the container
        left: 0, // Align to the left edge of the container
        right: 0, // Stretch to the right edge of the container
    },
    edtAddress: {
        color: '#707B81',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'Airbnb-Cereal-App-Medium',

    },
    viewAddress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    txtAddress: {
        color: '#1A2530',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Bold',
        marginTop: 10
    },
    txtEmail: {
        color: '#707B81',
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        marginTop: 1
    },
    edtEmail: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        color: '#1A2530',
        // backgroundColor:'red',
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginBottom: 0
    },
    viewEmail: {
        flexDirection: 'row',
        width: 286,
        height: 40,
        alignItems: 'center',
        // backgroundColor: 'blue',
        marginTop: 15
    },
    information: {
        width: 335,
        height: 410,
        // height: 450,
        paddingHorizontal: 16,
        paddingVertical: 20,
        // backgroundColor: 'red',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 10,
        backgroundColor: '#5b9ee1'
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    }
})