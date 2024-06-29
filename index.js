/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// import fonts
import './src/fonts/Airbnb-Cereal-App-Black.ttf'
import './src/fonts/Airbnb-Cereal-App-Bold.ttf'
import './src/fonts/Airbnb-Cereal-App-Book.ttf'
import './src/fonts/Airbnb-Cereal-App-ExtraBold.ttf'
import './src/fonts/Airbnb-Cereal-App-Light.ttf'
import './src/fonts/Airbnb-Cereal-App-Medium.ttf'
import './src/fonts/Airbnb-Plus-Script-App-Regular.ttf'

AppRegistry.registerComponent(appName, () => App);
