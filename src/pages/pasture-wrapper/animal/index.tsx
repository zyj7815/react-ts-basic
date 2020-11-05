import React from 'react'
import { Breadcrumb, Radio, Button } from 'antd'
import { AweNavPage } from '@/pages/components/page-nav'
import { PageHeaderData, PageHeaderDataItem } from '@/pages/components/page-header-data'
import { useLanguage } from '@/language/useLanguage'
import AnimalListTable from './list-table'
import AnimalListCard from './list-card'
import { AweRouteProps } from '@/types/route'
import { Utils } from '@/utils'
import { RouteUris } from '@/router/config'
import { TabType } from '@/enum'

const TabKey = 'tabKey'

const PastureBiological: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { id } = routeProps.match.params
    const tab = Utils.getUrlParam(TabKey) || TabType.List
    const [tabKey, setTabKey] = React.useState(tab)

    const onChangeTab = (e: any) => {
        Utils.pushParamsToUrl('tabKey', e.target.value)
        setTabKey(e.target.value)
    }

    /**
     * 新建生物
     */
    const handleNewAnimal = () => {
        routeProps.history.push(RouteUris.PastureAnimalNew(id))
    }

    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.animal_card}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const infoItems: PageHeaderDataItem[] = [
        { mainText: '52', subText: useLanguage.animal_total },
        { mainText: '2', subText: useLanguage.pasture_total },
    ]

    const listRadio = [
        { label: useLanguage.list_mode, value: TabType.List },
        { label: useLanguage.card_mode, value: TabType.Card },
    ]

    return (
        <AweNavPage nav={nav}>
            <article className="awe-page-wrapper">
                <header className="awe-page-header-info">
                    <PageHeaderData infoItems={infoItems} />
                </header>
                <section className="awe-page-content" style={{ paddingTop: 115 }}>
                    <main className="awe-page__layout">
                        <header className="awe-page__layout-header">
                            <Radio.Group
                                optionType="button"
                                value={tabKey}
                                options={listRadio}
                                onChange={onChangeTab}
                            />

                            <span>
                                <Button onClick={handleNewAnimal}>{useLanguage.new_card}</Button>
                            </span>
                        </header>

                        <section className="awe-page__layout-content">
                            {tabKey === TabType.List ? <AnimalListTable /> : <AnimalListCard />}
                        </section>
                    </main>
                </section>
            </article>
        </AweNavPage>
    )
}

export default PastureBiological
