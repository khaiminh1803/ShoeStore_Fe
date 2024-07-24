import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { formatCurrency } from '../../utils/GlobalFunction'

const ItemCheckout = (props) => {
  const { dulieu, navigation } = props
  
  return (
    <View style={styles.container}>
      <Image style={styles.imgShoe} source={{ uri: dulieu.product.image[0] }} />
      <View style={{ marginStart: 15, marginTop: 5 }}>
        <Text style={styles.nameShoe}>{dulieu.product.name}</Text>
        <Text style={[styles.sizeShoe, { marginTop: 5 }]}>Size: {dulieu.sizeSelected}</Text>
        <Text style={[styles.priceShoe, { marginTop: 10 }]}>{formatCurrency(dulieu.product.price)}</Text>
      </View>
      <Text style={styles.quantity}>x{dulieu.quantity}</Text>
    </View>
  )
}

export default ItemCheckout

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
    right: 10
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
    position: 'relative',
    
    borderRadius: 20
  }
})