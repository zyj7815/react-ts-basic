import React from 'react'
import axios from 'axios'
import { DeviceProps } from '@/model'
import { ServiceTip } from '@/service'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Helper } from '@/helper'
import { Pagination, Table, Input, Button, Select } from 'antd'
import { deviceColumns } from '@/pages/pasture-wrapper/device/columns'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import AwePage from '@/components/awe-page'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import './index.less'

const { Option } = Select

const PastureDevice: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId } = routeProps.match.params
    const [dataSource, setDataSource] = React.useState<DeviceProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    let { pageNumber, pageSize } = ServiceTip.getPageFromUrl()
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
        Helper.pushMultiParamsToUrl({
            pageSize,
            pageNumber,
        })
        setForceUpdate(!forceUpdate)
    }

    /**
     * 查看设备详情
     * @param device
     */
    const handleDeviceDetail = (device: DeviceProps) => {
        routeProps.history.push(RouteUris.PastureDeviceDetail(pastureId, device.id))
    }

    const onSearch = (value: string) => {
        console.log(value)
    }
    const handleChange = (value: any) => {
        console.log(value)
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
        <div className={'header-box'}>
            <div>
                <Input
                    style={{ width: 200 }}
                    className="awe-row-reverse"
                    placeholder={useLanguage.search_device}
                    prefix={<AweIcon type={aweIconType['icon-search2']} />}
                    onChange={e => onSearch(e.target.value)}
                />
            </div>
            <div>
                <span className={'filter-text'}>{useLanguage.filter}:</span>
                <Select
                    defaultValue="all"
                    style={{ width: 142 }}
                    onChange={handleChange}
                    className={'filter-input'}
                >
                    <Option value="all">{useLanguage.all}</Option>
                    <Option value="lucy">{useLanguage.bluetooth_ear_tag}</Option>
                    <Option value="Yiminghe">{useLanguage.full_featured_ear_tags}</Option>
                    <Option value="fixed">{useLanguage.fixed_gateway}</Option>
                    <Option value="mobile">{useLanguage.mobile_gateway}</Option>
                    <Option value="no">{useLanguage.no_biological_device_connected}</Option>
                    <Option value="Tag">Tag</Option>
                    <Option value="Ring">Ring</Option>
                </Select>
            </div>
        </div>
    )

    return (
        <AwePage
            hdColor={true}
            ctColor={true}
            isHPadding={true}
            isHShadow={true}
            header={header}
            footer={footer}
            id={'pasture-device'}
        >
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 1000, y: scrollY }}
                columns={deviceColumns({
                    onCheckDetailEvent: handleDeviceDetail,
                })}
            />
        </AwePage>
    )
}

export default PastureDevice
