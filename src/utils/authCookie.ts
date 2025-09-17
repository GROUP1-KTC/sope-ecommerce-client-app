import Cookies from 'js-cookie';

const COOKIE_KEY = 'authUser';

export function saveAuthUser(user: {
    id: string;
    username: string;
    roles: string[];
    accessToken: string | null;
}) {
    Cookies.set(COOKIE_KEY, JSON.stringify(user), {
        path: '/',
        expires: 365,
    });
}

export function loadAuthUser() {
    const value = Cookies.get(COOKIE_KEY);
    return value ? JSON.parse(value) : null;
}

export function clearAuthUser() {
    Cookies.remove(COOKIE_KEY, { path: '/' });
}
