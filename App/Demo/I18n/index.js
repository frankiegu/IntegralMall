import i18n from 'react-native-i18n';

import en from './en/index';

import zh from './zh/index';

i18n.defaultLocale = 'en';

i18n.fallbacks = true;

i18n.translations = {

    en,

    zh,

};

export {i18n};
