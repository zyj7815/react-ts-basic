import { storageKey } from '@/config/channel'

export const Token = {
    auth: window.localStorage.getItem(storageKey) || window.sessionStorage.getItem(storageKey),

    data: {
        headers: {
            'x-druid-authentication': window.localStorage.getItem(storageKey),
        },
    },

    setToken: (auth: string | number, remember: boolean) => {
        if (remember) {
            window.localStorage.setItem(storageKey, `${auth}`)
        } else {
            window.sessionStorage.setItem(storageKey, `${auth}`)
        }
    },

    cleanAuth: () => {
        window.localStorage.setItem(storageKey, '')
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
