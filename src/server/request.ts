import { Token } from '@/server/token'
import { Api } from '@/server/api'

export const ServerRequest = {
    getImgUrl: (imageId: string, deviceId: string, type = false) => {
        const encode: string = Token.data.headers['x-druid-authentication'] || ''
        const foot = `?X-Druid-Authentication=${encodeURIComponent(encode)}`
        if (type) {
            return `${Api.image.one(deviceId, imageId)}${foot}`
        }
        return `${Api.image.thumbnail(deviceId, imageId)}${foot}`
    },
}
