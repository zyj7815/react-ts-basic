import { message } from 'antd'
import { Token } from '@/server/token'

export const errorMessage = {
    alert: (err: any) => {
        const code = err.response ? (err.response.data.code ? err.response.data.code : '') : 0

        if (code === 0) {
            message.error('请求错误，请重试')
        }
        // token验证错误，弹出登录
        else if (code === 10011) {
            message.error('无效token')

            Token.cleanAuth()
            setTimeout(() => {
                window.location.reload()
            }, 200)
        }
    },
}
