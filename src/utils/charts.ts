import Highcharts from 'highcharts'
import ChartModuleMore from 'highcharts/highcharts-more.js'
import HCSoldGauge from 'highcharts/modules/solid-gauge'

ChartModuleMore(Highcharts)
HCSoldGauge(Highcharts)

// 默认三种颜色
const defaultPieColor: string[] = ['#3EC6AD', '#F2E43C', '#556BE0']

class AweChart {
    // 容器名称
    public container: string = ''
    // 数据
    public seriesData: any[] = []
    // date
    public date: any[] = []

    public title: string = ''

    public color: string[] = []

    public subTitle: string = ''

    public legend: any = {}

    constructor(container: string) {
        this.container = container
    }
}

export class LineChart extends AweChart {
    /**
     * 画曲线
     */
    public onDraw() {
        if (!this.container) return

        const series: any[] = [
            {
                name: this.title,
                data: this.seriesData,
            },
        ]

        Highcharts.chart(
            this.container,
            {
                title: {
                    text: this.title,
                },
                chart: {
                    backgroundColor: '',
                    type: 'areaspline',
                    zoomType: 'x', // x轴进行缩放/
                },
                tooltip: {
                    shared: true,
                    headerFormat: '{point.x: %m-%d %H:%M:%S}<br>',
                },
                colors: this.color || ['#80bdec'],
                legend: {
                    enabled: false,
                    itemStyle: {},
                },
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.2,
                        lineWidth: 2,
                        states: {
                            hover: {
                                lineWidth: 3,
                            },
                        },
                        marker: {
                            enabled: false,
                        },
                        pointInterval: 3600000,
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '',
                    },
                    labels: {
                        style: {},
                    },
                },
                xAxis: {
                    type: 'datetime',
                    breaks: [{ breakSize: 0 }],
                    dateTimeLabelFormats: {
                        day: '%m/%e',
                        hour: '%H:%M',
                        millisecond: '%H:%M:%S',
                        minute: '%H:%M',
                        month: '%Y年%m月',
                        second: '%H:%M:%S',
                        week: '%m月%e日',
                        year: '%Y年',
                    },
                    labels: {
                        style: {},
                    },
                },
                series: series,
            },
            (e: any) => {
                // 设置最大值，加大曲线和顶部的距离
                const max = Math.max(...e.series[0].yData) * 1.5
                e.yAxis[0].setExtremes(0, max)
            }
        )
    }
}

export class MultiPieChart extends AweChart {
    public onDraw() {
        if (!this.container) return

        const colorArr: string[] = ['#16B351', '#EBD74D', '#E26D6D']

        const series: any[] = [
            {
                name: '已安装/生物总数',
                //这里不支持color属性
                data: [
                    {
                        color: colorArr[0],
                        radius: '100%',
                        innerRadius: '80%',
                        y: 80,
                    },
                ],
            },
            {
                name: '生病/生物总数',
                data: [
                    {
                        //只能通过这里设置color属性
                        color: colorArr[1],
                        radius: '75%',
                        innerRadius: '60%',
                        y: 60,
                    },
                ],
            },
            {
                name: '异常生物数/总生物数',
                data: [
                    {
                        //只能通过这里设置color属性
                        color: colorArr[2],
                        radius: '55%',
                        innerRadius: '45%',
                        y: 70,
                    },
                ],
            },
        ]

        Highcharts.chart(this.container, {
            title: {
                text: '',
            },
            chart: {
                type: 'solidgauge',
            },
            legend: {
                verticalAlign: 'middle',
                align: 'center',
                layout: 'vertical',
                itemHoverStyle: {
                    color: '#666',
                },
                squareSymbol: false,
                symbolRadius: 0,
                itemStyle: {
                    color: '#666',
                },
                symbolWidth: 0, // 图标宽度
                useHTML: true,
                labelFormatter: function() {
                    return `<div class="chart-pie-legend">
                            <div class="chart-pie-legend__data" style="color: ${
                                colorArr[this.index]
                            }">123/234</div>
                            <div class="chart-pie-legend__name">${this.name}</div>
                            <div style="height: 8px" />
                        </div>`
                },
            },
            tooltip: {
                enabled: false,
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [
                    {
                        outerRadius: '100%',
                        innerRadius: '80%',
                        backgroundColor: '#f6f6f6',
                        borderWidth: 0,
                    },
                    {
                        outerRadius: '75%',
                        innerRadius: '60%',
                        backgroundColor: '#f6f6f6',
                        borderWidth: 0,
                    },
                    {
                        outerRadius: '55%',
                        innerRadius: '45%',
                        backgroundColor: '#f6f6f6',
                        borderWidth: 0,
                    },
                ],
            },
            yAxis: {
                visible: false,
                min: 0,
                max: 100,
                lineWidth: 0,
                //tickPositions: []
            },
            plotOptions: {
                solidgauge: {
                    showInLegend: true,
                    dataLabels: {
                        enabled: false,
                    },
                },
            },
            series: series,
        })
    }
}
