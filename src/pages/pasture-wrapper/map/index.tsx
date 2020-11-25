import React from 'react'
import { Tabs } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import './index.less'
import { useLanguage } from '@/language/useLanguage'

const { TabPane } = Tabs

const PastureMapDetail: React.FC = props => {
    return (
        <main className="pasture-map-wrapper">
            <section className="pasture-map__map">
                <iframe src="https://cattle.coolhei.com/map/#/" />
            </section>
            <article className="pasture-map__info beauty-shadow beauty-radius">
                <Tabs defaultActiveKey="1">
                    <TabPane key="1" tab={<EditOutlined />}>
                        <main className="pasture-map__info--item">
                            <h3>人人牧场</h3>
                            <p>
                                <strong>{useLanguage.animal_basic}</strong> QAQ
                            </p>
                            <p>
                                <strong>{useLanguage.device}</strong> 2345
                            </p>
                            <p>
                                <strong>{useLanguage.create}</strong> 2020-20-20 20:20:20
                            </p>
                        </main>
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
