import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ip = '10.82.24.230';

const customAxios = (contentType = 'application/json') => {
    const axiosInstance = axios.create({
        // baseURL: 'https://fpoly-hcm.herokuapp.com/api'
        //  baseURL: 'http://172.16.123.4:3000/api/'
        //  baseURL: 'http://192.168.1.27:3000/api/'
        baseURL: `http://${ip}:3000/api`
        // baseURL: 'http://192.168.1.13:3000/api/'
        // baseURL: 'http://192.168.1.22:3000/api/'
        // baseURL: 'http://192.168.1.6:3000/api/'


    });
    axiosInstance.interceptors.request.use( 
        async config => {
            const token = await AsyncStorage.getItem('token');
            config.headers = {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': contentType
            }
            return config;
        },
        err => Promise.reject(err)
    );
    axiosInstance.interceptors.response.use(
        res => res.data,
        err => Promise.reject(err)
    ); // callback
    return axiosInstance;
}

export default customAxios;