import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Animated, {useAnimatedStyle} from 'react-native-reanimated'
const WIDTH = Dimensions.get('window').width - 40

const InputRange = ({ min, max, steps, onValueChange }) => {

    const styleLine = useAnimatedStyle(() => {
        return {
            backgroundColor: 'orange',
            height: 3,
            marginTop: -3,
            borderRadius: 3,
            width: 100
        }
    })
    return (
        <View>
            <View style={styles.rangeContainer}>
                <View style={styles.labelsContainer}>
                    <Text style={styles.label}>{min}</Text>
                    <Text style={styles.label}>{max}</Text>
                </View>
                <View style={styles.track}></View>
                <Animated.View style={styleLine}/>
            </View>
        </View>
    )
}

export default InputRange

const styles = StyleSheet.create({
   
    rangeContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#fff',
        borderColor: '#cccdb2',
        borderBottomWidth: 1,
        // backgroundColor: 'red'
    },
    labelsContainer: {
        width: WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 18,
    },
    label: {
        color: '#333',
        fontSize: 12
    },
    track: {
        height: 3,
        backgroundColor: '#cccdb2',
        borderRadius: 3
    }
})