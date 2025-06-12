import { jwtDecode } from 'jwt-decode';
interface DecodedToken {
  exp: number;
  iat: number;
  userId: string;
  username : string;
}
export const setToken = (token: string) => {
  try {
    localStorage.setItem('access_token', token);
  } catch (error) {
    console.error('Failed to set token in localStorage:', error);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem('access_token');
  } catch (error) {
    console.error('Failed to get token from localStorage:', error);
    return null;
  }
};

export const removeToken = () => {
  try {
    localStorage.removeItem('access_token');
  } catch (error) {
    console.error('Failed to remove token from localStorage:', error);
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Failed to decode token or check expiration:', error);
    return true; // Assume expired if decoding fails
  }
};
