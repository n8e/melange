import { getCookie, setCookie, invalidateCookie } from './authUtils';

export function viewToken() {
  return getCookie('token');
}

export function getEmail() {
  return getCookie('email');
}

export function storeCredentials({ token, email }) {
  setCookie('email', email, 1);
  return setCookie('token', token, 1);
}

export function removeAuthToken() {
  invalidateCookie('email');
  return invalidateCookie('token');
}
