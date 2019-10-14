/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import Root from './App/Demo/StickyHeader/StickyHeader';
// import Root from './Main';
import Root from './App/Demo/Navigation/Root';

AppRegistry.registerComponent(appName, () => Root);
