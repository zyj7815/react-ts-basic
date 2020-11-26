import { IMenuNav } from '@/types/route'
import { Helper } from '@/helper'

/**
 * 检查Menu当前打开项
 * 通过menu.uri 和 当前 path 的相似度，判断 openkey 是哪一个
 */
export function currentOpenKey(uriArr: string[]): string {
    let uri: string = window.location.hash

    if (uri.indexOf('?') > -1) {
        uri = uri.substr(0, uri.indexOf('?'))
    }

    if (uri.indexOf('#') > -1) {
        uri = uri.substr(1)
    }

    let max: number = 0
    let maxIndex: number = 0

    uriArr.forEach((val, index) => {
        // 截取长短相等的url再对比
        const minLength = Math.min(uri.length, val.length)
        const tmpMax = Helper.compareStrSimilar(
            uri.substring(0, minLength),
            val.substring(0, minLength)
        )
        if (tmpMax > max) {
            max = tmpMax
            maxIndex = index
        }
    })

    return uriArr[maxIndex]
}

export function currentSubOpenKey(menuMap: IMenuNav[]): string[] {
    const uri: string = window.location.hash
    const subKey: any[] = []

    menuMap.forEach((val: any) => {
        if (val.children) {
            if (uri.indexOf(val.uri) > -1) {
                subKey.push(val.uri)
            }
        }
    })
    return subKey
}
