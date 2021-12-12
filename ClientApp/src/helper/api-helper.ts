import { common } from "./constants";
import { encryptStrings } from "./encryption-helper"

export function handleLogin(username: string, password: string, onSuccess: any, onFailure: any) {
    encryptStrings([username, password]).then(([username, password]) => {
        let data = JSON.stringify({
            username,
            password
        });

        handlePost(common.AUTHPATH, null, data, onSuccess, onFailure);
    });
}

export function handleSignup(firstname: string, lastname: string, username: string, password: string, onSuccess: any, onFailure: any) {
    encryptStrings([username, password]).then(([username, password]) => {
        let data = JSON.stringify({
            'firstName': firstname,
            'lastName': lastname,
            'username': username,
            'password': password
        });

        handlePost(common.REGPATH, null, data, onSuccess, onFailure);
    });
}

export function handleGetUsers(token: string, onSuccess: any, onFailure?: any) {
    handleGet(common.USRPATH, token, onSuccess, onFailure);
}

function handlePost(path: string, token: string | null, data: string, onSuccess: any, onFailure: any) {
    let header = { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : "" };
    let status = 0;

    fetch(path, {
        method: 'POST',
        headers: new Headers(header),
        body: data,
    }).then(res => {
        status = res.status;
        return res.json();
    }).then(jsonRes => {
        if (status !== 200) {
            onFailure({ ...jsonRes, status: status });
        } else {
            onSuccess(jsonRes);
        }
    }).catch(error => {
        console.log('POST Error: ' + error);
        onFailure(error);
    });
}

function handleGet(path: string, token: string | null, onSuccess: any, onFailure?: any) {
    let header = { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : "" };
    let status = 0;

    fetch(path, {
        method: 'GET',
        headers: new Headers(header),
    }).then(res => {
        status = res.status;
        return res.json();
    }).then(jsonRes => {
        if (status !== 200 && onFailure) {
            onFailure(jsonRes);
        } else {
            onSuccess(jsonRes);
        }
    }).catch(error => {
        console.log('Auth Error: ' + error)
        if (onFailure)
            onFailure(error);
    })
}