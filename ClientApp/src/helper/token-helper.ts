import { common } from "./constants";
import { useState } from 'react';

export interface UserToken {
    token: string,
    username: string,
    firstName: string,
    lastName: string,
    id: number
};

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem(common.TOKEN);
        const userToken = tokenString && JSON.parse(tokenString);
        return userToken && userToken.token
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: UserToken | null) => {
        if (userToken) {
            sessionStorage.setItem(common.TOKEN, JSON.stringify(userToken));
            setToken(userToken.token);
        } else {
            sessionStorage.setItem(common.TOKEN, "");
            setToken("");
        }
    };

    return {
        setToken: saveToken,
        token
    }
}

//export function setCookie(name: string, value: any, hours: number, isJson: boolean) {
//    if (!hours && hours != 0) hours = 1 // default 1 hour
//    if (isJson) value = btoa(JSON.stringify(value))

//    let expires = new Date().getTime() + hours * 60 * 60 * 1000
//    document.cookie = `${name}=${value}; expires=${new Date(expires).toUTCString()}; path=/`
//}

//export function getCookie(name: string, isJson: boolean) {
//    if (document.cookie.length > 0) {
//        let start = document.cookie.indexOf(name + '=')
//        if (start != -1) {
//            start = start + name.length + 1
//            let end = document.cookie.indexOf(';', start)
//            if (end == -1) {
//                end = document.cookie.length
//            }
//            let ret = unescape(document.cookie.substring(start, end))
//            return isJson ? JSON.parse(atob(ret)) : ret
//        }
//    }
//    return isJson ? {} : ''
//}