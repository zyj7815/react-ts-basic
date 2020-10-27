import * as React from 'react'
import { Tabs } from 'antd'
import { statisticConfig } from './config'
import './home-statistic.less'

const TabPane = Tabs.TabPane

export const HomeStatistic: React.FC = () => {
    return (
        <div className="home-statistic">
            <Tabs>
                {statisticConfig.map((tab, index) => {
                    return (
                        <TabPane tab={tab.title} key={index}>
                            <tab.component params={'asdd0i0909d 殴斗哦哦'} />
                        </TabPane>
                    )
                })}
            </Tabs>
        </div>
    )
}
