import { StyleSheet, Text, View, Image, TextInput, FlatList, ScrollView, Pressable, ActivityIndicator, TouchableOpacity, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '../utils/AppContext'
import AxiosInstance from '../utils/AxiosIntance'
import ItemShoe from './item/ItemShoe'
import { Picker } from '@react-native-picker/picker';

const Home = (props) => {
  const { navigation } = props
  const { infoUser, dataFavorite, setdataFavorite } = useContext(AppContext)
  const [dataNe, setdataNe] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [searchText, setsearchText] = useState("")
  const [selectedCategory, setselectedCategory] = useState(null)
  const [selectedSize, setselectedSize] = useState(null)
  const [min, setmin] = useState("100")
  const [max, setmax] = useState("500")
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handlePress = (brand) => {
    setSelectedBrand(brand);
  };

  const category = ["Men", "Women", 'Kid']
  const sizes = ["36", "37", "38", "39", "40", "41", "42"]
  const brands = [
    { name: 'Adidas', image: require('../media/icon_button/adidas.png') },
    { name: 'Armour', image: require('../media/icon_button/armour.png') },
    { name: 'Converse', image: require('../media/icon_button/converse.png') },
    { name: 'Puma', image: require('../media/icon_button/puma.png') },
    { name: 'Nike', image: require('../media/icon_button/nike.png') }
  ];

  const handleClickSeeAll = async () => {
    console.log("Click see all");
    setSelectedBrand(null)
    getAllProducts().catch(error => {
      console.error("Error handling getAllProducts:", error);
      // Xử lý lỗi ở đây, ví dụ hiển thị thông báo cho người dùng
    });
  }

  const handleClickCart = () => {
    navigation.navigate('Cart')
  }
  const clickCategory = (categoryName) => {
    console.log("Selected category:", categoryName);
    console.log("clickne");
    setselectedCategory(categoryName)
  }
  const clickSize = (size) => {
    console.log("Selected size:", size);
    setselectedSize(size)
  }
  const handleClickReset = () => {
    setselectedCategory(null)
    setselectedSize(null)
    setmin(null)
    setmax(null)
  }
  const handleClickApply = async () => {
    console.log(selectedCategory);
    console.log(selectedSize);
    console.log(min);
    console.log(max);
    try {
      // http://localhost:3000/api/products/filter
      const response = await AxiosInstance().get("/products/filter", {
        params: {
          categoryName: selectedCategory,
          size: selectedSize,
          min: min,
          max: max
        }
      })
      if (response.result == true) {
        setdataNe(response.products)
        setModalVisible(false)
        // setisLoading(false)
      } else {
        ToastAndroid.show("Không có sản phẩm phù hợp", ToastAndroid.SHORT);
        console.log("loi vcl");
      }
    } catch (e) {
      console.log(e)
    }
  }

  const getProductByBrand = async () => {
    // http://localhost:3000/api/products/filterByBrand
    const response = await AxiosInstance().get("/products/filterByBrand", { params: { brandName: selectedBrand } })
    console.log(response)
    if (response.result == true) { // lấy dữ liệu thành công
      setdataNe(response.products)
      setisLoading(false)
    } else {
      ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
    }
  }


  useEffect(() => {
    // getProductByBrand()
    if (selectedBrand) {
      getProductByBrand();
    }
  }, [selectedBrand])

  const getAllProducts = async () => {
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
  useEffect(() => {
    getAllProducts()
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

  const handleClickFavorite = async (productId) => {
    // http://localhost:3000/api/products/addFavorite
    const response = await AxiosInstance().post("/products/addFavorite", { userId: infoUser._id, productId: productId })
    console.log(response)
    if (response.result == true) { // lấy dữ liệu thành công
      setdataFavorite([...dataFavorite, response.favorite])
      setisLoading(false)
    } else {
      ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Image source={require('../media/icon_button/menu.png')} style={{ width: 30, height: 30 }} />
        </Pressable>
        <Text style={{ fontSize: 20, fontWeight: '500', fontFamily: 'Airbnb-Cereal-App-Bold', color: 'white' }}>Store</Text>
        <Pressable onPress={handleClickCart}>
          <Image source={require('../media/icon_button/bag.png')} style={{ width: 30, height: 30 }} />
        </Pressable>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }} >
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Image style={{ width: 62, height: 62, borderRadius: 10 }} source={{ uri: infoUser?.avatar }} />
            <View style={{ marginStart: 10 }}>
              <Text style={{ color: '#707B81', fontSize: 15, fontFamily: 'Airbnb-Cereal-App-Medium', marginTop: 5 }}>Good moring,</Text>
              <Text style={{ color: '#1A2530', fontSize: 20, fontFamily: 'Airbnb-Cereal-App-Medium', marginTop: 10 }}>{infoUser.name}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <View style={styles.searchContainer}>
              <TextInput placeholder='Looking for shoes' style={styles.edtSearch} onChangeText={(text) => countDownSearch(text)} />
              <Image source={require('../media/icon_button/search.png')} style={styles.imgSearch} />
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image style={{ width: 30, height: 30, marginLeft: 20 }} source={require('../media/icon_button/filter.png')} />
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#1A2530', fontSize: 16, lineHeight: 24, fontFamily: 'Airbnb-Cereal-App-Medium', marginTop: 10 }}>Brand</Text>
          <View style={[styles.type, { marginTop: 10 }]}>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand.name}
                style={[
                  styles.brandContainer,
                  selectedBrand === brand.name && styles.selectedBrand,
                ]}
                onPress={() => handlePress(brand.name)}
              >
                <Image source={brand.image} style={styles.image} />
                {selectedBrand === brand.name && <Text style={styles.text}>{brand.name}</Text>}
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <Text style={{ color: '#1A2530', fontSize: 16, lineHeight: 24, fontFamily: 'Airbnb-Cereal-App-Medium' }}>Collection</Text>
            <TouchableOpacity onPress={handleClickSeeAll}>
              <Text style={{ color: '#1A2530', fontSize: 16, lineHeight: 24, fontFamily: 'Airbnb-Cereal-App-Medium' }}>See all</Text>
            </TouchableOpacity>
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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10, paddingBottom: 60 }}>
                  {dataNe.map((item) => <ItemShoe key={item._id} dulieu={item} navigation={navigation} clickHeart={handleClickFavorite} />)}
                </View>
            }
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <View style={{ width: 60, height: 5, backgroundColor: '#E9EDEF', borderRadius: 16, alignSelf: 'center' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24, lineHeight: 32, fontWeight: '500', color: '#1A2530' }}>Filters</Text>
            <TouchableOpacity style={{ position: 'absolute', right: 0, }} onPress={handleClickReset}>
              <Text style={{ fontSize: 12, lineHeight: 16, fontWeight: 400, color: '#707B81' }}>RESET</Text>
            </TouchableOpacity>

          </View>
          <Text style={[styles.txtLabel, { marginTop: 20, marginBottom: 15 }]}>Gender</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {
              category.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => clickCategory(item)}
                  style={[
                    styles.borderCategory,
                    { backgroundColor: selectedCategory === item ? '#5B9EE1' : '#E9EDEF' },
                  ]}
                >
                  <Text style={[
                    styles.txtCategory,
                    { color: selectedCategory === item ? '#FFFFFF' : '#707B81' },
                  ]}>{item}</Text>
                </TouchableOpacity>
              ))
            }
          </View>
          <Text style={[styles.txtLabel, { marginTop: 15, marginBottom: 15 }]}>Size</Text>

          <View style={{ flexDirection: 'row' }}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {
                sizes.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => clickSize(item)}
                    style={[
                      styles.borderSize,
                      { backgroundColor: selectedSize === item ? '#5B9EE1' : '#E9EDEF', marginRight: 15 },
                    ]}
                  >
                    <Text style={[
                      styles.txtCategory,
                      { color: selectedSize === item ? '#FFFFFF' : '#707B81' },
                    ]}>VN {item}</Text>
                  </TouchableOpacity>
                ))
              }
            </ScrollView>
          </View>

          <Text style={[styles.txtLabel, { marginTop: 15, }]}>Price</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
            <View style={{ margin: 20, borderRadius: 20, width: 150, backgroundColor: '#E9EDEF' }}>
              <Picker
                mode='dropdown'
                selectedValue={min}
                onValueChange={(itemValue, itemIndex) =>
                  setmin(itemValue)
                }>
                <Picker.Item label="100$" value="100" />
                <Picker.Item label="200$" value="200" />
                <Picker.Item label="300$" value="300" />
                <Picker.Item label="400$" value="400" />
                <Picker.Item label="500$" value="500" />
              </Picker>
            </View>
            <View style={{ margin: 20, borderRadius: 20, width: 150, backgroundColor: '#E9EDEF' }}>
              <Picker
                mode='dropdown'
                selectedValue={max}
                onValueChange={(itemValue, itemIndex) =>
                  setmax(itemValue)
                }>
                <Picker.Item label="600$" value="600" />
                <Picker.Item label="700$" value="700" />
                <Picker.Item label="800$" value="800" />
                <Picker.Item label="900$" value="900" />
                <Picker.Item label="1000$" value="1000" />
              </Picker>
            </View>
          </View>
          <TouchableOpacity style={styles.btnLoginBorder} onPress={handleClickApply}>
            <Text style={styles.btnLoginLabel}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  type: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  brandContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 25,
  },
  selectedBrand: {
    backgroundColor: '#5b9ee1',
  },
  image: {
    width: 44,
    height: 44,
  },
  text: {
    fontFamily: 'Airbnb-Cereal-App-Medium',
    marginHorizontal: 4,
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center'
  },
  btnLoginLabel: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: '#ffffff',
    fontFamily: 'Airbnb-Cereal-App-Bold'
  },
  btnLoginBorder: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#5B9EE1',
    height: 60,
    paddingVertical: 13,
    paddingHorizontal: 24,
  },
  txtLabel: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    color: '#1A2530'
  },
  modalView: {
    backgroundColor: '#ffffff',
    height: 503,
    borderTopLeftRadius: 25,

    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute', // Use absolute positioning
    bottom: 0, // Anchor to the bottom of the container
    left: 0, // Align to the left edge of the container
    right: 0, // Stretch to the right edge of the container
  },
  borderSize: {
    width: 80,
    height: 48,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  txtCategory: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: '#707B81'
  },
  borderCategory: {
    width: 102,
    height: 48,
    padding: 5,
    backgroundColor: '#E9EDEF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
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
    width: 300,
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
    position: 'relative'
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#5b9ee1',
    height: 50,
    paddingHorizontal: 10
  },
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    // paddingVertical: 20,
    backgroundColor: '#f8f9fa',

  },
})
