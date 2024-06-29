import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';

const PaymentOptions = () => {
  const [selectedPayment, setSelectedPayment] = useState('Paypal');

  const paymentMethods = [
    {
      id: 'Paypal',
      name: 'Paypal Card',
      image: require('../media/icon_button/paypal.png'),
      details: '**** **** 0696 4629',
    },
    {
      id: 'MoMo',
      name: 'MoMo Wallet',
      image: require('../media/icon_button/paypal.png'), // Thay thế đường dẫn đúng tới hình ảnh MoMo
      details: '**** **** 1234 5678',
    },
    {
      id: 'COD',
      name: 'Cash on Delivery',
      image: require('../media/icon_button/paypal.png'), // Thay thế đường dẫn đúng tới hình ảnh COD
      details: 'Pay on delivery',
    },
  ];

  const renderPaymentMethod = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.viewPaymentMethod,
        selectedPayment === item.id && styles.selectedPaymentMethod,
      ]}
      onPress={() => setSelectedPayment(item.id)}
    >
      <Image source={item.image} style={styles.paymentImage} />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.paymentName}>{item.name}</Text>
        <Text style={styles.paymentDetails}>{item.details}</Text>
      </View>
      <TouchableOpacity style={{ marginLeft: 'auto' }}>
        <Image style={styles.btnEdit} source={require('../media/icon_button/show.png')} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethod}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  viewPaymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedPaymentMethod: {
    borderColor: '#007bff',
    backgroundColor: '#e7f0ff',
  },
  paymentImage: {
    width: 40,
    height: 40,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentDetails: {
    fontSize: 14,
    color: '#555',
  },
  btnEdit: {
    width: 24,
    height: 24,
  },
});

export default PaymentOptions;
