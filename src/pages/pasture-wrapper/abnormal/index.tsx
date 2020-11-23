import React, { useState } from 'react'
import axios from 'axios'
import { AbnormalProps } from '@/types/common'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { Pagination, Table, Input } from 'antd'
import { abnormalColumns } from '@/pages/pasture-wrapper/abnormal/columns'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import AwePage from '@/pages/components/awe-page'
import { DeviceAbnForm } from './device-abn-form'
import { OdbaAbnForm } from './odba-abn-form'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import './index.less'

const PastureAbnormal: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState<AbnormalProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [deviceAbnVisible, setDeviceAbnVisible] = useState(false)
    const [odbaAbnVisible, setOdbaAbnVisible] = useState(false)
    const [currentId, setCurrentId] = React.useState('')
    const [radioValue, setRadioValue] = useState('a')
    const [nextModal, setNextModal] = useState(false)
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

    const onSearch = (value: string) => {
        console.log(value)
    }
    const handleKeyDetail = (device: any) => {
        routeProps.history.push(RouteUris.MainDeviceDetail(device.id))
    }

    const onCheckProcess = (record: object) => {
        console.log(record)
        setDeviceAbnVisible(true)
    }

    const handleOk = () => {
        setDeviceAbnVisible(false)
    }

    const handleCancel = () => {
        setDeviceAbnVisible(false)
    }

    const handleOdbaNextOk = () => {
        // setOdbaAbnVisible(false)
        setNextModal(true)
    }

    const handleOdbaCancel = () => {
        if (nextModal) {
            setNextModal(false)
        } else {
            setOdbaAbnVisible(false)
        }
    }

    const onChangeRadio = (e: any) => {
        console.log(`radio checked:${e.target.value}`)
    }

    const onChangeOdbaRadio = (e: any) => {
        setRadioValue(e.target.value)
    }

    const header = (
        <>
            <Input
                style={{ width: 200 }}
                className="awe-row-reverse"
                placeholder={useLanguage.search_animal}
                prefix={<AweIcon type={aweIconType['icon-search2']} />}
            />
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
            id={'pasture-abnormal'}
        >
            <Table
                rowKey="id"
                loading={loading}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 900, y: scrollY }}
                columns={abnormalColumns({
                    currentId: currentId,
                    onCheckDetailEvent: handleKeyDetail,
                    onResolveAbnormal: onCheckProcess,
                })}
                onRow={record => {
                    return {
                        onMouseEnter: () => setCurrentId(record.id),
                        onMouseLeave: () => setCurrentId(''),
                    }
                }}
            />
            <DeviceAbnForm
                visible={deviceAbnVisible}
                handleOk={handleOk}
                handleCancel={handleCancel}
                onChangeRadio={onChangeRadio}
            />
            <OdbaAbnForm
                visible={odbaAbnVisible}
                handleOk={handleOdbaNextOk}
                handleCancel={handleOdbaCancel}
                onChangeRadio={onChangeOdbaRadio}
                radioValue={radioValue}
                nextModal={nextModal}
            />
        </AwePage>
    )
}

export default PastureAbnormal
