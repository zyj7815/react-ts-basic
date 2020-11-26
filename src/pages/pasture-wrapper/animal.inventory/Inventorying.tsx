import React from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import { Button, Modal, message, Progress } from 'antd'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { useLanguage } from '@/language/useLanguage'
import { errorMessage } from '@/server/error'
import { PieChart } from '@/service/charts'
import { InventoryLoading } from '@/assets/images'
import { Helper } from '@/helper'
import AwePage from '@/components/awe-page'

const { confirm } = Modal

const InventoryStatus = {
    Inventoring: 0, // 盘点中
    Inventoried: 1, // 盘点结束
    InventoryAbnormal: 2, // 盘点异常
}

/**
 * 计算现在时间 和 上一次盘点开始时间的时间差, 是否大于x分钟
 * @param beginTime 开始时间
 * @param minute 时间差多少分钟
 */
const timeDiffGreater = (beginTime: string, minute: number) => {
    return beginTime ? dayjs().unix() - dayjs(beginTime).unix() > minute * 60 : true
}

export default class Inventorying extends React.Component {
    // 盘点定时器
    inventoryInterval: any = null
    isClickInventory = false // 是否点击了开始盘点（不是刷新页面后的判断盘点），手动点击盘点在没有网关的情况下，要提示

    state = {
        outside_fence: 0,
        inside_fence: 0,
        with_total: 0,
        with_geofence: 0,
        total_biological: 0,
        last_inventory_time: '',
        current_inventory_time: '',
        inventoryStatus: InventoryStatus.Inventoried,
        inventoryId: '',
        loading: false,
        isNoGateway: false, // 当前没有网关进行盘点

        isManualEnd: false, // 是否是手动结束的
        inventoryTotal: 0, // 盘点网关总数
        inventoriedCount: 0, // 已盘点的个数
    }

    componentDidMount() {
        // 获取最近盘点的结果
        this.getCurrentPandianStatus()
    }

    componentWillUnmount() {
        // 页面销毁时，关闭定时器
        clearInterval(this.inventoryInterval)
        this.inventoryInterval = null
    }

    /**
     * 获取当前盘点状态
     */
    getCurrentPandianStatus = () => {
        axios
            .get(Api.biological.inventory.pandian, Token.data)
            .then(res => {
                if (!res.data) {
                    // 如果没有数据，表示没有盘点过，可以执行盘点
                    this.drawInventoryChart()
                } else {
                    let inventoryStatus = res.data.status

                    this.setState({
                        inventoryStatus,
                        inventoryId: res.data.id,
                        current_inventory_time: res.data.begin,
                    })

                    // 获取盘点结果
                    this.getInventoryResult()

                    // 获取上次盘点状态
                    this.getLastInventoryStatus(res.data)

                    // 盘点中的状态，要设置盘点进度
                    if (inventoryStatus === InventoryStatus.Inventoring) {
                        this.setInventoryProgress()
                    }
                }
            })
            .catch(err => {})
    }

    /**
     * 设置盘点进度
     */
    setInventoryProgress = () => {
        // 先强制执行一次
        this.getInventoryProgress()

        if (!this.inventoryInterval) {
            // 每10秒请求1次，获取盘点进度
            this.inventoryInterval = setInterval(() => {
                this.getInventoryProgress()
            }, 10000)
        }
    }

    /**
     * 获取盘点进度
     */
    getInventoryProgress = () => {
        axios
            .get(Api.biological.inventory.pandian, Token.data)
            .then(res => {
                // let inventoringCount = 0; // 正在盘点的个数
                let inventoriedCount = 0 // 已盘点合数
                let inventoryStatus = res.data.status

                // 盘点中
                if (inventoryStatus === InventoryStatus.Inventoring) {
                    // 当有网关时，计算盘点进度
                    if (res.data.gateways && res.data.gateways.length > 0) {
                        const gatewaysList = res.data.gateways

                        // 计算当前所有盘点网关的状态
                        gatewaysList.forEach((gateway: any) => {
                            if (gateway.status !== InventoryStatus.Inventoring) {
                                inventoriedCount++
                            }
                        })

                        this.setState({
                            inventoryStatus,
                            inventoriedCount,
                            inventoryTotal: gatewaysList.length,
                        })
                    } else {
                        this.setState({
                            isNoGateway: true,
                        })
                        if (this.isClickInventory) {
                            setTimeout(() => {
                                message.info(useLanguage.no_gateway_inventory)
                                this.isClickInventory = false
                            }, 500)
                        }
                    }
                }
                // 盘点结束
                else {
                    // 盘点结束后，如果计时器还没有关闭，那么先让进度条显示100%，不然直接就跳到了盘点完成
                    if (this.inventoryInterval) {
                        this.setState({
                            inventoriedCount: res.data.gateways.length,
                        })

                        clearInterval(this.inventoryInterval)
                        this.inventoryInterval = null

                        setTimeout(() => {
                            this.setState(
                                {
                                    inventoryStatus,
                                    inventoryTotal: 0,
                                    inventoriedCount: 0,
                                    current_inventory_time: res.data.begin,
                                },
                                () => {
                                    // 再次获取上次盘点状态，更新所有数据
                                    this.getCurrentPandianStatus()
                                }
                            )
                        }, 1000)
                    }
                }
            })
            .catch(err => {})
    }

    /**
     * 获取上次盘点结果状态，盘点成功/手动盘点
     */
    getLastInventoryStatus = (result: any) => {
        // 判断网关列表，如果有网关还是盘点中，那么证明是手动结束的
        let isManualEnd = false

        // 正常的盘点结果
        if (this.state.inventoryStatus === InventoryStatus.Inventoried) {
            if (result.gateways) {
                result.gateways.forEach((gateway: any) => {
                    if (gateway.status === InventoryStatus.Inventoring) {
                        isManualEnd = true
                    }
                })
            }
        }

        this.setState({
            isManualEnd,
        })
    }

    /**
     * 获取盘点结果
     */
    getInventoryResult = () => {
        axios
            .get(Api.biological.inventory.pandian_result, Token.data)
            .then(res => {
                // 盘点到的生物数量
                const inside_fence = res.data.exist_cnt
                // 离栏 = 可盘点 - 盘点到的
                const outside_fence = res.data.total_cnt - res.data.exist_cnt

                this.setState(
                    {
                        inside_fence,
                        outside_fence,
                        last_inventory_time: res.data.begin,
                        with_total: res.data.total_cnt, // 已监测生物
                    },
                    () => {
                        this.drawInventoryChart()
                    }
                )
            })
            .catch(() => {
                this.drawInventoryChart()
            })
    }

    /**
     * 执行盘点操作
     * 盘点异常和盘点结束，可以直接盘点
     */
    handleStartInventory = () => {
        const _this = this
        Modal.confirm({
            title: useLanguage.note,
            okText: useLanguage.confirm,
            cancelText: useLanguage.cancel,
            content: useLanguage.inventory_start,
            onOk() {
                _this.onStart()
            },
        })
    }

    onStart = () => {
        this.isClickInventory = true

        this.setState({
            loading: true,
        })

        axios
            .post(Api.biological.inventory.pandian, {}, Token.data)
            .then(res => {
                this.setState({
                    loading: false,
                })

                // message.success(window.language.inventory_msg_suc)
                this.getCurrentPandianStatus()
            })
            .catch(() => {
                this.setState({
                    loading: false,
                })
                message.error(useLanguage.inventory_msg_fail)
            })
    }

    /**
     * 中断盘点
     */
    handleBreakOffInventory = () => {
        const that = this
        confirm({
            title: useLanguage.note,
            content: useLanguage.confirm_break_off_inventory,
            onOk() {
                that.onBreakOff()
            },
        })
    }

    /**
     * 执行中断操作
     */
    onBreakOff = () => {
        axios
            .put(Api.biological.inventory.break_off(this.state.inventoryId), {}, Token.data)
            .then(() => {
                this.setState({
                    isNoGateway: false,
                })

                clearInterval(this.inventoryInterval)
                this.inventoryInterval = null

                message.success(useLanguage.count_has_been_stopped)
                this.getCurrentPandianStatus()
            })
            .catch(err => {
                errorMessage.alert(err)
            })
    }

    /**
     * 根据盘点结果画图
     */
    drawInventoryChart = () => {
        const { inside_fence, outside_fence } = this.state

        const titleText = window.isNaN(inside_fence / (inside_fence + outside_fence))
            ? '--%'
            : ((inside_fence / (inside_fence + outside_fence)) * 100).toFixed(1) + '%'

        const colors = ['#3EC6AD', '#ccc']
        const data = [
            [useLanguage.inside_fence, inside_fence],
            [useLanguage.outside_fence, outside_fence],
        ]

        if (inside_fence === 0 && outside_fence === 0) {
            return
        }

        const chart = new PieChart('inventory-pie')
        chart.title = titleText
        chart.colors = colors
        chart.seriesData = data
        chart.subTitle = useLanguage.in_stall_ratio
        chart.legend = {
            enabled: false,
        }
        chart.onDraw(titleText)
    }

    render() {
        const { last_inventory_time, current_inventory_time, inventoryStatus } = this.state
        const strokeColor = timeDiffGreater(current_inventory_time, 8)
            ? { '0%': '#F3B202', '100%': '#F3B202' }
            : { '0%': '#556BE0', '100%': '#B3E0FF' }

        const other = () => {
            if (inventoryStatus === InventoryStatus.Inventoried) {
                return (
                    <span style={{ color: '#ccc', fontSize: 12 }}>
                        * {useLanguage.five_m_cancel}
                    </span>
                )
            } else if (inventoryStatus === InventoryStatus.Inventoring) {
                return (
                    <div style={{ textAlign: 'left' }}>
                        <Progress
                            percent={
                                parseInt(
                                    (
                                        this.state.inventoriedCount / this.state.inventoryTotal
                                    ).toFixed(2),
                                    10
                                ) * 100
                            }
                            strokeColor={strokeColor}
                        />

                        <span className="inventorying-content__desc">
                            {useLanguage.total_gateway_success_total(
                                this.state.inventoryTotal,
                                this.state.inventoriedCount
                            )}
                        </span>

                        {timeDiffGreater(current_inventory_time, 8) && (
                            <div className="abnormal-inventory">
                                {useLanguage.abnormal_inventory}
                            </div>
                        )}
                    </div>
                )
            }
        }

        return (
            <AwePage
                bgColor={true}
                noPadding={true}
                isHPadding={true}
                isHShadow={true}
                header={<div>{useLanguage.inventory}</div>}
                className="animal-inventorying-wrapper"
                mainClass="beauty-radius beauty-shadow"
            >
                <main className="animal-inventorying__main">
                    <div className="inventorying-main__item">
                        <div
                            id="inventory-pie"
                            style={{
                                opacity: inventoryStatus === InventoryStatus.Inventoring ? 0 : 1,
                            }}
                        />
                        {inventoryStatus === InventoryStatus.Inventoring && (
                            <img id="inventory-loading" src={InventoryLoading} alt="" />
                        )}
                    </div>

                    <div className="inventorying-main__item" style={{ margin: '50px 0' }}>
                        {inventoryStatus !== InventoryStatus.Inventoring && (
                            <header className="beauty-center">
                                {useLanguage.last_inventory}：
                                {last_inventory_time
                                    ? Helper.utc2Time(last_inventory_time, 'YYYY-MM-DD HH:mm')
                                    : useLanguage.no_inventory}
                            </header>
                        )}

                        {inventoryStatus !== InventoryStatus.Inventoring && (
                            <section className="inventory-detail beauty-border beauty-shadow beauty-radius">
                                <div className="inventory-detail__content">
                                    <span>
                                        {inventoryStatus === InventoryStatus.InventoryAbnormal
                                            ? '—'
                                            : this.state.inside_fence}
                                    </span>
                                    <span>
                                        <span className="inventory-detail__icon inventory-detail__icon-inside" />
                                        <span>{useLanguage.inside_fence}</span>
                                    </span>
                                </div>

                                <div className="inventory-detail__content">
                                    <span>
                                        {inventoryStatus === InventoryStatus.InventoryAbnormal
                                            ? '-'
                                            : this.state.outside_fence}
                                    </span>
                                    <span>
                                        <span className="inventory-detail__icon inventory-detail__icon-outside" />
                                        <span>{useLanguage.outside_fence}</span>
                                    </span>
                                </div>
                            </section>
                        )}

                        <div
                            className="beauty-center"
                            style={{
                                margin:
                                    inventoryStatus === InventoryStatus.Inventoring
                                        ? '62px 0'
                                        : '10px 0',
                            }}
                        >
                            {other()}
                        </div>

                        <footer className="inventory-footer">
                            {inventoryStatus === InventoryStatus.Inventoring ? (
                                // 5分钟后可终止
                                timeDiffGreater(current_inventory_time, 5) ? (
                                    <Button
                                        danger
                                        block={true}
                                        loading={this.state.loading}
                                        onClick={() => this.handleBreakOffInventory()}
                                    >
                                        {useLanguage.break_off_inventory}
                                    </Button>
                                ) : this.state.isNoGateway ? (
                                    <Button
                                        danger
                                        block={true}
                                        loading={this.state.loading}
                                        onClick={() => this.handleBreakOffInventory()}
                                    >
                                        {useLanguage.break_off_inventory}
                                    </Button>
                                ) : (
                                    <Button id="disable-btn" disabled={true} block={true}>
                                        {useLanguage.inventoring}
                                    </Button>
                                )
                            ) : (
                                <Button
                                    type="primary"
                                    block={true}
                                    loading={this.state.loading}
                                    onClick={this.handleStartInventory}
                                >
                                    {useLanguage.refresh_inventory}
                                </Button>
                            )}
                        </footer>
                    </div>
                </main>
            </AwePage>
        )
    }
}
