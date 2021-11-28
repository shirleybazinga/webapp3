import { common } from "./constants";

export function handleLogin(username: string, password: string, onSuccess: any, onFailure: any) {
    let data = JSON.stringify({
        'username': username,
        'password': password
    });

    let testResult = common.test && username === 'shirley' && password === 'test' ? {
        id: 1,
        username: "shirley",
        firstName: "Shirley",
        lastName: "ZHANG",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjEiLCJuYmYiOjE2MzgxMDE5NjEsImV4cCI6MTYzODcwNjc2MSwiaWF0IjoxNjM4MTAxOTYxfQ.rQUJfHDvAE7rnyF8QoBXh8yk7kI3XJsehN_5cfcHV9k"
    } : null;

    handlePost(common.AUTHPATH, null, data, onSuccess, onFailure, testResult);
}

export function handleSignup(firstname: string, lastname: string, username: string, password: string, onSuccess: any, onFailure: any) {
    let data = JSON.stringify({
        'firstName': firstname,
        'lastName': lastname,
        'username': username,
        'password': password
    });

    handlePost(common.REGPATH, null, data, onSuccess, onFailure);
}

export function handleGetUsers(token: string, onSuccess: any, onFailure?: any) {
    let testResult = common.test ? {
        id: 1,
        username: "shirley",
        firstName: "Shirley",
        lastName: "ZHANG"
    } : null;

    handleGet(common.USRPATH, token, onSuccess, onFailure, testResult);
}

function handlePost(path: string, token: string | null, data: string, onSuccess: any, onFailure: any, testResult?: any) {
    let header = { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : "" };
    let status = 0;

    fetch(path, {
        method: 'POST',
        headers: new Headers(header),
        body: data,
    })
    .then(res => {
        if (testResult) {
            return testResult;
        }

        // if (!res.ok || res.status !== 200)
        //     throw new Error(res.status.toString())
        status = res.status;
        return res.json();
    })
    .then(jsonRes => {
        //setCookie(common.USERDATA, jsonRes, common.test ? 0.1 : 1, true) // testing: 6 min
        if (status !== 200) {
            onFailure({ ...jsonRes, status: status});
        } else {
            onSuccess(jsonRes);
        }
    })
    .catch(error => {
        console.log('POST Error: ' + error);
        //setCookie(common.USERDATA, '', 0, false) // clear cookie
        onFailure(error);
    })
}

function handleGet(path: string, token: string | null, onSuccess: any, onFailure?: any, testResult?: any) {
    let header = { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : "" };
    let status = 0;

    fetch(path, {
        method: 'GET',
        headers: new Headers(header),
    })
    .then(res => {
        if (testResult) {
            return testResult;
        }

        // if (!res.ok || res.status !== 200)
        //     throw new Error(res.status.toString())
        status = res.status;
        return res.json();
    })
    .then(jsonRes => {
        if (status !== 200 && onFailure) {
            onFailure(jsonRes);
        } else {
            onSuccess(jsonRes);
        }
    })
    .catch(error => {
        console.log('Auth Error: ' + error)
        if (onFailure)
            onFailure(error);
    })
}