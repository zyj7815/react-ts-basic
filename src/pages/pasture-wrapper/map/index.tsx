import React from 'react'
import { Tabs } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import './index.less'

const { TabPane } = Tabs

const PastureMapDetail: React.FC = props => {
    return (
        <main className="pasture-map-wrapper">
            <section className="pasture-map__map">map</section>
            <article className="pasture-map__info beauty-shadow beauty-radius">
                <Tabs defaultActiveKey="1">
                    <TabPane key="1" tab={<EditOutlined />}>
                        123
                    </TabPane>
                    <TabPane key="2" tab="home2">
                        456
                    </TabPane>
                </Tabs>
            </article>
        </main>
    )
}

export default PastureMapDetail
