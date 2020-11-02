const host = window.location.host
const origin = window.location.origin

const test = 'https://cattle.coolhei.com/api/v1/' // 测试
const develop = 'http://cattle.test.druidtech.net/api/v1/' // 开发
const production = 'https://cattle.druidtech.cn/api/v1/' // 线上

let base: string = ''

// 开发环境，从配置文件中读取环境变量
// 此配置在webpack.config中配置了 REACT_APP_ENV
if (process.env.REACT_APP_ENV === 'dev') {
    base = test
} else {
    base = `${origin}/api/v1/`
}

const base2 = base.replace('/v1/', '/v2/')

export const Api = {
    login: base + 'login',
    myself: base + 'user/myself',
    customize: (id: string) => `${base2}customize/company/${id}`,
    biological: {
        list: base + 'biological/',
    },
    image: {
        one: (biologicalId: string, id: string) => {
            return `${base2}file/biological/${biologicalId}/image/${id}`
        },
        thumbnail: (biologicalId: string, id: string) => {
            return `${base2}file/biological/${biologicalId}/image/${id}/thumbnail`
        },
    },
}
