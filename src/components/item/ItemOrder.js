import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { formatCurrency } from '../../utils/GlobalFunction'

const ItemOrder = (props) => {
    const { dulieu, navigation } = props
    const clickItem = () => {
        navigation.navigate('DetailOrder', { id: dulieu?._id })
        console.log(dulieu._id);
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    const countProduct = dulieu.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <TouchableOpacity onPress={clickItem}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={styles.nameShoe}>{capitalizeFirstLetter(dulieu.status)}</Text>
                    <Text style={{fontFamily: 'Airbnb-Cereal-App-Medium',}} >{dulieu._id}</Text>

                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.imgShoe} source={{ uri: dulieu?.items[0].product.image[0] }} />
                    <View style={{ marginStart: 15, marginTop: 5 }}>
                        <Text style={styles.nameShoe}>{dulieu.items[0].product.name}</Text>
                        <Text style={[styles.sizeShoe, { marginTop: 5 }]}>Size: {dulieu.items[0].sizeSelected}</Text>
                        <Text style={[styles.priceShoe, { marginTop: 10 }]}>{formatCurrency(dulieu.items[0].product.price)}</Text>
                    </View>
                    <Text style={styles.quantity}>x{dulieu.items[0].quantity}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={styles.nameShoe}>{countProduct} sản phẩm</Text>
                    <Text style={styles.totalShoe}>Thành tiền: {formatCurrency(dulieu.totalPrice)}</Text>
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
        color: '#5b9ee1',
        marginTop: 5
    },
    totalShoe: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        color: '#5b9ee1',
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
        padding: 20,
        position: 'relative',
        borderRadius: 10,
        backgroundColor: 'white',

    }
})