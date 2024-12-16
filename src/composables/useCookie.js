import { useCookies } from 'vue3-cookies';
import ENV from '@/config/env';

export default function useCookie() {
  const { cookies } = useCookies();

  // Use the APP_PREFIX from your ENV configuration or set a default prefix
  const cookiePrefix = ENV.APP_PREFIX || 'speediz';

  const getCookie = (name) => {
    return cookies.get(`${cookiePrefix}${name}`);
  };

  const setCookie = (name, value, options = {}) => {
    cookies.set(`${cookiePrefix}${name}`, value, options);
  };

  const removeCookie = (name) => {
    cookies.remove(`${cookiePrefix}${name}`);
  };

  return {
    getCookie,
    setCookie,
    removeCookie,
  };
}
