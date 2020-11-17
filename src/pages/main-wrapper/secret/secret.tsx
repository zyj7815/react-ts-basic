import React, { useState } from 'react'
import AwePage from '@/pages/components/awe-page'
import { Button, Pagination, Table } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import './secret.less'
import { RouteUris } from '@/router/config'
import { KeyProps } from '@/types/common'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { keyColumns } from '@/pages/main-wrapper/secret/columns'

const MainKey: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [currentRoleId, setCurrentRoleId] = React.useState('')
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

    const handleKeyDetail = (device: KeyProps) => {
        routeProps.history.push(RouteUris.MainDeviceDetail(device.id))
    }

    const header = (
        <>
            <span></span>
            <Button className={'create_key_btn'}>{useLanguage.create_key}</Button>
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
        >
            <main id={'secret'}>
                <Table
                    rowKey="id"
                    loading={loading}
                    dataSource={dataSource}
                    pagination={false}
                    scroll={{ x: 900, y: scrollY }}
                    columns={keyColumns({
                        onCheckKey: handleKeyDetail,
                        currentRoleId: currentRoleId,
                    })}
                    onRow={(record, index) => {
                        return {
                            onMouseEnter: () => setCurrentRoleId(record.id),
                            onMouseLeave: () => setCurrentRoleId(''),
                        }
                    }}
                />
            </main>
        </AwePage>
    )
}

export default MainKey
