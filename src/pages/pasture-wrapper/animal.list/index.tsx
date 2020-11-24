import React from 'react'
import AwePage from '@/components/awe-page'
import { Button, Pagination, Table } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { RouteUris } from '@/router/config'
import { AweRouteProps } from '@/types/route'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { ServiceTip } from '@/service'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Helper } from '@/helper'
import { animalColumns } from '@/pages/pasture-wrapper/animal.list/columns'
import axios from 'axios'
import { AnimalProps } from '@/model'

const AnimalList: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId } = routeProps.match.params
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [dataSource, setDataSource] = React.useState<AnimalProps[]>([])
    let { pageNumber, pageSize } = ServiceTip.getPageFromUrl()
    const scrollY = useWindowSize() - 240

    React.useEffect(() => {
        fetchData()
    }, [forceUpdate])

    /**
     * 获取生物列表
     */
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
            errorMessage.alert(err)
            setLoading(false)
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
     * 新建生物
     */
    const handleNewAnimal = () => {
        routeProps.history.push(RouteUris.PastureAnimalNew(pastureId))
    }

    /**
     * 查看生物详情
     */
    const handleAnimalDetail = (animal: AnimalProps) => {
        routeProps.history.push(RouteUris.AnimalDetail(pastureId, animal.id))
    }

    /**
     * 查看异常
     * @param animal
     */
    const handleAbnormal = (animal: AnimalProps) => {}

    /**
     * 查看分组
     * @param animal
     */
    const handleGroup = (animal: AnimalProps) => {}

    /**
     * 查看设备
     * @param animal
     */
    const handleDevice = (animal: AnimalProps) => {
        if (animal.device_id) {
            routeProps.history.push(RouteUris.PastureDeviceDetail(pastureId, animal.device_id))
        }
    }

    const header = (
        <>
            <span />
            <span>
                <Button onClick={handleNewAnimal}>{useLanguage.new_card}</Button>
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
        <AwePage
            header={header}
            footer={footer}
            isHShadow={true}
            isHPadding={true}
            hdColor={true}
            ctColor={true}
        >
            <Table
                pagination={false}
                loading={loading}
                scroll={{ x: 1220, y: scrollY }}
                dataSource={dataSource}
                columns={animalColumns({
                    onCheckDetailEvent: handleAnimalDetail,
                    onCheckAbnormal: handleAbnormal,
                    onCheckGroup: handleGroup,
                    onCheckDevice: handleDevice,
                })}
            />
        </AwePage>
    )
}

export default AnimalList
