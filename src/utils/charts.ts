import Highcharts from 'highcharts'

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

    /**
     * 画曲线
     */
    public onDrawLine() {
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
