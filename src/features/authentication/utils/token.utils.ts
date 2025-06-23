import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'access-token';

export interface DecodedToken {
  id: string;
  username: string;
  email?: string;
  exp: number;
  iat: number;
}

export const TokenUtils = {
  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  },

  decodeToken: (token: string): DecodedToken | null => {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      return null;
    }
  },

  getTokenExpirationTime: (token: string): number | null => {
    const decoded = TokenUtils.decodeToken(token);
    return decoded ? decoded.exp * 1000 : null;
  }
};