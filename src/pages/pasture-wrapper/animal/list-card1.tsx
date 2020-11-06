import React from 'react'
import { Col, Row, Spin } from 'antd'
import ActiveAnimalCard from '@/pages/components/active-animal-card'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { AnimalProps } from '@/types/animal'

const AnimalListCard1: React.FC = props => {
    const pageSize = 20

    let list: any = null
    let pageNumber: number = 1
    let isFinished = false // 数据请求完成，结束请求

    const listContent: any = React.useRef()
    const [loading, setLoading] = React.useState(true)
    const [dataSource, setDataSource] = React.useState<AnimalProps[]>([])

    React.useEffect(() => {
        if (!list) {
            list = listContent.current
        }

        // 进入页面第一次，请求数据
        fetchData()

        if (list) {
            list.addEventListener('scroll', () => {
                const isBottom = useBottom()
                if (isBottom) {
                    fetchData()
                }
            })
        }

        return () => {
            list.removeEventListener('scroll', () => {})
        }
    }, [])

    const fetchData = async () => {
        if (isFinished) return

        try {
            setLoading(true)
            const res = await axios.get(
                Api.biological.list,
                Token.pageToken(pageSize, (pageNumber - 1) * pageSize)
            )

            setLoading(false)
            setDataSource(dataSource => dataSource.concat(res.data))

            // 如果数据刚好返回了pageSize条，那么表示还有下一页
            if (res.data.length === pageSize) {
                pageNumber = pageNumber + 1
                // 判断是否满屏，如果没有满屏就请求下一页
                if (useBottom()) {
                    fetchData()
                }
            } else {
                isFinished = true
            }
        } catch (err) {
            setLoading(false)
            errorMessage.alert(err)
        }
    }

    /**
     * 判断滚动到底部
     */
    const useBottom = () => {
        const { scrollTop, clientHeight, scrollHeight } = list

        if (scrollTop + clientHeight === scrollHeight) {
            return true
        } else {
            return false
        }
    }

    return (
        <main className="awe-page-card__layout" ref={listContent}>
            <Row>
                {dataSource.map((animal: AnimalProps) => {
                    return (
                        <Col key={animal.id} sm={24} md={12} lg={8} xl={8} xxl={6}>
                            <ActiveAnimalCard data={animal} />
                        </Col>
                    )
                })}
            </Row>
            <Spin spinning={loading}>
                <div style={{ height: 100 }} />
            </Spin>
        </main>
    )
}

export default React.memo(AnimalListCard1)
