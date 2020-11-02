import React from 'react'
import { Breadcrumb, Layout, Radio } from 'antd'
import { AweNavPage } from '@/pages/layout/page-nav'
import { AwePageInfo, AwePageInfoItem } from '@/pages/layout/page-info'
import { useLanguage } from '@/language/useLanguage'
import AnimalListTable from './list-table'
import AnimalListCard from './list-card'

const { Header, Content, Footer } = Layout

const PastureBiological: React.FC = props => {
    const [tabKey, setTabKey] = React.useState(0)

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
        { label: useLanguage.list_mode, value: 0 },
        { label: useLanguage.card_mode, value: 1 },
    ]

    return (
        <AweNavPage nav={nav}>
            <article className="awe-page-wrapper">
                <header className="awe-page-header-info">
                    <AwePageInfo infoItems={infoItems} />
                </header>
                <section className="awe-page-content">
                    <main className="awe-page-list__layout">
                        <header className="awe-page-list__layout-header">
                            <Radio.Group
                                optionType="button"
                                value={tabKey}
                                options={listRadio}
                                onChange={e => setTabKey(e.target.value)}
                            />
                        </header>

                        <section className="awe-page-list__layout-content">
                            {tabKey === 0 ? <AnimalListTable /> : <AnimalListCard />}
                        </section>
                    </main>
                </section>
            </article>
        </AweNavPage>
    )
}

export default PastureBiological
