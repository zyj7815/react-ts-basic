import React from 'react'
import { Tabs } from 'antd'
import { useLanguage } from '@/language/useLanguage'

const TabPane = Tabs.TabPane

const OverviewAnimal: React.FC = props => {
    return (
        <div className="pasture-overview-item beauty-shadow" id="pasture-overview-animal">
            <header className="pasture-overview-animal__title">{useLanguage.animal_basic}</header>
            <Tabs>
                <TabPane tab="Tab 1" key="1">
                    Content of Tab Pane 1
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}

export default OverviewAnimal
