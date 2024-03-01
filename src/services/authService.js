import VueCookies from 'vue-cookies';

const TOKEN_KEY = 'token';

export function setToken(token) {
  VueCookies.set(TOKEN_KEY, token);
}

export function getToken() {
  return VueCookies.get(TOKEN_KEY);
}

export function removeToken() {
  VueCookies.remove(TOKEN_KEY);
}

export function getNikFromToken() {
  const token = getToken();
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    console.log('Nik from token:', decodedToken.nik);
    return decodedToken.nik;
  }
  return null;
}

export function getExpirationTimeFromToken() {
  const token = getToken();
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return new Date(decodedToken.exp);
    
  }
  print(token);
  return null;
}

export function isTokenExpired() {
  const expirationTime = getExpirationTimeFromToken();
  return expirationTime && expirationTime < new Date();
}

export function isTokenValid() {
  const token = getToken();
  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      console.log('Decoded Token:', decodedToken);

      const expirationTime = decodedToken.exp * 1000;
      if (!isNaN(expirationTime) && typeof expirationTime === 'number') {
        console.log('Expiration Time:', expirationTime);

        if (Date.now() <= expirationTime) {
          console.log('Token is still valid.');
          return true;
        } else {
          console.log('Token has expired.');
          return false;
        }
      } else {
        console.error('Invalid or missing "exp" field in the token:', decodedToken);
        return false;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }

  console.error('No token found.');
  return false;
}


export default {
  setToken,
  getToken,
  removeToken,
  getNikFromToken,
  getExpirationTimeFromToken,
  isTokenExpired,
  isTokenValid,
};