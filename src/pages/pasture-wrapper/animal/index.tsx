import React from 'react'
import { Breadcrumb, Radio, Button } from 'antd'
import { PageHeaderData, PageHeaderDataItem } from '@/pages/components/page-header-data'
import { useLanguage } from '@/language/useLanguage'
import AnimalListTable from './list-table'
import { AweRouteProps } from '@/types/route'
import { Utils } from '@/utils'
import { RouteUris } from '@/router/config'
import { TabType } from '@/enum'
import AwePage from '@/pages/components/awe-page'
import AnimalListCard from '@/pages/pasture-wrapper/animal/list-card'

const TabKey = 'tabKey'

const PastureBiological: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId } = routeProps.match.params
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
        routeProps.history.push(RouteUris.PastureAnimalNew(pastureId))
    }

    const infoItems: PageHeaderDataItem[] = [
        { mainText: '52', subText: useLanguage.animal_total },
        { mainText: '2', subText: useLanguage.pasture_total },
    ]

    const listRadio = [
        { label: useLanguage.list_mode, value: TabType.List },
        { label: useLanguage.card_mode, value: TabType.Card },
    ]

    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.animal_card}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const radio = (
        <>
            <Radio.Group
                optionType="button"
                value={tabKey}
                options={listRadio}
                onChange={onChangeTab}
            />

            <span>
                <Button onClick={handleNewAnimal}>{useLanguage.new_card}</Button>
            </span>
        </>
    )

    return (
        <AwePage nav={nav} header={<PageHeaderData infoItems={infoItems} />}>
            <AwePage header={radio} hdColor={true} noPadding={true} isHPadding={true}>
                {tabKey === TabType.List ? <AnimalListTable /> : <AnimalListCard />}
            </AwePage>
        </AwePage>
    )
}

export default PastureBiological
