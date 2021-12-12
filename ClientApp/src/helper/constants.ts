export let common = {
    test: false,
    //test: true,
    DEFAULT: 'DEFAULT',
    TOKEN: 'token',
    USERDATA: 'userdata',
    USERNAME: 'username',
    PASSWORD: 'password',
    AUTHPATH: 'https://localhost/users/authenticate',
    REGPATH: 'https://localhost/users/register',
    USRPATH: 'https://localhost/users',
    GETPUBKEY: 'https://localhost/users/EncryptionKey'
}

export let login = {
    SUCCESS: 'Login Successfully.',
    FAILED: 'Incorrect username or password.',
}

export let signup = {
    SUCCESS: 'Sign up Successfully.',
    FAILED_USER: 'Invalid username. ',
    FAILED_PW: 'Invalid password. ',
}