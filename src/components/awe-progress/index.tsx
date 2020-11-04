import React from 'react'
import { Progress } from 'antd'
import './index.less'

interface AweProgressProps {
    visible: boolean
    percent: number
}

export const AweProgress: React.FC<AweProgressProps> = (props: AweProgressProps) => {
    const percent = props.percent.toFixed(0)

    return props.visible ? (
        <main className="awe-loading-wrapper">
            <Progress percent={parseInt(percent, 10)} strokeColor={'#16B351'} status="active" />
        </main>
    ) : null
}
