export const setCookie = (name, value, exp) => {
  const date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie =
    name + '=' + escape(value) + ';expires=' + date.toUTCString() + ';path=/';
};

export const getCookie = (name) => {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? unescape(value[2]) : null;
};

export const resetCookie = (cName) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie =
    cName + '= ' + '; expires=' + expireDate.toGMTString() + '; path=/';
};
