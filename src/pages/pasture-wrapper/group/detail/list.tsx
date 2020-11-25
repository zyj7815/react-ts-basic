import React from 'react'
import { Breadcrumb, Button, Pagination, Table } from 'antd'
import { animalColumns } from '@/pages/pasture-wrapper/animal.list/columns'
import { AweProgress } from '@/components/awe-progress'
import AwePage from '@/components/awe-page'
import { useLanguage } from '@/language/useLanguage'
import { AnimalProps, GroupProps } from '@/model'
import { ServiceTip } from '@/service'
import { Helper } from '@/helper'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { useWindowSize } from '@/hooks/useWindowSzie'
import './index.less'

export enum GroupListStatus {
    // 详情状态
    GroupListDetailStatus = 1,
    // 分配生物
    GroupListAllocationStatus,
    // 移除生物
    GroupListRemoveStatus,
}

interface GroupAnimalListProps {
    api: string
    groupId: string
    listStatus: GroupListStatus
    action: React.ReactNode
    rowSelection: any
    cRef?: any
}

const GroupAnimalList: React.FC<GroupAnimalListProps> = (props: GroupAnimalListProps) => {
    const [groupInfo, setGroupInfo] = React.useState<GroupProps | null>(null)
    const [dataSource, setDataSource] = React.useState<AnimalProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    let { pageNumber, pageSize } = ServiceTip.getPageFromUrl()
    const scrollY = useWindowSize() - 265

    React.useEffect(() => {
        if (!groupInfo) {
            fetchGroupData()
        }
        fetchData()
    }, [forceUpdate])

    React.useImperativeHandle(props.cRef, () => ({
        // 刷新列表
        onUpdateList: () => {
            setForceUpdate(!forceUpdate)
        },
        // 刷新分组信息
        onUpdateGroup: () => {
            fetchGroupData()
        },
    }))

    const fetchGroupData = async () => {
        try {
            const res = await axios.get(Api.group.detail(props.groupId), Token.data)
            setGroupInfo(res.data)
        } catch (err) {
            errorMessage.alert(err)
        }
    }

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                props.api,
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
        Helper.pushMultiParamsToUrl({
            pageSize,
            pageNumber,
        })
        setForceUpdate(!forceUpdate)
    }

    const nav = (
        <Breadcrumb>
            <Breadcrumb.Item>
                <a>{useLanguage.group_management}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.group_detail}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const header = (
        <>
            <header className={'header-box'}>
                <div className={'header-group-info'}>
                    <span>{useLanguage.group_name}：</span>
                    <span className="header-group-info__desc">
                        {groupInfo ? groupInfo.room_name : ''}
                    </span>
                </div>
                <div className={'header-group-info'}>
                    <span>{useLanguage.remark}：</span>
                    <span className="header-group-info__desc">
                        {groupInfo ? groupInfo.description : ''}
                    </span>
                </div>
            </header>

            <span className="awe-btn-box">{props.action}</span>
        </>
    )

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

    return (
        <AwePage
            hdColor={true}
            ctColor={true}
            isHPadding={true}
            isHShadow={true}
            header={header}
            footer={footer}
            nav={nav}
            id="pasture-group-detail"
        >
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 900, y: scrollY }}
                rowSelection={props.rowSelection}
                columns={animalColumns({
                    hiddenGroup: true,
                })}
            />
        </AwePage>
    )
}

export default GroupAnimalList
