import { Image, Pressable, StyleSheet, Text, View, FlatList , ActivityIndicator} from 'react-native'
import React, { useEffect, useState, useContext} from 'react'
import ItemFavourite from './item/ItemFavourite'
import AxiosInstance from '../utils/AxiosIntance'
import { AppContext } from '../utils/AppContext'
import ItemOrder from './item/ItemOrder'



const Favorite = (props) => {
  const {navigation} = props
  const { infoUser,dataOrder, setdataOrder } = useContext(AppContext)
  const [isLoading, setisLoading] = useState(true)
  // const [dataOrder, setdataOrder] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      // http://localhost:3000/api/products/get-all
      const response = await AxiosInstance().get("/products/orderUser", { params: { userId: infoUser._id } })
      console.log(response)
      if (response.result == true) { // lấy dữ liệu thành công
        setdataOrder(response.orders)
        setisLoading(false)
      } else {
        ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
      }
    }
    getOrders()
    return () => {
    }
  }, [setdataOrder])
  return (
    <View style={styles.container}>
      {/* <View style={styles.viewRow}>
        <Pressable>
          <Image source={require('../media/icon_button/back.png')} />
        </Pressable>
        <Text style={styles.text}>Favourite</Text>
        <Pressable>
          <Image source={require('../media/icon_button/heart.png')} />
        </Pressable>
      </View>  */}
      <Text style={styles.text}>Favourite</Text>
      {/* <FlatList
                data={dataNe}
                renderItem={({ item }) => <ItemFavourite dulieu={item} />}
                keyExtractor={item => item.id}
                numColumns={2} // Số lượng cột là 2
                showsVerticalScrollIndicator = {false}
                columnWrapperStyle={styles.row} // Thêm kiểu cho hàng
                style={{marginTop: 20}}
                
            /> */}
      {
        isLoading == true ?
          <View style={styles.loading}>
            <ActivityIndicator size='large' color='#fff00' />
            <Text>Loading....</Text>
          </View>
          :
          <FlatList
            data={dataOrder}
            renderItem={({ item }) => <ItemOrder dulieu={item} navigation={navigation}
            />}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 3, height: 450 }}
          />
      }


    </View>
  )
}

export default Favorite

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10, // Khoảng cách giữa các hàng
  },
  text: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'Airbnb-Cereal-App-Bold',
    color: '#1A2530',
    textAlign: 'center'
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa'
  }
})

const dataNe = [
  {
    "id": "1",
    "title": "Man",
    "name": "Nike Jordan 2",
    "price": "160$",
    "image": "https://golfcity.com.vn/wp-content/uploads/2020/12/giay-golf-nam-Ecco-Mens-Golf-Casual-Hybrid-1.jpg"
  },
  {
    "id": "2",
    "title": "Woman",
    "name": "Nike Jordan 2",
    "price": "240$",
    "image": "https://thesneakerhouse.com/wp-content/uploads/2022/07/NMD-360-SHOES-4-300x300.jpg"
  },
  {
    "id": "3",
    "title": "Unisex",
    "name": "Nike Jordan 2",
    "price": "123$",
    "image": "https://thesneakerhouse.com/wp-content/uploads/2022/07/NMD-360-SHOES-4-300x300.jpg"
  },
  {
    "id": "4",
    "title": "Man",
    "name": "Nike Jordan 2",
    "price": "1$",
    "image": "https://thesneakerhouse.com/wp-content/uploads/2022/04/ULTRABOOST-21-SHOES-7-300x300.jpg"
  },
  {
    "id": "5",
    "title": "Man",
    "name": "Nike Jordan 2",
    "price": "1$",
    "image": "https://thesneakerhouse.com/wp-content/uploads/2023/08/ADIDAS-NMD-360-X-LEGO%C2%AE-SHOES-BLACK-6-300x300.jpg"
  },
  {
    "id": "6",
    "title": "Man",
    "name": "Nike Jordan 2",
    "price": "1$",
    "image": "https://thesneakerhouse.com/wp-content/uploads/2022/03/ULTRABOOST-22-W-14-300x300.jpg"
  }, {
    "id": "7",
    "title": "Man",
    "name": "Nike Jordan 2",
    "price": "1$",
    "image": "https://thesneakerhouse.com/wp-content/uploads/2022/06/ULTRABOOST-22-SHOES-17-300x300.jpg"
  },

]