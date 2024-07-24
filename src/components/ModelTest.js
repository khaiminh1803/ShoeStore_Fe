import { StyleSheet, Text, View, TouchableOpacity, Pressable, ScrollView, Modal, TextInput, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Picker } from '@react-native-picker/picker';
const Item = Picker.Item;
const ModelTest = () => {
    const payment = ["Momo", "Tiền mặt"]
    const sizes = ["36", "37", "38", "39", "40", "41", "42"]

    const [selectedCategory, setselectedCategory] = useState(null)
    const [selectedSize, setselectedSize] = useState(null)
    const [paymentMethod, setpaymentMethod] = useState(null)
    const [min, setmin] = useState(null)
    const [max, setmax] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);

    
    const clickPayment = (paymentname) => {
        console.log("Selected payment:", paymentname);
        console.log("clickne");
        setpaymentMethod(paymentname)
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
    }
    const handleClickApply = () => {
        setModalVisible(false)
        console.log(selectedCategory);
        console.log(selectedSize);
        console.log(min);
        console.log(max);
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {
              payment.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => clickPayment(item)}
                  style={[
                    styles.borderCategory,
                    { backgroundColor: paymentMethod === item ? '#5B9EE1' : '#E9EDEF' },
                  ]}
                >
                  <Text style={[
                    styles.txtCategory,
                    { color: paymentMethod === item ? '#FFFFFF' : '#707B81' },
                  ]}>{item}</Text>
                </TouchableOpacity>
              ))
            }
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
                            payment.map((item, index) => (
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

                    <Text style={[styles.txtLabel, { marginTop: 15, marginBottom: 15 }]}>Price</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput placeholder='min' style={{ width: 150, backgroundColor: '#E9EDEF', textAlign: 'center', borderRadius: 10 }} onChangeText={(text) => { setmin(text) }} />
                        <TextInput placeholder='max' style={{ width: 150, backgroundColor: '#E9EDEF', textAlign: 'center', borderRadius: 10 }} onChangeText={(text) => { setmax(text) }} />
                    </View>
                    <TouchableOpacity style={styles.btnLoginBorder} onPress={handleClickApply}>
                        <Text style={styles.btnLoginLabel}>Apply</Text>
                    </TouchableOpacity>
                    {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Hide Modal</Text>
                    </Pressable> */}
                </View>

            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
        </View>
    )
}

export default ModelTest

const styles = StyleSheet.create({
    btnLoginLabel: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '500',
        color: '#ffffff',
        fontFamily: 'Airbnb-Cereal-App-Bold'
    },
    btnLoginBorder: {
        marginTop: 30,
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
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
        width: 180,
        height: 48,
        padding: 5,
        backgroundColor: '#E9EDEF',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 25
    },
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa'
    }
})