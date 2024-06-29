import { Image, Pressable, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ItemFavourite from './item/ItemFavourite'

const Favorite = () => {
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
      <FlatList
                data={dataNe}
                renderItem={({ item }) => <ItemFavourite dulieu={item} />}
                keyExtractor={item => item.id}
                numColumns={2} // Số lượng cột là 2
                showsVerticalScrollIndicator = {false}
                columnWrapperStyle={styles.row} // Thêm kiểu cho hàng
                style={{marginTop: 20}}
                
            />
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
    paddingHorizontal: 20,
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
},{
  "id": "7",
  "title": "Man",
  "name": "Nike Jordan 2",
  "price": "1$",
  "image": "https://thesneakerhouse.com/wp-content/uploads/2022/06/ULTRABOOST-22-SHOES-17-300x300.jpg"
},

]