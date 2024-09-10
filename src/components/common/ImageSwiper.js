import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const images = [
    'https://thesneakerhouse.com/wp-content/uploads/2023/04/ADIDAS-ULTRABOOST-LIGHT-SHOES-1-768x768.jpg',
    'https://thesneakerhouse.com/wp-content/uploads/2023/07/ULTRABOOST-LIGHT-RUNNING-SHOES-2-768x768.jpg',
    'https://thesneakerhouse.com/wp-content/uploads/2023/07/PUREBOOST-23-W-19-768x768.jpg',
    'https://thesneakerhouse.com/wp-content/uploads/2023/08/ASTIR-SN-SHOES-8-768x768.jpg',
    'https://thesneakerhouse.com/wp-content/uploads/2023/08/ASTIR-HER-VEGAN-SHOES-2-768x768.jpg',
];

const ImageSwiper = () => {
    return (
        <View>
            <Swiper
                style={styles.swiper}
                autoplay={true}
                autoplayTimeout={2}
                showsPagination={false}
                paginationStyle={styles.pagination}
                loop={true}>
                {images.map((image, index) => (
                    <View key={index} style={styles.slide}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                ))}
            </Swiper>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    swiper: {
        height: 200,
      
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    pagination: {
        bottom: 10,
    },
});

export default ImageSwiper;
