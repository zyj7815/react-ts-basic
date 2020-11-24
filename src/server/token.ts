import { STORAGE_KEY } from '@/config/constants'

export const Token = {
    auth: window.localStorage.getItem(STORAGE_KEY) || window.sessionStorage.getItem(STORAGE_KEY),

    data: {
        headers: {
            'x-druid-authentication': window.localStorage.getItem(STORAGE_KEY),
        },
    },

    setToken: (auth: string | number, remember: boolean) => {
        if (remember) {
            window.localStorage.setItem(STORAGE_KEY, `${auth}`)
        } else {
            window.sessionStorage.setItem(STORAGE_KEY, `${auth}`)
        }
    },

    cleanAuth: () => {
        window.localStorage.setItem(STORAGE_KEY, '')
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
