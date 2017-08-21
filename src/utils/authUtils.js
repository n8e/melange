const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0, n = ca.length; i < n; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  let expires;
  if (exdays) {
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    expires = `expires=${d.toUTCString()}`;
  }
  const newCookie = document.cookie = `${cname}=${cvalue};${expires};`;
  return newCookie;
};

const invalidateCookie = (cname) => {
  const newCookie = document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  return newCookie;
};

export { getCookie, setCookie, invalidateCookie };
