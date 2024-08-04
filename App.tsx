/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from './src/components/Register';
import Login from './src/components/Login';
import Welcome from './src/components/Welcome';
import Home from './src/components/Home'
import Cart from './src/components/Cart';
import Favourite from './src/components/Favourite';
import Profile from './src/components/Profile';
import { AppContextProvider } from './src/utils/AppContext';
import AppNavigator from './src/utils/AppNavigator';
import ItemFavourite from './src/components/item/ItemFavourite';
import ForgotPassword from './src/components/ForgotPassword';
import Onboard1 from './src/components/Onboard1';
import Onboard2 from './src/components/Onboard2';
import Onboard3 from './src/components/Onboard3';
import DetailShoe from './src/components/DetailShoe';
import ItemCart from './src/components/item/ItemCart';
import PaymentOptions from './src/components/PaymentOptions';
import ItemCheckout from './src/components/item/ItemCheckout';
import Setting from './src/components/Setting';
import ModelTest from './src/components/ModelTest';
import ItemOrder from './src/components/item/ItemOrder';
import DetailOrder from './src/components/DetailOrder';
import ItemVoucher from './src/components/item/ItemVoucher';
import Verifycation from './src/components/Verifycation';



const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function App(): React.JSX.Element {


  return (
    <AppContextProvider>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content" // or "dark-content"
          backgroundColor="#5b9ee1" // Change this color as you like
        />
        <AppNavigator />
      </NavigationContainer>
    </AppContextProvider>
  
    // <ItemVoucher/>
    // <DetailOrder/>
    // <ModelTest/>
    // <ItemOrder/>
    // <PaymentOptions/>
    // <NavigationContainer>
    //   <Tab.Navigator
    //     screenOptions={({ route }) => ({
    //       tabBarStyle: {
    //         height: 60,
    //         position: 'absolute',
    //         borderRadius: 20,
    //         bottom: 10,
    //         left: 5,
    //         right: 5
    //       },
    //       headerShown: false,
    //       tabBarIcon: ({ focused }) => {
    //         let source
    //         if (route.name === 'Home') {
    //           if (source = focused) {
    //             return <Image source={require('./src/media/icon_bottom_tab/home_active.png')} />
    //           } else {
    //             return <Image source={require('./src/media/icon_bottom_tab/home.png')} />
    //           }

    //         } else if (route.name === 'Cart') {
    //           if (source = focused) {
    //             return <Image source={require('./src/media/icon_bottom_tab/cart_active.png')} />
    //           } else {
    //             return <Image source={require('./src/media/icon_bottom_tab/cart.png')} />
    //           }
    //         }
    //         else if (route.name === 'Favorite') {
    //           if (source = focused) {
    //             return <Image source={require('./src/media/icon_bottom_tab/heart_active.png')} />
    //           } else {
    //             return <Image source={require('./src/media/icon_bottom_tab/heart.png')} />
    //           }
    //         }
    //         else if (route.name === 'Profile') {
    //           if (source = focused) {
    //             return <Image source={require('./src/media/icon_bottom_tab/profile_active.png')} />
    //           } else {
    //             return <Image source={require('./src/media/icon_bottom_tab/profile.png')} />
    //           }
    //         }
    //       },
    //       tabBarShowLabel: false
    //     })}
    //   >
    //     <Tab.Screen name="Home" component={News} />
    //     <Tab.Screen name="Cart" component={Cart} />
    //     <Tab.Screen name="Favorite" component={Favorite} />
    //     <Tab.Screen name="Profile" component={Profile} />

    //   </Tab.Navigator>
    // </NavigationContainer>

  )
};

export default App;
