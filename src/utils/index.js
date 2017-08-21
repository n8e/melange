import { getCookie, setCookie, invalidateCookie } from './authUtils';

export function viewToken() {
  return getCookie('token');
}

export function storeToken(token) {
  return setCookie('token', token, 1);
}

export function removeAuthToken() {
  return invalidateCookie('token');
}
