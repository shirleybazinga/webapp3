import { common } from "./constants";

// from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function str2ab(str: string) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

function ab2str(buf: ArrayBuffer) {
    const bufView = new Uint8Array(buf);
    let str = "";
    for (let i = 0; i < bufView.length; i++) {
        str += String.fromCharCode(bufView[i]);
    }
    return btoa(str);
}

function importRsaKey(pem: string) {
    // base64 decode the string to get the binary data
    const binaryDerString = atob(pem);
    // convert from a binary string to an ArrayBuffer
    const binaryDer = str2ab(binaryDerString);

    return window.crypto.subtle.importKey(
        "spki",
        binaryDer, {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        true,
        ["encrypt"]
    );
}

let rsaKeyPromise: Promise<CryptoKey> | null = null;

export function encryptStrings(strs: string[]) {
    if (!rsaKeyPromise) {
        rsaKeyPromise = fetch(common.GETPUBKEY).then(res => {
            if (!res.ok || res.status !== 200) {
                rsaKeyPromise = null;
                throw new Error(res.status.toString());
            }
            return res.json();
        }).then(json => {
            return importRsaKey(json.key);
        });
    }

    return rsaKeyPromise.then(pubKey => {
        let encoder = new TextEncoder();
        return Promise.all(strs.map((value: string) => window.crypto.subtle.encrypt({ name: "RSA-OAEP" }, pubKey, encoder.encode(value))));
    }).then((values: ArrayBuffer[]) => values.map(value => ab2str(value)));
}
