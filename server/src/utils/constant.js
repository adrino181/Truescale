 const DESKTOP_SCREEN_WIDTH = 1920;
 const LAPTOP_SCREEN_WIDTH = 1024;
 const MOBILE_SCREEN_WIDTH = 479;

 const DESKTOP_OS = [
    'BeOS',
    'Chrome OS',
    'Linux',
    'macOS',
    'Open BSD',
    'OS/2',
    'QNX',
    'Sun OS',
    'Windows 10',
    'Windows 2000',
    'Windows 3.11',
    'Windows 7',
    'Windows 8',
    'Windows 8.1',
    'Windows 95',
    'Windows 98',
    'Windows ME',
    'Windows Server 2003',
    'Windows Vista',
    'Windows XP',
  ];
  
   const MOBILE_OS = ['Amazon OS', 'Android OS', 'BlackBerry OS', 'iOS', 'Windows Mobile'];
  
   const BROWSERS = {
    aol: 'AOL',
    edge: 'Edge',
    'edge-ios': 'Edge (iOS)',
    yandexbrowser: 'Yandex',
    kakaotalk: 'KaKaoTalk',
    samsung: 'Samsung',
    silk: 'Silk',
    miui: 'MIUI',
    beaker: 'Beaker',
    'edge-chromium': 'Edge (Chromium)',
    chrome: 'Chrome',
    'chromium-webview': 'Chrome (webview)',
    phantomjs: 'PhantomJS',
    crios: 'Chrome (iOS)',
    firefox: 'Firefox',
    fxios: 'Firefox (iOS)',
    'opera-mini': 'Opera Mini',
    opera: 'Opera',
    ie: 'IE',
    bb10: 'BlackBerry 10',
    android: 'Android',
    ios: 'iOS',
    safari: 'Safari',
    facebook: 'Facebook',
    instagram: 'Instagram',
    'ios-webview': 'iOS (webview)',
    searchbot: 'Searchbot',
  };


  const EVENT_TYPE = {
    pageView: 1,
    customEvent: 2,
  } ;
  
   const EVENT_DATA_TYPE = {
    string: 1,
    number: 2,
    boolean: 3,
    date: 4,
    array: 5,
  } ;
  const URL_LENGTH = 500;
  const EVENT_NAME_LENGTH = 50;

  module.exports = {
      BROWSERS,
      MOBILE_SCREEN_WIDTH,
      MOBILE_OS,
      DESKTOP_OS,
      DESKTOP_SCREEN_WIDTH,
      LAPTOP_SCREEN_WIDTH,
      URL_LENGTH,
      EVENT_TYPE,
      EVENT_NAME_LENGTH,
      EVENT_DATA_TYPE
  }
