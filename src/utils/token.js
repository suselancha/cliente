import { TOKEN } from './constants';
import jwtDecode from 'jwt-decode';

export function setToken(token) {
    localStorage.setItem(TOKEN, token);
}

export function getToken(params) {
        return localStorage.getItem(TOKEN);
}

export function decodeToken(token) {
        return jwtDecode(token);
}