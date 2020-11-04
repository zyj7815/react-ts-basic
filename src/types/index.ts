// 简单的对象
export type ObjectProps = {
    key: string | number
    value: any
}

// 简单的modal
export type SimpleModalProps = {
    visible: boolean
    loading?: boolean

    onPrimary: (render?: boolean) => void
    onOther?: (arg?: any) => void
}
