import { StyleSheet, Text, View, Pressable, Image, FlatList, ActivityIndicator, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../utils/AppContext'
import AxiosInstance from '../utils/AxiosIntance'
import ItemCart from './item/ItemCart'
import { formatCurrency } from '../utils/GlobalFunction'


const Cart = (props) => {
  const { navigation } = props
  const { infoUser, dataCart, setdataCart } = useContext(AppContext)
  // const [dataCart, setdataCart] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [selectedItems, setselectedItems] = useState({})
  const [billPrice, setbillPrice] = useState(0)
  const [selectedItemsForCheckout, setSelectedItemsForCheckout] = useState([]);
  const shippingFee = 40000
  const btnBack = () => {
    navigation.goBack()
  }
  const btnCheckout = () => {
    navigation.navigate('Checkout', { selectedItems: selectedItemsForCheckout, totalPrice: billPrice })
    console.log(selectedItemsForCheckout);

  }
  useEffect(() => {
    const getCart = async () => {
      // http://localhost:3000/api/products/cart/:id
      const response = await AxiosInstance().get("/products/cart/getAllItems/" + infoUser._id)
      console.log(response)
      // if (response.result == true) { 
      //   setdataCart(response.cart.items.reverse())
      //   setisLoading(false)
      // } else {
      //   ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
      // }
      if (response.cart.item != []) {
        setdataCart(response.cart.items)
        setisLoading(false)
      } else {
        ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
      }
    }
    getCart()
    return () => {
    }
  }, [setdataCart])

  const removeItem = async (itemId) => {
    try {
      const response = await AxiosInstance().delete('/products/cart/remove', { data: { userId: infoUser._id, itemId } });
      console.log(response);
      if (response.result == true) {
        setdataCart(response.updatedCart.items);
        setisLoading(false)
      } else {
        ToastAndroid.show('Xóa sản phẩm thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      ToastAndroid.show('Lỗi khi xóa sản phẩm', ToastAndroid.SHORT);
    }
  }

  const increaseItemQuantity = async (itemId) => {
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
    setselectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemId]: !prevSelectedItems[itemId],
    }));
  };

  const calculateTotalPrice = () => {
    return dataCart.reduce((total, item) => {
      if (selectedItems[item._id]) {
        return total + item.product.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const updateTotalPrice = async (totalPrice) => {
    try {
      const response = await AxiosInstance().post('/products/cart/updateTotalPrice', {
        userId: infoUser._id,
        totalPrice,
        selectedItems
      });
      console.log(selectedItems);
      if (response.result != true) {
        ToastAndroid.show('Cập nhật tổng giá tiền thất bại', ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show('Lỗi khi cập nhật tổng giá tiền', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const totalPrice = calculateTotalPrice();
    console.log(totalPrice);
    // updateTotalPrice(totalPrice);
    setbillPrice(totalPrice)
    // Update selected items for checkout whenever selectedItems changes
    const selectedItemsArray = [];
    for (const itemId in selectedItems) {
      if (selectedItems[itemId]) {
        const selectedItem = dataCart.find(item => item._id === itemId);
        if (selectedItem) {
          selectedItemsArray.push(selectedItem);
        }
      }
    }
    setSelectedItemsForCheckout(selectedItemsArray);
  }, [selectedItems, dataCart]);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={btnBack}>
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
          <FlatList
            data={dataCart}
            renderItem={({ item }) => <ItemCart dulieu={item}
              onDelete={() => removeItem(item._id)}
              onIncrease={() => increaseItemQuantity(item._id)}
              onDecrease={() => decreaseItemQuantity(item._id)}
              isSelected={!!selectedItems[item._id]}
              onSelect={() => toggleSelectItem(item._id)}
            />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 3, height: 450 }}
          />
      }

      <View style={styles.popup}>
        <View style={styles.viewSubtotal}>
          <Text style={styles.txtSubtotal}>Subtotal</Text>
          <Text style={styles.txtCost1}>{formatCurrency(calculateTotalPrice())}</Text>
        </View>
        <View style={styles.viewShopping}>
          <Text style={styles.txtSubtotal}>Shipping Fee</Text>
          <Text style={styles.txtCost1}>{formatCurrency(shippingFee)}</Text>
        </View>
        <Image source={require('../media/icon_button/line.png')} style={{ marginTop: 20 }} />
        <View style={styles.viewTotalcost}>
          <Text style={styles.txtTotalCost}>Total Cost</Text>
          <Text style={styles.txtCost3}>{formatCurrency((calculateTotalPrice() + shippingFee))}</Text>
        </View>
        <Pressable style={styles.btnSubmit} onPress={btnCheckout} >
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

