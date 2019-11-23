import I18n, {
  getLanguages
} from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info'
import DataRepository from './data/DataRepository'
import en from './en'
import zh from './zh'

import {
  AsyncStorage
} from 'react-native';

AsyncStorage.getItem('switch')
.then((response) => {
  console.log(JSON.parse(response))
  JSON.parse(response) == null || JSON.parse(response) == false ? I18n.locale = 'zh' : I18n.locale = 'en';
})
.catch((error) => {
  console.log(error);
})
.done();

// I18n.locale = 'zh';
I18n.defaultLocale = 'zh';
I18n.fallbacks = true;
I18n.translations = {
  zh,
  en,
};


// I18n.localeLanguage = () => {
//   new DataRepository().fetchLocalRepository('localLanguage')
//     .then((res) => {
//       I18n.locale = res;
//     })
//     .catch((error) => {
//       I18n.locale = DeviceInfo.getDeviceLocale();
//     });
//   return I18n.locale;
// };

export {
  I18n,
  getLanguages
};
