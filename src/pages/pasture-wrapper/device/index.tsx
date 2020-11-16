import React from 'react'
import axios from 'axios'
import { DeviceProps } from '@/types/common'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { Pagination, Table, Input, Button, Select } from 'antd'
import { deviceColumns } from '@/pages/pasture-wrapper/device/columns'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import AwePage from '@/pages/components/awe-page'
import './index.less'
const { Search } = Input
const { Option } = Select

const PastureDevice: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
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

    const handleDeviceDetail = (device: DeviceProps) => {
        routeProps.history.push(RouteUris.MainDeviceDetail(device.id))
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
                <Search
                    placeholder={useLanguage.search_device}
                    onSearch={onSearch}
                    style={{ width: 200 }}
                    className={'search-input'}
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
                scroll={{ x: 900, y: scrollY }}
                columns={deviceColumns({
                    onCheckDevice: handleDeviceDetail,
                })}
            />
        </AwePage>
    )
}

export default PastureDevice
