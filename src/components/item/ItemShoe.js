import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { formatCurrency } from '../../utils/GlobalFunction'



const ItemShoe = (props) => {
    const { dulieu, navigation, clickHeart } = props;
    const clickItem = () => {
        navigation.navigate('DetailShoe', { id: dulieu?._id })
    }
    return (
        <TouchableOpacity onPress={clickItem}>
            <View style={styles.container}>
                <Image source={{ uri: dulieu?.image[0] }}
                    style={styles.imgShoe} />
                <View style={styles.detailShoe}>
                    <Text style={styles.sex}>{dulieu?.category.name}</Text>
                    <Text numberOfLines={1} style={styles.name}>{dulieu?.name}</Text>
                    <View style={styles.viewRow}>
                        <Text style={styles.name}>{formatCurrency(dulieu?.price)}</Text>
                        <TouchableOpacity onPress={() => clickHeart(dulieu._id)}>
                            <Image source={require('../../media/icon_button/heartblack.png')} style={styles.imgHeart} />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ItemShoe

const styles = StyleSheet.create({
    imgHeart: {
        width: 28,
        height: 28
    },
    viewRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7
    },
    name: {
        fontFamily: 'Airbnb-Cereal-App-Medium',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A2530',
        fontWeight: '500',

        overflow: 'hidden'
    },
    sex: {
        fontFamily: 'Airbnb-Cereal-App',
        fontSize: 12,
        color: '#5B9EE1',
        lineHeight: 16,
        fontWeight: '400',
        marginBottom: 5
    },
    detailShoe: {
        padding: 5
    },
    imgShoe: {
        width: 140,
        height: 90,
        borderRadius: 16,
        alignSelf: 'center'
    },
    container: {
        padding: 5,
        width: 156,
        height: 185,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        marginBottom: 10
    }
})