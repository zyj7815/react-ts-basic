import React from 'react'
import AwePage from '@/pages/components/awe-page'
import { useLanguage } from '@/language/useLanguage'
import { PieChart } from '@/utils/charts'

const Inventorying: React.FC = props => {
    React.useEffect(() => {
        const inside_fence = 11
        const outside_fence = 12

        const data = [
            [useLanguage.inside_fence, inside_fence],
            [useLanguage.outside_fence, outside_fence],
        ]

        const chart = new PieChart('inventory-pie')
        chart.title = '22%'
        chart.colors = ['#3EC6AD', '#ccc']
        chart.seriesData = data
        chart.subTitle = useLanguage.in_stall_ratio
        chart.legend = {
            enabled: false,
        }
        chart.onDraw('titleText')
    }, [])

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
                <div id="inventory-pie" />
            </main>
        </AwePage>
    )
}

export default Inventorying
