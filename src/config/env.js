const { VITE_PREFIX, VITE_TITLE, VITE_LOCALE, VITE_API_BASE_URL, APP_API_ACESS_KEY, APP_MAP_BOX_TOKEN } = import.meta.env;

export default class ENV {
  static get APP_PREFIX() {
    return VITE_PREFIX || 'speediz';
  }
  static get APP_TITLE() {
    return VITE_TITLE || 'speediz';
  }
  static get APP_LOCALE() {
    return VITE_LOCALE || 'en';
  }
  static get APP_API_URL() {
    return VITE_API_BASE_URL;
  }
  static get APP_API_ACESS_KEY() {
    return APP_API_ACESS_KEY;
  }
  static get APP_MAP_BOX_TOKEN() {
    return APP_MAP_BOX_TOKEN;
  }
}
