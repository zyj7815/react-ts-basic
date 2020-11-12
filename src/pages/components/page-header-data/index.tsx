import React from 'react'
import './index.less'

/**
 * 生物列表上部分的信息
 */

export type PageHeaderDataItem = {
    mainText: string
    subText: string | number
}

interface PageHeaderDataProps {
    height?: number
    infoItems: PageHeaderDataItem[]
}

export const PageHeaderData: React.FC<PageHeaderDataProps> = (props: PageHeaderDataProps) => {
    return (
        <header
            className="awe-page-info-wrapper"
            style={props.height ? { height: props.height } : {}}
        >
            {props.infoItems.map((item: PageHeaderDataItem, index: number) => (
                <div
                    key={index}
                    className={`page-item ${index < props.infoItems.length - 1 &&
                        'page-item-line'}`}
                >
                    <span className="main-text">{item.mainText}</span>
                    <h4 className="sub-text">{item.subText}</h4>
                </div>
            ))}
        </header>
    )
}
