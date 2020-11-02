import React from 'react'
import './index.less'

export type AwePageInfoItem = {
    mainText: string
    subText: string | number
}

interface AwePageInfoProps {
    height?: number
    infoItems: AwePageInfoItem[]
}

export const AwePageInfo: React.FC<AwePageInfoProps> = (props: AwePageInfoProps) => {
    return (
        <header
            className="awe-page-info-wrapper"
            style={props.height ? { height: props.height } : {}}
        >
            {props.infoItems.map((item: AwePageInfoItem, index: number) => (
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
