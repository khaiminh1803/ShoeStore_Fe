import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, ToastAndroid, ActivityIndicator, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AxiosInstance from '../utils/AxiosIntance'
import { AppContext } from '../utils/AppContext';
import { formatCurrency } from '../utils/GlobalFunction'


const DetailShoe = (props) => {
  const { navigation, route } = props
  const { params } = route
  const [name, setname] = useState("")
  const [price, setprice] = useState("")
  const [description, setdescription] = useState("")
  const [imageUrl, setimageUrl] = useState([])
  const [brand, setbrand] = useState({})
  const [category, setcategory] = useState({})
  const [sizes, setsizes] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [imgActive, setimgActive] = useState(0)
  const { infoUser, setdataCart } = useContext(AppContext)
  const [selectedSize, setselectedSize] = useState(null)
 
  useEffect(() => {
    const getDetail = async () => {
      console.log(params.id);
      const response = await AxiosInstance().get("/products/get-all/" + params.id + "/detail")
      console.log(response)
      if (response.result == true) {
        // lấy dữ liệu thành công
        setname(response.productDetail.name)
        setprice(response.productDetail.price)
        setdescription(response.productDetail.description)
        setcategory(response.productDetail.category)
        setimageUrl(response.productDetail.image)
        setsizes(response.productDetail.sizes)
        setisLoading(false)
      } else {
        ToastAndroid.show("Lấy dữ liệu thất bại", ToastAndroid.SHORT)
      }
    }
    getDetail()
    return () => {

    }
  }, [])

  const clickSize = (size) => {
    console.log("Selected size:", size);
    setselectedSize(size)
  }


  const addToCart = async () => {
    try {
      // http://localhost:3000/api/products/cart/addToCart
      const response = await AxiosInstance().post("/products/cart/addToCart", { userId: infoUser._id, productId: params.id, sizeSelected: selectedSize })
      console.log(response);
      if (response.result == true) {
        ToastAndroid.show("Thêm sản phẩm thành công", ToastAndroid.SHORT);
        setdataCart(response.cartItem.items)
      } else {
        ToastAndroid.show("Thêm sản phẩm thất bại", ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log(e)
    }

  }

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
      if (slide != imgActive) {
        setimgActive(slide)
      }
    }
  }

  const nvgCart = () => {
    navigation.navigate('Cart')
  }

  return (
    isLoading == true ?
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#fff00' />
        <Text>Loading....</Text>
      </View>
      :
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
            <Image source={require('../media/icon_button/arrow.png')}
              style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
          <Text style={{
            textAlign: 'center', fontFamily: 'Airbnb Cereal App'
            , fontSize: 20, 
            color: 'white', fontWeight: 'bold'
          }}>Men's Shoes</Text>
          <Pressable onPress={nvgCart} >
            <Image source={require('../media/icon_button/bag.png')}
              style={{ width: 30, height: 30 }} />
          </Pressable>
        </View>
        <View style={styles.wrap}>
          <ScrollView
            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
          >
            {
              imageUrl.map((e, index) =>
                <Image
                  key={e}
                  style={styles.wrap}
                  source={{ uri: e }}
                />
              )
            }
          </ScrollView>
        </View>
        <View style={styles.wrapDot}>
          {
            imageUrl.map((e, index) =>
              <Text
                key={e}
                style={imgActive == index ? styles.dotActive : styles.dot}
              >●</Text>
            )
          }
        </View>
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.category}>BEST SELLER</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{formatCurrency(price)}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <Text style={styles.gallery}>Gallery</Text>
        <View style={styles.viewGallery}>
          {/* <Image style={styles.galleryImage} source={{ uri: imageUrl[1] }} />
          <Image style={styles.galleryImage} source={{ uri: imageUrl[2] }} />
          <Image style={styles.galleryImage} source={{ uri: imageUrl[3] }} /> */}

          {
            imageUrl.map((item, index) => (
              <Image
                key={item}
                style={styles.galleryImage}
                source={{ uri: item }}

              />
            ))
          }
        </View>
        <Text style={[styles.gallery, { marginTop: 20 }]}>Size</Text>
        <View style={styles.viewSize}>
          {/* <Text style={styles.size}>{sizes[0].size}</Text>
          <Text style={styles.size}>{sizes[1].size}</Text>
          <Text style={styles.size}>{sizes[2].size}</Text>
          <Text style={styles.size}>{sizes[3].size}</Text>
          <Text style={styles.size}>{sizes[4].size}</Text> */}
          {
            sizes.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => clickSize(item.size)}
                style={[
                  styles.size,
                  selectedSize && selectedSize === item.size && styles.sizeActive
                ]}
              >
                <Text style={[
                  styles.txtSize,
                  selectedSize && selectedSize === item.size && styles.txtSizeActive
                ]}>{item.size}</Text>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerPrice}>Price</Text>
            <Text style={styles.price}>{formatCurrency(price)}</Text>
          </View>
          <Pressable style={styles.btnLoginBorder} onPress={addToCart}>
            <Text style={styles.btnLoginLabel}>Add to cart</Text>
          </Pressable>
        </View>


      </View>
  )
}

export default DetailShoe

const styles = StyleSheet.create({
  dot: {
    margin: 3,
    color: 'white'
  },
  dotActive: {
    margin: 3,
    color: 'black'
  },
  wrapDot: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    top: 250,

  },
  wrap: {
    marginTop: 10,
    width: 350,
    height: 220,
    alignSelf: 'center',
    borderRadius: 10,
    // resizeMode: 'cover'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnLoginLabel: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.12,
    color: '#fff',
    fontFamily: 'Airbnb-Cereal-App-Medium'
  },
  btnLoginBorder: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#5b9ee1',
    height: 60,
    paddingVertical: 13,
    paddingHorizontal: 24,
    width: 167,
    height: 54
  },
  footerPrice: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: 'Airbnb-Cereal-App-Medium',
    color: '#707B81'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30, 
    paddingHorizontal: 16
  },
  sizeActive: {
    backgroundColor: '#5b9ee1',
    color: 'yellow',
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  size: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center'

  },
  txtSizeActive: {
    fontFamily: 'Airbnb-Cereal-App-Medium',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
  },
  txtSize: {
    fontFamily: 'Airbnb-Cereal-App-Medium',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: '#707B81',
  },
  viewSize: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 16
  },
  galleryImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginEnd: 20
  },
  viewGallery: {
    flexDirection: 'row',
    marginTop: 14,
    paddingHorizontal: 16
  },
  gallery: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 22,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Medium',
    marginTop: 10,
    marginLeft: 16
  },
  description: {
    width: 310,
    height: 66,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: '#707B81',
    fontFamily: 'Airbnb-Cereal-App-Medium',
    marginTop: 5,
    overflow: 'hidden',
    // whiteSpace: 'nowrap',
    // textOverflow: 'ellipsis',
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Medium',
    marginTop: 10

  },
  name: {
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 28,
    color: '#1A2530',
    fontFamily: 'Airbnb-Cereal-App-Medium',
    marginTop: 8
  },
  category: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    color: '#5B9EE1',
    fontFamily: 'Airbnb-Cereal-App-Medium',
    marginTop: 30
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
    // paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
})