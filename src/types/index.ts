// 简单的对象
export type ObjectProps = {
    key: string | number
    value: any
}

// 简单的modal
export type SimpleModalProps = {
    visible: boolean
    loading?: boolean

    // 主按的事件
    onMainEvent: (ary?: any) => void
    // 次要的事件
    onSubEvent?: (arg?: any) => void
    // 关闭
    onClose: () => void
}
