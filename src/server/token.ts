const host = window.location.host
const repo = 'cattle+user'

const AppKey = `${host}+${repo}`

export const Token = {
    auth: window.localStorage.getItem(AppKey) || window.sessionStorage.getItem(AppKey),

    data: {
        headers: {
            'x-druid-authentication': window.localStorage.getItem(AppKey),
        },
    },

    setToken: (auth: string | number, remember: boolean) => {
        if (remember) {
            window.localStorage.setItem(AppKey, `${auth}`)
        } else {
            window.sessionStorage.setItem(AppKey, `${auth}`)
        }
    },

    cleanAuth: () => {
        window.localStorage.setItem(AppKey, '')
        window.location.reload()
    },

    pageToken(pageSize: number = 10, page: number = 0, sort: string = '-updated_at'): any {
        return {
            headers: Object.assign(this.data.headers, {
                'x-result-limit': pageSize,
                'x-result-offset': page,
                'x-result-sort': sort,
            }),
        }
    },
}
