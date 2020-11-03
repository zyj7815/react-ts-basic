import React from 'react'
import { Breadcrumb, Radio, Button } from 'antd'
import { AweNavPage } from '@/pages/layout/page-nav'
import { AwePageInfo, AwePageInfoItem } from '@/pages/layout/page-info'
import { useLanguage } from '@/language/useLanguage'
import AnimalListTable from './list-table'
import AnimalListCard from './list-card'
import { RouteProps } from '@/types/route'
import { Utils } from '@/utils'

const TabKey = 'tabKey'

enum TabType {
    List = 'list',
    Card = 'card',
}

const PastureBiological: React.FC<RouteProps> = (routeProps: RouteProps) => {
    const tab = Utils.getUrlParam(TabKey) || TabType.List

    const [tabKey, setTabKey] = React.useState(tab)

    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.animal_card}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const infoItems: AwePageInfoItem[] = [
        { mainText: '52', subText: useLanguage.animal_total },
        { mainText: '2', subText: useLanguage.pasture_total },
    ]

    const listRadio = [
        { label: useLanguage.list_mode, value: TabType.List },
        { label: useLanguage.card_mode, value: TabType.Card },
    ]

    const onChangeTab = (e: any) => {
        Utils.pushParamsToUrl('tabKey', e.target.value)
        setTabKey(e.target.value)
    }

    return (
        <AweNavPage nav={nav}>
            <article className="awe-page-wrapper">
                <header className="awe-page-header-info">
                    <AwePageInfo infoItems={infoItems} />
                </header>
                <section className="awe-page-content" style={{ paddingTop: 115 }}>
                    <main className="awe-page-list__layout">
                        <header className="awe-page-list__layout-header">
                            <Radio.Group
                                optionType="button"
                                value={tabKey}
                                options={listRadio}
                                onChange={onChangeTab}
                            />

                            <span>
                                <Button>{useLanguage.new_card}</Button>
                            </span>
                        </header>

                        <section className="awe-page-list__layout-content">
                            {tabKey === TabType.List ? <AnimalListTable /> : <AnimalListCard />}
                        </section>
                    </main>
                </section>
            </article>
        </AweNavPage>
    )
}

export default PastureBiological
