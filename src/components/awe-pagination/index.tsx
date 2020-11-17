import AwePagination from './awe-pagination'

declare const PageDirectionTypes: ['left', 'right']
export declare type PageDirectionType = typeof PageDirectionTypes[number]

export interface AwePaginationProps {
    defaultSort: string // 默认排序字段
    disable?: boolean
    pageSizeOption: number[] // 每页条数
    pageSize: number // 当前条数
    pageNumber: number // 当前页码
    currentPageTotal: number // 当前列表真实显示的条数
    onChange: (direction: PageDirectionType, pageNumber: number, sortKey: string) => void // 翻页时调用
    onShowSizeChange: (pageSize: number) => void // 选择每页条数时调用
}

export default AwePagination
