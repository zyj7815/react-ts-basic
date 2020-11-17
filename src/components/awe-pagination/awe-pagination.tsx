import React from 'react'
import { Button, Select } from 'antd'
import { AwePaginationProps, PageDirectionType } from '@/components/awe-pagination/index'
import {
    VerticalRightOutlined,
    LeftOutlined,
    RightOutlined,
    VerticalLeftOutlined,
} from '@ant-design/icons'
import './awe-pagination.less'

const Option = Select.Option

const AwePagination: React.FC<AwePaginationProps> = (props: AwePaginationProps) => {
    const { currentPageTotal, pageSize, disable } = props
    let pageNumber = parseInt(`${props.pageNumber}`, 10)

    let topLeftDisable = true
    let leftDisable = false
    let rightDisable = false

    if (pageNumber > 1) {
        topLeftDisable = false
    }

    // 当前页面的条数为小于配置条数，并且当前页面 <= 1，则禁止左翻按钮
    if ((currentPageTotal < pageSize && pageNumber <= 1) || pageNumber === 1) {
        leftDisable = true
    }

    //（option显示条数 > 当前页面条数 && 页数 > 0），禁止向后翻页
    if (pageSize > currentPageTotal && pageNumber > 0) {
        rightDisable = true
    }

    const handleChangePage = (pageNumber: number, direction: PageDirectionType) => {
        if (disable) {
            return
        }
        let sort = props.defaultSort
        if (direction === 'left') {
            if (pageNumber > 0 && currentPageTotal === 0) {
                sort = `-${sort}`
                pageNumber = 1
            } else {
                if (sort.indexOf('-') > -1) {
                    sort = sort.replace('-', '')
                } else {
                    sort = `-${sort}`
                }
            }
        }
        props.onChange(direction, pageNumber, sort)
    }

    const onShowSizeChange = (pageSize: number) => {
        if (disable) {
            return
        }
        props.onShowSizeChange(pageSize)
    }

    return (
        <nav className="awe-pagination-wrapper">
            <Button
                disabled={topLeftDisable}
                icon={<VerticalRightOutlined />}
                onClick={() => handleChangePage(1, 'left')}
            />
            <Button
                disabled={leftDisable}
                icon={<LeftOutlined />}
                onClick={() => handleChangePage(pageNumber - 1, 'left')}
            />
            <Button type="primary">{props.pageNumber}</Button>
            <Button
                disabled={rightDisable}
                icon={<RightOutlined />}
                onClick={() => handleChangePage(pageNumber + 1, 'right')}
            />
            <Select
                value={parseInt(`${pageSize}`, 10)}
                onChange={onShowSizeChange}
                className="dr-pagination__pageSize"
            >
                {props.pageSizeOption.map(page => (
                    <Option key={page} value={page}>
                        {page} 条/页
                    </Option>
                ))}
            </Select>
        </nav>
    )
}

export default AwePagination
