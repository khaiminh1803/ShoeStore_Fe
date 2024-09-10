import { Image, StyleSheet, Text, View, ActivityIndicator, ToastAndroid, ScrollView } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import ItemFavourite from './item/ItemFavourite'
import AxiosInstance from '../utils/AxiosIntance'
import { AppContext } from '../utils/AppContext'




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

  const handleDeleteFavorite = async (productId) => {
    try {
      const response = await AxiosInstance().delete("/products/removeFavorite", {
        data: { userId: infoUser._id, productId: productId } // Chú ý: phải sử dụng 'data' khi gửi request DELETE có body
      });
      if (response.result === true) {
        const updatedFavorites = dataFavorite.filter(item => item.productId !== productId);
        setdataFavorite(updatedFavorites);
        ToastAndroid.show("Delete Succesfully", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Delete fail", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Favourite</Text>
      </View>
      <ScrollView>
        {
          isLoading == true ?
            <View style={styles.loading}>
              <ActivityIndicator size='large' color='#fff00' />
              <Text>Loading....</Text>
            </View>
            :
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 15, paddingBottom: 60 }}>
              {dataFavorite.map((item) => <ItemFavourite key={item._id} dulieu={item} navigation={navigation} onDelete={() => handleDeleteFavorite(item.productId)} />)}
            </View>
        }
      </ScrollView>
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
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
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
