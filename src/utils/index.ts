import { encode, decode } from 'js-base64'
import dayjs from 'dayjs'

dayjs.extend(require('dayjs/plugin/utc'))

export const Utils = {
    /**
     * 判断参数是否存在
     * @param params
     */
    hasExist: function(params: string | number) {
        return !(!params || params === 'undefined')
    },

    /**
     * 获取url参数（第一种）
     * @param {string} name
     */
    getUrlParam: function(name: string) {
        const url = location.href
        if (url.indexOf('?') > -1) {
            const temp1 = url.split('?')
            const pram = temp1[1]
            const keyValue = pram.split('&')
            const obj: any = {}

            for (let i = 0; i < keyValue.length; i++) {
                const item = keyValue[i].split('=')
                const key = item[0]
                obj[key] = item[1]
            }
            return decodeURI(obj[name])
        } else {
            return ''
        }
    },

    /**
     * 获取多个url参数
     * @param params
     */
    getUrlMultiParam: function(params: string[]) {
        const result: any = {}

        params.forEach(params => {
            result[params] = this.getUrlParam(params)
        })

        return result
    },

    /**
     * 操作 URL 单个参数（增、改）
     * @param name
     * @param value
     */
    pushParamsToUrl: function(name: string, value: string | number) {
        let href = location.href
        // 如果URL中有参数，就在后面添加
        if (name !== 'pageSize') {
            if (href.indexOf('?') > -1) {
                const paramStr = href.split('?')[1]

                // 如果已经存在这个参数，就修改此参数
                if (paramStr.indexOf(name) > -1) {
                    const oldVal = this.getUrlParam(name)
                    window.location.href = href.replace(`${name}=${oldVal}`, `${name}=${value}`)
                }
                // 如果不存在就添加
                else {
                    window.location.href = `${href}&${name}=${value}`
                }
            }
            // 如果url中没有任何参数，
            else {
                window.location.href = `${href}?${name}=${value}`
            }
        } else {
            href = href.split('?')[0]
            window.location.href = `${href}?${name}=${value}`
        }
    },

    /**
     * 向url中添加多个数据，如果有重复的就替换
     */
    pushMultiParamsToUrl: function(params: any) {
        Object.keys(params).forEach(key => {
            this.pushParamsToUrl(key, params[key])
        })
    },

    /**
     * 删除url中指定的参数
     * @param {*} name
     */
    deleteUrlParam: function(name: string) {
        const href = location.href

        if (href.indexOf('?') > -1) {
            const baseUrl = href.split('?')[0]
            const params = href.split('?')[1].split('&')

            const result = params.filter(param => {
                return param.split('=')[0] !== name
            })

            let url = `${baseUrl}?${result.join('&')}`
            if (url[url.length - 1] === '?') {
                url = url.substr(0, url.length - 1)
            }
            window.location.href = url
        }
    },

    /**
     * 删除url多个参数
     * @param params
     */
    deleteUrlMultiParams: function(params: string[]) {
        params.forEach(param => {
            this.deleteUrlParam(param)
        })
    },

    /**
     * 比较两个字符串的相似度
     * @param s
     * @param t
     */
    compareStrSimilar: (s: string, t: string): number => {
        if (!s || !t) {
            return 0
        }
        const l = s.length > t.length ? s.length : t.length
        const n = s.length
        const m = t.length
        const d: any[] = []
        const f = 5
        const min = function(a: number, b: number, c: number) {
            return a < b ? (a < c ? a : c) : b < c ? b : c
        }
        let i, j, si, tj, cost
        if (n === 0) return m
        if (m === 0) return n
        for (i = 0; i <= n; i++) {
            d[i] = []
            d[i][0] = i
        }
        for (j = 0; j <= m; j++) {
            d[0][j] = j
        }
        for (i = 1; i <= n; i++) {
            si = s.charAt(i - 1)
            for (j = 1; j <= m; j++) {
                tj = t.charAt(j - 1)
                if (si === tj) {
                    cost = 0
                } else {
                    cost = 1
                }
                d[i][j] = min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost)
            }
        }
        let res = 1 - d[n][m] / l
        return parseFloat(res.toFixed(f))
    },

    /**
     * 将树形对象展开
     * @param tree
     * @param childKey
     */
    tree2Arr: (tree: any[], childKey?: string) => {
        const newArr: any[] = []
        const key = childKey || 'children'

        cyclic(tree)

        function cyclic(arr: any[]) {
            arr.forEach((val: any) => {
                if (val.children) {
                    cyclic(val[key])
                } else {
                    newArr.push(val)
                }
            })
        }
        return newArr
    },

    /**
     * utc时间转当地时区
     * @param dateTime
     * @param format
     */
    utc2Time(dateTime?: string, format = 'YYYY-MM-DD HH:mm:ss'): string {
        return (
            dayjs(dateTime)
                //@ts-ignore
                .utc()
                .add((window as any).timeZone, 'm')
                .format(format)
        )
    },

    /**
     * 秒转化成 时分
     * @param second
     */
    second2Time: (second: number | string) => {
        if (typeof second === 'string') {
            second = parseInt(second)
        }

        let duration
        const days = Math.floor(second / 86400)
        const hours = Math.floor((second % 86400) / 3600)
        const minutes = Math.floor(((second % 86400) % 3600) / 60)
        const seconds = Math.floor(((second % 86400) % 3600) % 60)

        if (days > 0) {
            duration = `${days} 天`
        } else if (hours > 0) {
            duration = `${hours} 小时 `
        } else if (minutes > 0) {
            duration = `${minutes} 分 ${seconds} 秒`
        } else if (seconds > 0) {
            duration = `${seconds} 秒`
        }
        return duration
    },

    /**
     * 时间差规则
     * @param dataTime
     * @param text
     */
    getTimeDiff(dataTime: string, text: string) {
        if (dataTime) {
            const utcNow = dayjs()
                // @ts-ignore
                .utc()
                .format()

            const nowTimestamp = dayjs(utcNow).valueOf()
            const timestamp = dayjs(dataTime).valueOf()

            const diff = Math.floor(nowTimestamp / 1000 - timestamp / 1000)

            return this.second2Time(diff)
        } else {
            return '-'
        }
    },

    /**
     * 文件大小计算
     * @param bytes
     */
    byteToSize: (bytes: number | string) => {
        if (typeof bytes === 'string') {
            bytes = parseInt(bytes)
        }

        if (bytes === 0) {
            return '0 KB'
        }

        // 计算kb值
        const KB = bytes / 1024
        let unit = 'KB'
        let result = 0

        // 计算M
        if (KB > 1024) {
            const MB = KB / 1024

            // 计算GB
            if (MB > 1024) {
                const GB = MB / 1024
                unit = 'G'
                result = GB
            } else {
                unit = 'M'
                result = MB
            }
        } else {
            unit = 'KB'
            result = KB
        }

        const integer = Math.floor(result)

        // 如果最后结果是整数，就按整数返回
        if (integer === result) {
            return `${result} ${unit}`
        }
        // 如果是小数，就保留3位
        else {
            return `${result.toFixed(3)} ${unit}`
        }
    },

    base64: {
        encode: (content: string) => encode(content),
        decode: (content: string) => decode(content),
    },
}
