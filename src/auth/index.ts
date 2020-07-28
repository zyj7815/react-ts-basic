const AUTH_KEY = 'xx-key'

export const Auth = {
    getAuth: window.localStorage.getItem(AUTH_KEY),

    setAuth: (auth: string | number) => {
        window.localStorage.setItem(AUTH_KEY, `${auth}`)
    },
}
