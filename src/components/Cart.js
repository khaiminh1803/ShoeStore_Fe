import { StyleSheet, Text, View, Pressable, Image, FlatList, ActivityIndicator, ToastAndroid, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../utils/AppContext'
import AxiosInstance from '../utils/AxiosIntance'
import ItemCart from './item/ItemCart'
import { formatCurrency } from '../utils/GlobalFunction'


const Cart = (props) => {
  const { navigation } = props
  const { infoUser, dataCart, setdataCart } = useContext(AppContext)
  const [isLoading, setisLoading] = useState(true)
  const [selectedItems, setselectedItems] = useState({})
  const [billPrice, setbillPrice] = useState(0)
  const shippingFee = 40000

  useEffect(() => {
    const getCart = async () => {
      // http://localhost:3000/api/products/cart/:id
      const response = await AxiosInstance().get("/products/cart/getAllItems/" + infoUser._id)
      console.log(response)
      if (response.cart.item != []) {
        setdataCart(response.cart.items)
        setisLoading(false)
      } else {
        ToastAndroid.show("Get data failed", ToastAndroid.SHORT)
      }
    }
    getCart()
  }, [])

  const removeItem = async (itemId) => {
    try {
      const response = await AxiosInstance().delete('/products/cart/remove', { data: { userId: infoUser._id, itemId } });
      console.log(response);
      if (response.result == true) {
        setdataCart(response.updatedCart.items);
        setisLoading(false)
      } else {
        ToastAndroid.show('Delete Fail', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      ToastAndroid.show('Lỗi khi xóa sản phẩm', ToastAndroid.SHORT);
    }
  }

  const increaseItemQuantity = async (itemId) => {
    console.log(itemId);
    
    try {
      const response = await AxiosInstance().post('/products/cart/increase', { userId: infoUser._id, itemId });
      console.log(response);
      if (response.result == true) {
        setdataCart(response.updatedCart.items);
        setisLoading(false)
      } else {
        ToastAndroid.show('Increase Fail', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error increase item from cart:', error);
      ToastAndroid.show('Error increase item', ToastAndroid.SHORT);
    }
  }

  const decreaseItemQuantity = async (itemId) => {
    try {
      const response = await AxiosInstance().post('/products/cart/decrease', { userId: infoUser._id, itemId });
      console.log(response);
      if (response.result == true) {
        setdataCart(response.updatedCart.items);
        setisLoading(false)
      } else {
        ToastAndroid.show('Decrease Fail', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error decrease item from cart:', error);
      ToastAndroid.show('Error decrease item', ToastAndroid.SHORT);
    }
  }

  const toggleSelectItem = (itemId) => {
    setselectedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  }

  useEffect(() => {
    const totalPrice = dataCart.reduce((total, item) => {
      return selectedItems[item._id] ? total + item.product.price * item.quantity : total;
    }, 0);
    setbillPrice(totalPrice);
  }, [selectedItems, dataCart]);

  const handleClickCheckOut = () => {
    const selectedItemsForCheckout = dataCart.filter(item => selectedItems[item._id]);
    if (!selectedItemsForCheckout.length) {
      ToastAndroid.show("Please select a shoe", ToastAndroid.SHORT);
      return;
    }
    navigation.navigate('Checkout', { selectedItems: selectedItemsForCheckout, totalPrice: billPrice });
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
          , fontSize: 20, lineHeight: 20,
          color: 'white', fontWeight: 'bold'
        }}>My Cart</Text>
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
          <ScrollView contentContainerStyle={{ paddingBottom: 250 }}>
            {dataCart.map(item => (
              <ItemCart
                key={item._id}
                dulieu={item}
                onDelete={() => removeItem(item._id)}
                onIncrease={() => increaseItemQuantity(item._id)}
                onDecrease={() => decreaseItemQuantity(item._id)}
                isSelected={!!selectedItems[item._id]}
                onSelect={() => toggleSelectItem(item._id)}
              />
            ))}
          </ScrollView>
      }

      <View style={styles.popup}>
        <View style={styles.viewSubtotal}>
          <Text style={styles.txtSubtotal} onPress={() => {console.log(selectedItems);
          }}>Subtotal</Text>
          <Text style={styles.txtCost1}>{formatCurrency(billPrice)}</Text>
        </View>
        <View style={styles.viewShopping}>
          <Text style={styles.txtSubtotal}>Shipping Fee</Text>
          <Text style={styles.txtCost1}>{formatCurrency(shippingFee)}</Text>
        </View>
        <Image source={require('../media/icon_button/line.png')} style={{ marginTop: 20 }} />
        <View style={styles.viewTotalcost}>
          <Text style={styles.txtTotalCost}>Total Cost</Text>
          <Text style={styles.txtCost3}>{formatCurrency((billPrice + shippingFee))}</Text>
        </View>
        <Pressable style={styles.btnSubmit} onPress={handleClickCheckOut} >
          <Text style={styles.btnSubmitLabel}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10, // Khoảng cách giữa các hàng
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnSubmitLabel: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.12,
    color: '#ffffff',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  btnSubmit: {
    marginTop: 30,
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
    height: 244,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute', // Use absolute positioning
    bottom: 0, // Anchor to the bottom of the container
    left: 0, // Align to the left edge of the container
    right: 0, // Stretch to the right edge of the container
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Airbnb-Cereal-App-Medium',
    color: '#1A2530',
    textAlign: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#5b9ee1',
    height: 50
  },
  container: {
    flex: 1,
    // paddingVertical: 10,
    backgroundColor: '#f8f9fa',
    flexDirection: 'column',
  }
})

