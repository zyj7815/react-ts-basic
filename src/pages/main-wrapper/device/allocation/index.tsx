import React from 'react'
import AwePage from '@/components/awe-page'
import { Button, Layout, Pagination, Table } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { ServiceTip } from '@/service'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Helper } from '@/helper'
import { DeviceProps, PastureProps } from '@/model'
import { deviceColumns } from '@/pages/main-wrapper/device/columns'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import './index.less'

const { Sider, Content } = Layout

const DeviceAllocationPasture: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [currentPastureId, setCurrentPastureId] = React.useState('')
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [selectedDeviceId, setSelectedDeviceId] = React.useState<React.Key[]>([])
    const [pastureData, setPastureData] = React.useState<PastureProps[]>([])
    const [deviceData, setDeviceData] = React.useState<DeviceProps[]>([])
    const scrollY = useWindowSize() - 245
    let { pageNumber, pageSize } = ServiceTip.getPageFromUrl()

    React.useEffect(() => {
        if (!currentPastureId) {
            fetchPastureData()
        } else {
            fetchDeviceData()
        }
    }, [forceUpdate, currentPastureId])

    /**
     * 获取牧场列表
     */
    const fetchPastureData = async () => {
        try {
            const res = await axios.get(Api.biological.list, Token.pageToken(999))
            setPastureData(res.data)
            if (res.data.length) {
                setCurrentPastureId(res.data[0].id)
            }
        } catch (err) {
            errorMessage.alert(err)
        }
    }

    /**
     * 获取设备
     */
    const fetchDeviceData = async () => {
        setLoading(true)

        try {
            const res = await axios.get(
                Api.device.basic,
                Token.pageToken(pageSize, (pageNumber - 1) * pageSize)
            )
            setTotal(parseInt(res.headers['x-result-count']))
            setLoading(false)
            setDeviceData(res.data)
        } catch (e) {
            setLoading(false)
            errorMessage.alert(e)
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

    /**
     * 选择牧场
     */
    const handlePasture = (id: string) => {
        if (id !== currentPastureId) {
            Helper.pushMultiParamsToUrl({
                pageSize,
                pageNumber: 1,
            })
            setCurrentPastureId(id)
            setSelectedDeviceId([])
        }
    }

    /**
     * 勾选设备
     * @param rowKeys
     */
    const onSelectChange = (rowKeys: React.Key[]) => {
        setSelectedDeviceId(rowKeys)
    }

    const header = (
        <>
            <span />
            <span className="awe-btn-box">
                <Button type="primary">{useLanguage.save}</Button>
                <Button onClick={() => routeProps.history.push(RouteUris.MainDevice)}>
                    {useLanguage.cancel}
                </Button>
            </span>
        </>
    )

    const footer = (
        <Pagination
            total={total}
            showSizeChanger
            pageSize={parseInt(pageSize, 10)}
            current={parseInt(pageNumber, 10)}
            showTotal={total => useLanguage.total_number(total)}
            onChange={onPageChange}
        />
    )

    return (
        <AwePage footer={footer} id="device-allocation-wrapper">
            <Layout>
                <Sider theme="light" style={{ marginRight: 10 }}>
                    <ul className="allocation-pasture__list">
                        {pastureData.map((pasture: PastureProps) => (
                            <li
                                key={pasture.id}
                                className="allocation-pasture__list--item"
                                data-select={pasture.id === currentPastureId}
                                onClick={() => handlePasture(pasture.id)}
                            >
                                {pasture.id}
                            </li>
                        ))}
                    </ul>
                </Sider>
                <Content>
                    <AwePage
                        noPadding={true}
                        isHPadding={true}
                        isHShadow={true}
                        hdColor={true}
                        ctColor={true}
                        header={header}
                    >
                        <Table
                            rowKey="id"
                            loading={loading}
                            dataSource={deviceData}
                            pagination={false}
                            scroll={{ x: 1100, y: scrollY }}
                            columns={deviceColumns({})}
                            rowSelection={{
                                selectedRowKeys: selectedDeviceId,
                                onChange: onSelectChange,
                            }}
                        />
                    </AwePage>
                </Content>
            </Layout>
        </AwePage>
    )
}

export default DeviceAllocationPasture
