import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import Login from '../components/Login'
import Register from '../components/Register'
import Welcome from '../components/Welcome'
import { AppContext } from './AppContext';
import Home from '../components/Home';
import Cart from '../components/Cart';
import Favourite from '../components/Favourite';
import Profile from '../components/Profile';
import DetailShoe from '../components/DetailShoe';
import ForgotPassword from '../components/ForgotPassword';
import Onboard1 from '../components/Onboard1';
import Onboard2 from '../components/Onboard2';
import Onboard3 from '../components/Onboard3';
import Checkout from '../components/Checkout';

// welcome, login, register stack
const Stack = createNativeStackNavigator()
const User = () => {
    return (
        <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Onboard1" component={Onboard1} />
            <Stack.Screen name="Onboard2" component={Onboard2} />
            <Stack.Screen name="Onboard3" component={Onboard3} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
    )
}

// const Product = () => {
//     return (
//         <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Home" component={Home} />
//             <Stack.Screen name="DetailShoe" component={DetailShoe} />
//         </Stack.Navigator>
//     )
// }
const Product = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
        if (routeName === "DetailShoe" || routeName === "Cart" || routeName === "Checkout") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    bottom: 0,
                    right: 0,
                    left: 0,
                }
            });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DetailShoe" component={DetailShoe} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Checkout" component={Checkout} />
        </Stack.Navigator>
    );
};

const Tab = createBottomTabNavigator()
//home, cart, bill, profile
const Main = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    bottom: 0,
                    right: 0,
                    left: 0,
                },
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    let source
                    if (route.name === 'Product') {
                        if (source = focused) {
                            return <Image source={require('../media/icon_bottom_tab/home_active.png')} />
                        } else {
                            return <Image source={require('../media/icon_bottom_tab/home.png')} />
                        }

                    } //else if (route.name === 'Cart') {
                    //     if (source = focused) {
                    //         return <Image source={require('../media/icon_bottom_tab/cart_active.png')} />
                    //     } else {
                    //         return <Image source={require('../media/icon_bottom_tab/cart.png')} />
                    //     }
                    // }
                    else if (route.name === 'Favourite') {
                        if (source = focused) {
                            return <Image source={require('../media/icon_bottom_tab/heart_active.png')} />
                        } else {
                            return <Image source={require('../media/icon_bottom_tab/heart.png')} />
                        }
                    }
                    else if (route.name === 'Profile') {
                        if (source = focused) {
                            return <Image source={require('../media/icon_bottom_tab/profile_active.png')} />
                        } else {
                            return <Image source={require('../media/icon_bottom_tab/profile.png')} />
                        }
                    }
                },
                tabBarShowLabel: false
            })}
        >
            <Tab.Screen name="Product" component={Product} />
            {/* <Tab.Screen name="Cart" component={Cart} /> */}
            <Tab.Screen name="Favourite" component={Favourite} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
}

const AppNavigator = () => {
    const { isLogin } = useContext(AppContext)
    return (
        <>
            {
                isLogin == false ? <User /> : <Main />
            }
        </>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})