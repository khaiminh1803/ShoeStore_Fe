import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { formatCurrency } from '../../utils/GlobalFunction'

const ItemVoucher = (props) => {
    const { navigation, dulieu, onSelectVoucher } = props
    
    const handleCheckboxChange = (isChecked) => {
        if (isChecked) {
            onSelectVoucher(dulieu); // Pass the voucher object to the parent
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#5b9ee1', width: 110 }}>
                <Image source={require('../../media/icon_button/coupon.png')} style={{ width: 70, height: 70 }} />
            </View>
            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                <Text style={styles.txtCost1}>{dulieu.description}</Text>
                <View style={{
                    justifyContent: 'center', alignItems: 'center', borderColor: '#5b9ee1', borderWidth: 1, width: 109, marginVertical: 10
                }}>
                    <Text style={styles.txtSubtotal}>Ưu đãi có hạn</Text>
                </View>
                <Text style={styles.txtSubtotal}>Hết hạn trong 4 ngày</Text>
            </View>
            <BouncyCheckbox
                onPress={(isChecked) => handleCheckboxChange(isChecked)}
                fillColor="#5b9ee1"
                unFillColor="#FFFFFF"
                style={{ position: 'absolute', bottom: 0, right: 0 }} />
        </View>
    )
}

export default ItemVoucher

const styles = StyleSheet.create({
    txtCost1: {
        color: '#1A2530',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium'
    },
    txtSubtotal: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Airbnb-Cereal-App-Medium',
        color: '#5b9ee1'
    },
    container: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        height: 110,
        marginBottom: 10,
        elevation: 5, position: 'relative'
    }
})