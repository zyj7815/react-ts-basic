import React from 'react'
import { Breadcrumb, Button, Radio } from 'antd'
import { AweRouteProps } from '@/types/route'
import { Utils } from '@/utils'
import { TabType } from '@/enum'
import { useLanguage } from '@/language/useLanguage'
import { PageHeaderData, PageHeaderDataItem } from '@/pages/components/page-header-data'
import GroupListTable from '@/pages/pasture-wrapper/group/list-table'
import NewGroupModal from '@/pages/pasture-wrapper/group/new-group'
import { GroupProps } from '@/types/common'
import GroupListCard from '@/pages/pasture-wrapper/group/list-card'
import { RouteUris } from '@/router/config'
import AwePage from '@/pages/components/awe-page'

const TabKey = 'tabKey'

const PastureGroup: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId } = routeProps.match.params
    const tab = Utils.getUrlParam(TabKey) || TabType.List
    const [tabKey, setTabKey] = React.useState(tab)
    const [visible, setVisible] = React.useState(false)
    const [newGroup, setNewGroup] = React.useState<GroupProps | null>(null)

    /**
     * 切换列表
     * @param e
     */
    const onChangeTab = (e: any) => {
        Utils.pushParamsToUrl('tabKey', e.target.value)
        setTabKey(e.target.value)
    }

    /**
     * 新建分组
     */
    const handleNewGroup = () => {
        setVisible(true)
    }

    /**
     * 新建分组成功
     */
    const onNewGroupSuccess = (group: GroupProps) => {
        setVisible(false)
        setNewGroup(group)
        setTimeout(() => {
            setNewGroup(null)
        }, 1000)
    }

    /**
     * 查看分组详情
     * @param group
     */
    const onCheckGroup = (group: GroupProps) => {
        console.log(group)
        routeProps.history.push(RouteUris.PastureGroupDetail(pastureId, group.id))
    }

    /**
     * 编辑分组
     * @param group
     */
    const onEditGroup = (group: GroupProps) => {
        console.log(group)
        routeProps.history.push(RouteUris.PastureGroupEdit(pastureId, group.id))
    }

    const onDeleteGroup = (group: GroupProps) => {
        console.log(group)
    }

    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.group_management}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const infoItems: PageHeaderDataItem[] = [{ mainText: '10', subText: useLanguage.group_total }]

    const listRadio = [
        { label: useLanguage.list_mode, value: TabType.List },
        { label: useLanguage.card_mode, value: TabType.Card },
    ]

    const radio = (
        <>
            <Radio.Group
                optionType="button"
                value={tabKey}
                options={listRadio}
                onChange={onChangeTab}
            />

            <span>
                <Button onClick={handleNewGroup}>{useLanguage.new_group}</Button>
            </span>
        </>
    )

    return (
        <AwePage nav={nav} header={<PageHeaderData infoItems={infoItems} />}>
            <AwePage header={radio} hdColor={true} noPadding={true} isHPadding={true}>
                {tabKey === TabType.List ? (
                    <GroupListTable
                        newGroup={newGroup}
                        onEditGroup={onEditGroup}
                        onCheckGroup={onCheckGroup}
                        onDeleteGroup={onDeleteGroup}
                    />
                ) : (
                    <GroupListCard
                        newGroup={newGroup}
                        onCheckGroup={onCheckGroup}
                        onDeleteGroup={onDeleteGroup}
                    />
                )}
            </AwePage>

            <NewGroupModal
                visible={visible}
                onMainEvent={onNewGroupSuccess}
                onClose={() => setVisible(false)}
            />
        </AwePage>
    )
}

export default PastureGroup
