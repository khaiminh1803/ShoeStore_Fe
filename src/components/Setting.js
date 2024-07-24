import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../utils/AppContext'


const Setting = (props) => {
    const { navigation } = props
    const { infoUser} = useContext(AppContext)

    return (
        <View style={styles.container}>
            {/* <View style={styles.head}>
                <Image
                    source={require('../media/icon_button/back.png')}
                    style={styles.backIcon}
                />
                <Text style={styles.title}>Setting</Text>
                <View style={styles.backIcon}></View>
            </View> */}
            <View style={styles.infoUser}>
                <View style={styles.infoImg}>
                    <Image
                        source={{ uri: infoUser.avatar }}
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.infoText}>
                    <Text style={styles.name}>
                        {infoUser.name}
                    </Text>
                    <Text style={styles.email}>
                        {infoUser.email}
                    </Text>
                    <Text style={styles.adress}>
                        {infoUser.address}

                    </Text>
                </View>
            </View>
            <View style={styles.button}>
                <View style={styles.module1}>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/alert.png')}
                            style={styles.btnImg}
                        />
                        <Text>Alerts</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.module}>
                    <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('Profile') }}>
                        <Image
                            source={require('../media/icon_button/editprofile.png')}
                            style={styles.btnImg}
                        />
                        <Text>Edit Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/paymentdata.png')}
                            style={styles.btnImg}
                        />
                        <Text>Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => {navigation.navigate('History')}}>
                        <Image
                            source={require('../media/icon_button/contact.png')}
                            style={styles.btnImg}
                        />
                        <Text>History</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.module}>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/privacy.png')}
                            style={styles.btnImg}
                        />
                        <Text>Privacy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/safety.png')}
                            style={styles.btnImg}
                        />
                        <Text>Safety</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/authen.png')}
                            style={styles.btnImg}
                        />
                        <Text>Two-Factor Authentication</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.module}>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/theme.png')}
                            style={styles.btnImg}
                        />
                        <Text>Theme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/switchAcc.png')}
                            style={styles.btnImg}
                        />
                        <Text>Switch Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/addacc.png')}
                            style={styles.btnImg}
                        />
                        <Text>Add New Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/help.png')}
                            style={styles.btnImg}
                        />
                        <Text>Help</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        <Image
                            source={require('../media/icon_button/logout.png')}
                            style={styles.btnImg}
                        />
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <View>

                </View>
            </View>
        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 19,
        paddingTop: 10
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {

        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        color: '#1A2530'
    },
    backIcon: {
        width: 44,
        height: 44
    },
    infoUser: {
        marginTop: 20,
        flexDirection: 'row',
        marginBottom: 30
    },
    infoText: {
        flexDirection: 'column',
        flex: 1,
        marginLeft: 20
    },
    avatar: {
        backgroundColor: '#000000',
        borderRadius: 180,
        height: 80,
        width: 80
    },
    name: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 28,
        color: '#1A2530',
        marginBottom: 8
    },
    button: {
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        height: 40,
        paddingLeft: 10,
        alignItems: 'center'
    },
    btnImg: {
        width: 30,
        height: 30,
        marginRight: 20
    },
    module: {
        marginTop: 30,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    module1: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    }
})