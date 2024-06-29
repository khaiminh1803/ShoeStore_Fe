import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import ItemFavourite from './item/ItemFavourite'
import { AppContext } from '../utils/AppContext'
import AxiosInstance from '../utils/AxiosIntance'
import ItemShoe from './item/ItemShoe'

const Home = (props) => {
  const { navigation } = props
  const { infoUser } = useContext(AppContext)
  const [dataNe, setdataNe] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [searchText, setsearchText] = useState("")

  useEffect(() => {
    const getNews = async () => {
      // http://localhost:3000/api/products/get-all
      const response = await AxiosInstance().get("/products/get-all")
      console.log(response)
      if (response.result == true) { // lấy dữ liệu thành công
        setdataNe(response.products)
        setisLoading(false)
      } else {
        ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
      }
    }
    getNews()
    return () => {
    }
  }, [])
  let timeOut = null
  const countDownSearch = (searchText) => {
    if (timeOut) {
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
      search(searchText)
    }, 1000)
  }

  const search = async (searchText) => {
    setisLoading(true)
    const response = await AxiosInstance().get("/products/search?name=" + searchText)
    if (response.result == true) {
      setdataNe(response.products)
      setisLoading(false)
    } else {
      ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Image source={require('../media/icon_button/setting.png')} style={{ width: 44, height: 44 }} />
        </Pressable>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, lineHeight: 16, fontWeight: '400', fontFamily: 'Airbnb-Cereal-App-Medium', color: '#707B81' }}>Store Location</Text>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Image source={require('../media/icon_button/location.png')} style={{ width: 15, height: 15, marginEnd: 3 }} />
            <Text style={{ fontSize: 20, lineHeight: 20, fontWeight: '500', fontFamily: 'Airbnb-Cereal-App-Medium', color: '#1A2530' }}>Nguyen Du, Quan 1</Text>
          </View>
        </View>
        <Pressable>
          <Image source={require('../media/icon_button/cart.png')} style={{ width: 44, height: 44 }} />
        </Pressable>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} >
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <Image style={{ width: 62, height: 62, borderRadius: 10 }} source={{ uri: infoUser.avatar }} />
          <View style={{ marginStart: 10 }}>
            <Text style={{ color: '#707B81', fontSize: 15, fontFamily: 'Airbnb-Cereal-App-Medium', marginTop: 5 }}>Good moring,</Text>
            <Text style={{ color: '#1A2530', fontSize: 20, fontFamily: 'Airbnb-Cereal-App-Medium', marginTop: 10 }}>{infoUser.name}</Text>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput placeholder='Looking for shoes' style={styles.edtSearch} onChangeText={(text) => countDownSearch(text)} />
          <Image source={require('../media/icon_button/search.png')} style={styles.imgSearch} />
        </View>
        <View style={[styles.header, { marginTop: 20 }]}>
          <Image source={require('../media/icon_button/adidas.png')} style={{ width: 44, height: 44 }} />
          <Image source={require('../media/icon_button/armour.png')} style={{ width: 44, height: 44 }} />
          <Image source={require('../media/icon_button/converse.png')} style={{ width: 44, height: 44 }} />
          <Image source={require('../media/icon_button/puma.png')} style={{ width: 44, height: 44 }} />
          <Image source={require('../media/icon_button/nike.png')} style={{ width: 44, height: 44 }} />
        </View>
        {/* <Image style={styles.banner} source={{ uri: 'https://cdn.dribbble.com/users/4063497/screenshots/14707936/media/bb3c9cc3e171c070e73059ee1a9d0155.png?resize=400x0' }} /> */}
        <View>
          {
            isLoading == true ?
              <View style={styles.loading}>
                <ActivityIndicator size='large' color='#fff00' />
                <Text>Loading....</Text>
              </View>
              :
              // <FlatList
              //   data={dataNe}
              //   renderItem={({ item }) => <ItemShoe dulieu={item} navigation={navigation} />}
              //   keyExtractor={item => item._id}
              //   numColumns={2} // Số lượng cột là 2
              //   showsVerticalScrollIndicator={false}
              //   columnWrapperStyle={styles.row} // Thêm kiểu cho hàng
              //   style={{ marginTop: 20, paddingBottom: 100 }}
              // />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 }}>
                {dataNe.map((item) =><ItemShoe key={item._id} dulieu={item} navigation={navigation} />)}
              </View>
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flexDirection: 'row'
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10, // Khoảng cách giữa các hàng
  },
  banner: {
    width: 350,
    height: 184,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 15
  },
  imgSearch: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 8,
    left: 13
  },
  edtSearch: {
    height: 48,
    borderRadius: 50,
    backgroundColor: '#ffffff',
    paddingLeft: 60,
    color: '#707B81',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Airbnb-Cereal-App-Medium'
  },
  searchContainer: {
    marginTop: 20,
    position: 'relative'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#f8f9fa'
  },
})
