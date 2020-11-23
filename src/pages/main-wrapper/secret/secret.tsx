import React from 'react'
import AwePage from '@/pages/components/awe-page'
import { Button, Pagination, Table } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'
import { SecretProps } from '@/types/common'
import { ServiceTool } from '@/utils/service-tool'
import { useWindowSize } from '@/hooks/useWindowSzie'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { secretColumns } from '@/pages/main-wrapper/secret/columns'
import AweConfirm from '@/components/awe-confirm'
import './secret.less'

const MainKey: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [dataSource, setDataSource] = React.useState<SecretProps[]>([])
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [visible, setVisible] = React.useState(false)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [currentSecretId, setCurrentSecretId] = React.useState('')
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

    const handleSecretDetail = (device: SecretProps) => {
        routeProps.history.push(RouteUris.MainDeviceDetail(device.id))
    }

    const handleOk = () => {
        setVisible(false)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleDeleteSecret = () => {
        setVisible(true)
    }

    const header = (
        <>
            <span />
            <Button>{useLanguage.create_key}</Button>
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
                    columns={secretColumns({
                        onCheckDetailEvent: handleSecretDetail,
                        currentId: currentSecretId,
                        onDeleteEvent: handleDeleteSecret,
                    })}
                    onRow={(record, index) => {
                        return {
                            onMouseEnter: () => setCurrentSecretId(record.id),
                            onMouseLeave: () => setCurrentSecretId(''),
                        }
                    }}
                />
                <AweConfirm visible={visible} onConfirm={handleOk} onCancel={handleCancel} />
            </main>
        </AwePage>
    )
}

export default MainKey
