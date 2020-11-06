import React from 'react'
import { Col, Row, Spin } from 'antd'
import GroupCard from '@/pages/pasture-wrapper/group/group-card'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { GroupProps } from '@/types/animal'

interface GroupListCardProps {
    newGroup: GroupProps | null
    onCheckGroup: (group: GroupProps) => void
    onDeleteGroup: (group: GroupProps) => void
}

const GroupListCard1: React.FC<GroupListCardProps> = (props: GroupListCardProps) => {
    let list: any = null
    const listContent: any = React.useRef()
    const [dataSource, setDataSource] = React.useState<GroupProps[]>([])
    const [loading, setLoading] = React.useState(true)

    const pageSize = 20
    let pageNumber: number = 1
    let isFinished = false // 数据请求完成，结束请求

    React.useEffect(() => {
        if (props.newGroup) {
            // 新增分组
            const dataList = [...dataSource]
            if (!isFinished) {
                // 由于新增了数据，前端是手动在第一位新增，而服务器数据则被向后推了1位，
                // 所以删除当前的最后一个数据，而这条数据将在下一次请求时获得
                dataList.pop()
            }
            setDataSource([props.newGroup, ...dataList])
        } else {
            if (!list) {
                list = listContent.current
            }

            // 进入页面第一次，请求数据
            if (useBottom()) {
                fetchData()
            }

            if (list) {
                list.addEventListener('scroll', () => {
                    const isBottom = useBottom()
                    if (isBottom) {
                        fetchData()
                    }
                })
            }
        }

        return () => {
            if (list) {
                list.removeEventListener('scroll', () => {})
            }
        }
    }, [props.newGroup])

    const fetchData = async () => {
        if (isFinished) return

        try {
            setLoading(true)
            const res = await axios.get(
                Api.group.list,
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
                {dataSource.map((group: any) => {
                    return (
                        <Col key={group.id} sm={24} md={12} lg={8} xl={8} xxl={6}>
                            <GroupCard
                                data={group}
                                onCheckGroup={props.onCheckGroup}
                                onDeleteGroup={props.onDeleteGroup}
                            />
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

export default React.memo(GroupListCard1)
