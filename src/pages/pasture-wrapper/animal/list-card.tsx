import React from 'react'
import axios from 'axios'
import { Row, Col, Spin } from 'antd'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import ActiveAnimalCard from '@/components/active-animal-card'
import { AnimalProps } from '@/types/animal'

interface IState {
    dataSource: any[]
    loading: boolean
}

export default class AnimalListCard extends React.PureComponent<any | IState> {
    private listContent: any = React.createRef()
    private list: any = null

    private pageSize = 20
    private pageNumber: number = 1
    private isEnd = false // 数据请求完成，结束请求

    public state: IState = {
        dataSource: [],
        loading: true,
    }

    public componentDidMount(): void {
        this.list = this.listContent.current

        // 进入页面第一次，请求数据
        if (this.useBottom()) {
            this.fetchData()
        }

        if (this.list) {
            this.list.addEventListener('scroll', () => {
                const isBottom = this.useBottom()
                if (isBottom) {
                    console.log('到底部')

                    this.fetchData()
                }
            })
        }
    }

    /**
     * 判断滚动到底部
     */
    private useBottom = () => {
        const { scrollTop, clientHeight, scrollHeight } = this.list

        if (scrollTop + clientHeight === scrollHeight) {
            return true
        } else {
            return false
        }
    }

    /**
     * 获取数据
     */
    private fetchData = async () => {
        if (this.isEnd) return

        this.setState({
            loading: true,
        })

        try {
            const res = await axios.get(
                Api.biological.list,
                Token.pageToken(this.pageSize, (this.pageNumber - 1) * this.pageSize)
            )
            this.setState({
                loading: false,
                dataSource: this.state.dataSource.concat(res.data),
            })

            // 如果数据刚好返回了pageSize条，那么表示还有下一页
            if (res.data.length === this.pageSize) {
                this.pageNumber = this.pageNumber + 1
                // 判断是否满屏，如果没有满屏就请求下一页
                if (this.useBottom()) {
                    this.fetchData()
                }
            } else {
                this.isEnd = true
            }
        } catch (err) {
            this.setState({
                loading: false,
            })
            errorMessage.alert(err)
        }
    }

    render(): React.ReactNode {
        return (
            <div className="awe-page-card__layout" ref={this.listContent}>
                <Row>
                    {this.state.dataSource.map((animal: AnimalProps) => {
                        return (
                            <Col key={animal.id} sm={24} md={12} lg={8} xl={8} xxl={6}>
                                <ActiveAnimalCard data={animal} />
                            </Col>
                        )
                    })}
                </Row>
                <Spin spinning={this.state.loading}>
                    <div style={{ height: 100 }} />
                </Spin>
            </div>
        )
    }
}
