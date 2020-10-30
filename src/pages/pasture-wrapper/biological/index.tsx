import React from 'react'
import { Breadcrumb } from 'antd'
import { AweNavPage } from '@/components/awe-nav-page'

const PastureBiological: React.FC = props => {
    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>牧场管理</Breadcrumb.Item>
            <Breadcrumb.Item>生物详情</Breadcrumb.Item>
        </Breadcrumb>
    )

    return (
        <>
            <AweNavPage nav={nav}>qowijdoiqjwod</AweNavPage>
        </>
    )
}

export default PastureBiological
