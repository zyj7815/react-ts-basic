import { API_HOST, ORIGIN } from '@/config/constants'

let base: string = ''
// 开发环境，从配置文件中读取环境变量
// 此配置在webpack.config中配置了 REACT_APP_ENV
if (process.env.REACT_APP_ENV === 'dev') {
    // 测试环境
    base = API_HOST.TEST_HOST
} else {
    // 线上环境
    base = `${ORIGIN}/api/v1/`
}

// 使用v2的接口
const base2 = base.replace('/v1/', '/v2/')

export const Api = {
    login: base + 'login',
    myself: base + 'user/myself',
    customize: (id: string) => `${base2}customize/company/${id}`,
    event: base2 + 'biological_event/',
    device: {
        basic: base + 'device/',
        device_type: base + 'dt/',
    },
    biological: {
        new: base2 + 'biological/',
        list: base + 'biological/',
        searchName: (nickname: string) => `${base2}biological/search/nickname/${nickname}`,
        event: (id: string) => `${base2}biological_event/biological/${id}`,
        inventory: {
            pandian: base2 + 'command/pandian',
            pandian_result: `${base2}command/pandian/result`,
            break_off: (id: string) => `${base2}command/id/${id}/finish`,
        },
    },
    geofence: {
        list: base + 'geofence/',
    },
    group: {
        list: base + 'room/',
        detail: (id: string) => `${base}room/id/${id}`,
        biological: (id: string) => `${base}room/id/${id}/biological`,
        idle: base2 + 'biological/room/idle',
        addBiological: (romeId: string, bioId: string) =>
            `${base}room/id/${romeId}/biological/${bioId}/add`,
        delBiological: (romeId: string, bioId: string) =>
            `${base}room/id/${romeId}/biological/${bioId}/del`,
    },
    image: {
        one: (biologicalId: string, id: string) => {
            return `${base2}file/biological/${biologicalId}/image/${id}`
        },
        thumbnail: (biologicalId: string, id: string) => {
            return `${base2}file/biological/${biologicalId}/image/${id}/thumbnail`
        },
    },
    message: {
        basic: `${base}message/`,
        list: (timestamp: string) => `${base}message/page/${timestamp}`,
        del: base + 'message/delete',
    },
}
