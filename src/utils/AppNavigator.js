import { StyleSheet, Text, View, Image, StatusBar } from 'react-native'
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
import Setting from '../components/Setting';
import Notification from '../components/Notification';
import DetailOrder from '../components/DetailOrder';
import History from '../components/History';
import Voucher from '../components/Voucher';
import Verifycation from '../components/Verifycation';
import ChangePassword from '../components/ChangePassword';
import ResetPassword from '../components/ResetPassword';
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
            <Stack.Screen name="Verifycation" component={Verifycation} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
        </Stack.Navigator>
    )
}
const Product = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
        if (routeName === "DetailShoe" || routeName === "Cart" || routeName === "Checkout" || routeName === "Voucher") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
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
            <Stack.Screen name="Voucher" component={Voucher} />
            <Stack.Screen name="Favourite" component={Favourite} />
        </Stack.Navigator>
    );
};



const Remaining = ({ navigation, route }) => {
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "Setting";
        if (routeName === "Profile" || routeName === "History" || routeName === "DetailOrder" || routeName === "ChangePassword") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                }
            });
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="DetailOrder" component={DetailOrder} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
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
                    bottom: 0,
                    right: 0,
                    left: 0,
                },
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    let source
                    if (route.name === 'Product') {
                        if (source = focused) {
                            return <Image source={require('../media/icon_bottom_tab/home_active.png')} style={{ width: 24, height: 24 }} />
                        } else {
                            return <Image source={require('../media/icon_bottom_tab/home.png')} style={{ width: 24, height: 24 }} />
                        }
                    }
                    else if (route.name === 'Favourite') {
                        if (source = focused) {
                            return <Image source={require('../media/icon_bottom_tab/heart_active.png')} style={{ width: 24, height: 24 }} />
                        } else {
                            return <Image source={require('../media/icon_bottom_tab/heart.png')} style={{ width: 24, height: 24 }} />
                        }
                    }
                    else if (route.name === 'Remaining') {
                        if (source = focused) {
                            return <Image source={require('../media/icon_bottom_tab/profile_active.png')} style={{ width: 24, height: 24 }} />
                        } else {
                            return <Image source={require('../media/icon_bottom_tab/profile.png')} style={{ width: 24, height: 24 }} />
                        }
                    }
                },
                tabBarShowLabel: false
            })}
        >
            <Tab.Screen name="Product" component={Product} />
            <Tab.Screen name="Favourite" component={Favourite} />
            <Tab.Screen name="Remaining" component={Remaining} />
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