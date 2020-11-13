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

// column通用的type接口
export type AweColumnProps<T> = {
    // 查看详情
    onCheckDetailEvent: (record: T) => void
    // 编辑
    onEditEvent?: (record: T) => void
    // 删除
    onDeleteEvent?: (record: T) => void
}
