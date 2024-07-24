import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { formatCurrency } from '../../utils/GlobalFunction'


const ItemCart = (props) => {
  const { dulieu, onDelete, onIncrease, onDecrease, onSelect, isSelected } = props
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        onPress={onSelect}
        isChecked={isSelected}
        fillColor="#5b9ee1"
        unFillColor="#FFFFFF"
        style={{ width: 20, height: 20, alignSelf: 'center', marginRight: 15 }} />
      <Image style={styles.imgShoe} source={{ uri: dulieu?.product.image[0] }} />
      <View style={{ marginStart: 15, marginTop: 5 }}>
        <Text style={styles.nameShoe}>{dulieu.product.name}</Text>
        <Text style={styles.priceShoe}>{formatCurrency(dulieu.product.price)}</Text>
        <View style={styles.viewBtn}>
          <TouchableOpacity onPress={onDecrease}>
            <Image style={styles.imgBtn} source={require('../../media/icon_button/minus.png')} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{dulieu.quantity}</Text>
          <TouchableOpacity onPress={onIncrease}>
            <Image style={styles.imgBtn} source={require('../../media/icon_button/plus.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewSize}>
        <Text style={styles.sizeShoe}>{dulieu.sizeSelected}</Text>
        <TouchableOpacity onPress={onDelete}>
          <Image style={styles.imgBtn} source={require('../../media/icon_button/delete.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ItemCart

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
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 89,
    height: 24,
    marginTop: 10
  },
  quantity: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Airbnb-Cereal-App-Medium',
    color: '#101817'
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
    flexDirection: 'row',
  }
})