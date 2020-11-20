import React, { useState } from 'react'
import { Breadcrumb, Button, Input, message, Pagination, Radio, Table } from 'antd'
import { AweRouteProps } from '@/types/route'
import { Utils } from '@/utils'
import { useLanguage } from '@/language/useLanguage'
import { DeviceProps, GroupProps } from '@/types/common'
import { groupColumns } from './columns'
import AwePage from '@/pages/components/awe-page'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { RouteUris } from '@/router/config'
import { DeleteModal } from './deleteModal'
import './index.less'
import { AweProgress } from '@/components/awe-progress'
import AddAnimalSuccessModal from '@/pages/pasture-wrapper/group/detail/success-modal'
import EditGroupModal from '@/pages/pasture-wrapper/group/detail/edit-group'

const GroupDetail: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId, groupId } = routeProps.match.params
    const [dataSource, setDataSource] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [visible, setVisible] = React.useState(false)
    const [percent, setPercent] = React.useState(0)
    const [percentVisible, setPercentVisible] = React.useState(false)
    const [successVisible, setSuccessVisible] = React.useState(false)
    const [currentRoleId, setCurrentRoleId] = React.useState('')
    const [addBio, setAddBio] = useState(false)
    const [delBio, setDelBio] = useState(false)
    const [radioValue, setRadioValue] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()
    const [addAll, setAddAll] = useState(0)
    const [failedAnimals, setFailedAnimals] = useState(0)
    let failedAnimalsLength = []
    const [group, setGroup] = React.useState<GroupProps | null>(null)
    const scrollY = useWindowSize() - 240

    React.useEffect(() => {
        fetchData()
        fetchGroupData()
    }, [forceUpdate])

    const fetchGroupData = async () => {
        try {
            const res = await axios.get(Api.group.detail(groupId), Token.data)
            setGroup(res.data)
        } catch (err) {
            errorMessage.alert(err)
        }
    }

    const fetchData = async () => {
        setLoading(true)
        let api = Api.group.biological(groupId)
        if (addBio) {
            api = Api.biological.list
        } else {
            api = Api.group.biological(groupId)
        }
        try {
            const res = await axios.get(api, Token.pageToken(pageSize, (pageNumber - 1) * pageSize))
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
     * 查看分组详情
     * @param group
     */
    const onCheckDetailEvent = (group: GroupProps) => {
        // console.log(group)
        routeProps.history.push(RouteUris.PastureGroupDetail(pastureId, group.id))
    }

    /**
     * 编辑分组
     * @param group
     */
    const onEditEvent = (group: GroupProps) => {
        routeProps.history.push(RouteUris.PastureGroupEdit(pastureId, group.id))
    }

    const onDeleteEvent = (group: GroupProps) => {
        console.log(group)
    }

    const addBiological = () => {
        setAddBio(true)
        setForceUpdate(!forceUpdate)
    }

    const deleteBiological = () => {
        setDelBio(true)
    }

    const onSelectChange = (selectedRowKeys: any) => {
        // console.log(selectedRowKeys)
        setSelectedRowKeys(selectedRowKeys)
    }

    const saveAddBio = () => {
        if (selectedRowKeys.length) {
            if (selectedRowKeys.length === 1) {
                if (addBio) {
                    onCreateSingle(selectedRowKeys[0])
                } else if (delBio) {
                    onCreateSingle(selectedRowKeys[0])
                }
            } else {
                if (addBio) {
                    setPercentVisible(true)
                    onCreateMulti(selectedRowKeys, selectedRowKeys.length)
                } else if (delBio) {
                    setPercentVisible(true)
                    onCreateMulti(selectedRowKeys, selectedRowKeys.length)
                }
            }
        } else {
            message.warn('请选择生物')
        }
    }

    /**
     * 添加删除单个生物
     * @param data
     */
    const onCreateSingle = async (data: any) => {
        setLoading(true)
        try {
            await axios.put(
                addBio
                    ? Api.group.addBiological(groupId, data)
                    : Api.group.delBiological(groupId, data),
                null,
                Token.data
            )
            setLoading(false)
            setAddBio(false)
            setDelBio(false)
            setForceUpdate(!forceUpdate)
            message.success(useLanguage.add_success)
        } catch (err) {
            setLoading(false)
            errorMessage.alert(err)
        }
    }

    /**
     * 添加多个生物
     * @param dataList
     * @param total 创建总数
     */
    const onCreateMulti = async (dataList: any[], total: number) => {
        setAddAll(total)
        if (dataList.length > 0) {
            // 取当前数组第一个生物对象
            const data = dataList.shift()

            try {
                await axios.put(
                    addBio
                        ? Api.group.addBiological(groupId, data)
                        : Api.group.delBiological(groupId, data),
                    null,
                    Token.data
                )
                setPercent(((total - dataList.length) / total) * 100)
                onCreateMulti(dataList, total)
            } catch (e) {
                console.log(e)
                failedAnimalsLength.push(e)
                setPercent(((total - dataList.length) / total) * 100)
                onCreateMulti(dataList, total)
            }
        } else {
            // 创建完成
            setFailedAnimals(failedAnimalsLength.length)
            setPercentVisible(false)
            setAddBio(false)
            setDelBio(false)
            setSuccessVisible(true)
            setForceUpdate(!forceUpdate)
        }
    }

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
        setRadioValue(false)
    }

    const onChangeRadio = (e: any) => {
        setRadioValue(e.target.checked)
    }

    const backGroup = () => {
        routeProps.history.push(RouteUris.PastureGroup(groupId))
    }

    const onEditGroupSuccess = () => {
        setEditVisible(false)
        fetchGroupData()
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
            <header className={'header-box'}>
                <div className={'header-box-group'}>
                    <span>{useLanguage.group_name}：</span>
                    <span className={'header-box-group-text'}>{group && group.room_name}</span>
                </div>
                <div>
                    <span>{useLanguage.remark}：</span>
                    <span className={'header-box-des-text'}>{group && group.description}</span>
                </div>
            </header>
            {addBio || delBio ? (
                <div>
                    <Button className={'header-btn'} onClick={saveAddBio}>
                        {useLanguage.save}
                    </Button>
                    <Button
                        onClick={() => {
                            setAddBio(false)
                            setDelBio(false)
                            setSelectedRowKeys([])
                            setForceUpdate(!forceUpdate)
                        }}
                    >
                        {useLanguage.cancel}
                    </Button>
                </div>
            ) : (
                <div>
                    <Button className={'header-btn'} onClick={addBiological}>
                        {useLanguage.add_creature}
                    </Button>
                    <Button onClick={deleteBiological} danger={true} style={{ marginRight: 16 }}>
                        {useLanguage.delete_animal_new}
                    </Button>
                    <Button
                        className={'header-btn'}
                        onClick={() => {
                            setEditVisible(true)
                        }}
                    >
                        {useLanguage.edit_group}
                    </Button>
                    <Button
                        danger={true}
                        onClick={() => {
                            setVisible(true)
                        }}
                    >
                        {useLanguage.del_group}
                    </Button>
                </div>
            )}
        </>
    )

    const nav = (
        <Breadcrumb>
            <Breadcrumb.Item>
                <a onClick={backGroup}>{useLanguage.group_management}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.group_detail}</Breadcrumb.Item>
            <Breadcrumb.Item>{group ? group.room_name : ''}</Breadcrumb.Item>
        </Breadcrumb>
    )

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    return (
        <AwePage
            hdColor={true}
            ctColor={true}
            isHPadding={true}
            isHShadow={true}
            header={header}
            footer={footer}
            nav={nav}
            id={'pasture-group-detail'}
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
                    currentId: currentRoleId,
                })}
                rowSelection={addBio || delBio ? rowSelection : undefined}
            />
            <DeleteModal
                visible={visible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                onChangeRadio={onChangeRadio}
                radioValue={radioValue}
            />
            <EditGroupModal
                visible={editVisible}
                onMainEvent={onEditGroupSuccess}
                group={group}
                onClose={() => setEditVisible(false)}
            />
            <AweProgress percent={percent} visible={percentVisible} />
            <AddAnimalSuccessModal
                visible={successVisible}
                addAll={addAll}
                failedAnimals={failedAnimals}
                onMainEvent={() => {
                    setSuccessVisible(false)
                }}
                onClose={() => {
                    setForceUpdate(!forceUpdate)
                }}
            />
        </AwePage>
    )
}

export default GroupDetail
