import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { formatCurrency } from '../../utils/GlobalFunction'

const ItemOrder = (props) => {
    const { dulieu, navigation } = props
    const clickItem = () => {
        navigation.navigate('DetailOrder', { id: dulieu?._id })
        console.log(dulieu._id);
    }
    const countProduct = dulieu.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <TouchableOpacity onPress={clickItem}>
            <View style={styles.container}>
                <Image style={styles.imgShoe} source={{ uri: dulieu?.items[0].product.image[0] }} />
                <View style={{ marginStart: 15, marginTop: 5 }}>
                    <Text style={styles.nameShoe}>{dulieu.items[0].product.name}</Text>
                    <Text style={[styles.sizeShoe, { marginTop: 5 }]}>Size: {dulieu.items[0].sizeSelected}</Text>
                    <Text style={[styles.priceShoe, { marginTop: 10 }]}>{formatCurrency(dulieu.items[0].product.price)}</Text>
                </View>
                <Text style={styles.quantity}>x{dulieu.items[0].quantity}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: -40, left: 0, right: 0, borderBottomWidth: 0.8, paddingVertical: 10 }}>
                    <Text style={styles.nameShoe}>{countProduct} sản phẩm</Text>
                    <Text style={styles.nameShoe}>Thành tiền: {formatCurrency(dulieu.totalPrice)}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

export default ItemOrder

const styles = StyleSheet.create({
    sizeShoe: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        color: '#1A2530',

    },
    viewSize: {
        marginTop: 5,
        alignItems: 'center',
        marginLeft: 'auto',
        justifyContent: 'space-between'
    },
    imgBtn: {
        width: 24,
        height: 24
    },
    quantity: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        color: '#101817',
        position: 'absolute',
        bottom: 2,
        right: 20
    },
    priceShoe: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        color: '#1A2530',
        marginTop: 5
    },
    nameShoe: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        color: '#1A2530',
    },
    imgShoe: {
        width: 85,
        height: 85,
        borderRadius: 10
    },
    container: {
        margin: 10,
        marginBottom: 60,
        // paddingHorizontal: 10,
        flexDirection: 'row',
        position: 'relative',
        // backgroundColor: 'red',

    }
})