import React from 'react'
import axios from 'axios'
import { DeviceProps, DeviceTypeProps } from '@/types/common'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { Pagination, Table, Input, Button, Select } from 'antd'
import { deviceColumns } from '@/pages/main-wrapper/device/columns'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import AwePage from '@/pages/components/awe-page'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import { rootStore } from '@/provider'

const MainDevice: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState<DeviceProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()
    const scrollY = useWindowSize() - 240

    React.useEffect(() => {
        fetchData()
    }, [forceUpdate])

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(
                Api.device.basic,
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
     * 设备详情
     * @param device
     */
    const handleDeviceDetail = (device: DeviceProps) => {
        routeProps.history.push(RouteUris.MainDeviceDetail(device.id))
    }

    /**
     * 分配农场
     */
    const handleAllocationPasture = () => {
        routeProps.history.push(RouteUris.MainDeviceAllocation)
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
                placeholder={useLanguage.search_device}
                prefix={<AweIcon type={aweIconType['icon-search2']} />}
            />

            <span>
                <Button onClick={handleAllocationPasture}>{useLanguage.allocation_pasture}</Button>
                <span>{useLanguage.filter}：</span>
                <Select
                    placeholder={useLanguage.select_common(useLanguage.device_type)}
                    style={{ minWidth: 180 }}
                >
                    {rootStore.device_type_list.map((deviceType: DeviceTypeProps) => (
                        <Select.Option key={deviceType.id} value={deviceType.id}>
                            {deviceType.name}
                        </Select.Option>
                    ))}
                </Select>
            </span>
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
        >
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 900, y: scrollY }}
                columns={deviceColumns({
                    onCheckDetailEvent: handleDeviceDetail,
                })}
            />
        </AwePage>
    )
}

export default MainDevice
