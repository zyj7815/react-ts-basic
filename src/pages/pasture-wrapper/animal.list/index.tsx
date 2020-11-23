import React from 'react'
import AwePage from '@/pages/components/awe-page'
import { Button, Pagination, Table } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { RouteUris } from '@/router/config'
import { AweRouteProps } from '@/types/route'
import { useWindowSize } from '@/hooks/useWindowSzie'
import { ServiceTool } from '@/utils/service-tool'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { Utils } from '@/utils'
import { animalColumns } from '@/pages/pasture-wrapper/animal.list/columns'
import axios from 'axios'
import { AnimalProps } from '@/types/common'

const AnimalList: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId } = routeProps.match.params
    const [loading, setLoading] = React.useState(false)
    const [total, setTotal] = React.useState(0)
    const [forceUpdate, setForceUpdate] = React.useState(false)
    const [dataSource, setDataSource] = React.useState<any[]>([])
    let { pageNumber, pageSize } = ServiceTool.getPageFromUrl()
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
        Utils.pushMultiParamsToUrl({
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
                scroll={{ x: 1020, y: scrollY }}
                dataSource={dataSource}
                columns={animalColumns({
                    onCheckDetailEvent: handleAnimalDetail,
                })}
            />
        </AwePage>
    )
}

export default AnimalList
