import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const test = () => {
    const category = ["Men", "Women", 'Kid']
    const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"]

    const [selectedCategory, setselectedCategory] = useState(second)
    const [selectedSize, setselectedSize] = useState(null)
    const clickCategory = (categoryName) => {
        console.log("Selected size:", categoryName);
        setselectedCategory(categoryName)
    }
    const clickSize = (size) => {
        console.log("Selected size:", size);
        setselectedSize(size)
    }
    return (
        <View style={styles.container}>
            {
                category.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => clickCategory(item)}
                        style={[
                            styles.borderCategory,
                            selectedCategory && selectedCategory === item && styles.borderCategoryActive
                        ]}
                    >
                        <Text style={[
                            styles.txtCategory,
                            selectedCategory && selectedCategory === item && styles.txtCategoryActive
                        ]}>{item}</Text>
                    </TouchableOpacity>
                ))
            }

            {
                sizes.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => clickSize(item)}
                        style={[
                            styles.size,
                            selectedSize && selectedSize === item && styles.sizeActive
                        ]}
                    >
                        <Text style={[
                            styles.txtSize,
                            selectedSize && selectedSize === item && styles.txtSizeActive
                        ]}>{item}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>


    )
}

export default test

const styles = StyleSheet.create({
    txtCategoryActive: {},
    txtCategory: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: '500'
    },
    borderCategoryActive: {
        width: 102,
        height: 48,
        padding: 5,
        backgroundColor: '#5B9EE1'
    },
    borderCategory: {
        width: 102,
        height: 48,
        padding: 5,
        backgroundColor: '#E9EDEF'
    },
    container: {
        flex: 1,
        padding: 20
    }
})