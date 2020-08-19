const host = window.location.host
const origin = window.location.origin

const test = 'https://cattle.coolhei.com/api/v1/' // 测试
const develop = 'http://cattle.test.druidtech.net/api/v1/' // 开发
const production = 'https://cattle.druidtech.cn/api/v1/' // 线上

let base: string = ''
if (host.includes('localhost') || host.includes('192.168') || host.includes('127.0.0.1')) {
    base = test
} else {
    base = `${origin}/api/v1`
}

const base2 = base.replace('/v1', '/v2')

export const Api = {
    login: base + 'login',
    myself: base + 'user/myself',
    customize: (id: string) => `${base2}customize/company/${id}`,
}
