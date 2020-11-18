import React, { useState } from 'react'
import { Button, Input, Pagination, Table } from 'antd'
import { AweRouteProps } from '@/types/route'
import { Utils } from '@/utils'
import { useLanguage } from '@/language/useLanguage'
import { GroupProps } from '@/types/common'
import { groupColumns } from './columns'
import AwePage from '@/pages/components/awe-page'
import NewGroupModal from '@/pages/pasture-wrapper/group/new-group'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { RouteUris } from '@/router/config'
import './index.less'

const PastureGroup: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId } = routeProps.match.params
    const [dataSource, setDataSource] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [currentId, setCurrentId] = React.useState('')
    const scrollY = useWindowSize() - 240
    let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()

    React.useEffect(() => {
        fetchData()
    }, [forceUpdate])

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                Api.biological.list,
                Token.pageToken(pageSize, (pageNumber - 1) * pageSize)
            )
            setTotal(parseInt(res.headers['x-result-count']))
            setDataSource(res.data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            errorMessage.alert(err)
        }
    }

    /**
     * 翻页、更改条数操作
     * @param pageNumber
     * @param pageSize
     */
    const onPageChange = (pageNumber: number, pageSize?: number) => {
        Utils.pushMultiParamsToUrl({
            pageSize,
            pageNumber,
        })
        setForceUpdate(!forceUpdate)
    }

    /**
     * 新建分组成功
     */
    const onNewGroupSuccess = (group: GroupProps) => {
        setVisible(false)
        setForceUpdate(!forceUpdate)
    }
    /**
     * 查看分组详情
     * @param group
     */
    const onCheckDetailEvent = (group: GroupProps) => {
        console.log(group)
        routeProps.history.push(RouteUris.PastureGroupDetail(pastureId, group.id))
    }

    /**
     * 编辑分组
     * @param group
     */
    const onEditEvent = (group: GroupProps) => {
        console.log(group)
        routeProps.history.push(RouteUris.PastureGroupEdit(pastureId, group.id))
    }

    const onDeleteEvent = (group: GroupProps) => {
        console.log(group)
    }

    const footer = (
        <Pagination
            showSizeChanger
            pageSize={parseInt(pageSize, 10)}
            current={parseInt(pageNumber, 10)}
            showTotal={total => useLanguage.total_number(total)}
            onChange={onPageChange}
            total={total}
        />
    )
    const header = (
        <>
            <Input
                style={{ width: 200 }}
                className="awe-row-reverse"
                placeholder={useLanguage.search_fence}
                prefix={<AweIcon type={aweIconType['icon-search2']} />}
            />
            <Button
                onClick={() => {
                    setVisible(true)
                }}
            >
                {useLanguage.create_group}
            </Button>
        </>
    )

    return (
        <AwePage
            hdColor={true}
            ctColor={true}
            isHPadding={true}
            isHShadow={true}
            header={header}
            footer={footer}
            id={'pasture-group'}
        >
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 900, y: scrollY }}
                columns={groupColumns({
                    onCheckDetailEvent: onCheckDetailEvent,
                    onEditEvent: onEditEvent,
                    onDeleteEvent: onDeleteEvent,
                    currentId: currentId,
                })}
                onRow={(record, index) => {
                    return {
                        onMouseEnter: () => setCurrentId(record.id),
                        onMouseLeave: () => setCurrentId(''),
                    }
                }}
            />
            <NewGroupModal
                visible={visible}
                onMainEvent={onNewGroupSuccess}
                onClose={() => setVisible(false)}
            />
        </AwePage>
    )
}

export default PastureGroup
