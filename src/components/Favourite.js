import { Image, Pressable, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import ItemFavourite from './item/ItemFavourite'
import AxiosInstance from '../utils/AxiosIntance'
import { AppContext } from '../utils/AppContext'
import ItemOrder from './item/ItemOrder'



const Favorite = (props) => {
  const { navigation } = props
  const { infoUser, dataFavorite, setdataFavorite } = useContext(AppContext)
  const [isLoading, setisLoading] = useState(true)
  // const [dataOrder, setdataOrder] = useState([])

  useEffect(() => {
    const getFavorites = async () => {
      // http://localhost:3000/api/products/favorite/:userId
      const response = await AxiosInstance().get("/products/favorite/" + infoUser._id)
      console.log(response)
      if (response.result == true) { // lấy dữ liệu thành công
        setdataFavorite(response.favorite)
        setisLoading(false)
      } else {
        ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
      }
    }
    getFavorites()

  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Favourite</Text>

      </View>

      {
        isLoading == true ?
          <View style={styles.loading}>
            <ActivityIndicator size='large' color='#fff00' />
            <Text>Loading....</Text>
          </View>
          :
          // <FlatList
          //   data={dataFavorite}
          //   renderItem={({ item }) => <ItemFavourite dulieu={item} navigation={navigation}
          //   />}
          //   numColumns={2}
          //   keyExtractor={item => item._id}
          //   showsVerticalScrollIndicator={false}
          //   style={{ marginTop: 3, height: 450 }}
          // />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10 }}>
            {dataFavorite.map((item) => <ItemFavourite key={item._id} dulieu={item} navigation={navigation} />)}
          </View>
      }


    </View>
  )
}

export default Favorite

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10, // Khoảng cách giữa các hàng
  },
  text: {
    fontSize: 20,
    // lineHeight: 20,
    fontFamily: 'Airbnb-Cereal-App-Bold',
    color: 'white',

  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5b9ee1',
    height: 50,

  },
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    backgroundColor: '#f8f9fa'
  }
})
