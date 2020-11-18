import React from 'react'
import { MultiPieChart } from '@/utils/charts'
import AwePage from '@/pages/components/awe-page'
import './index.less'

const PastureDetail: React.FC = props => {
    const chartRef: any = React.useRef()

    React.useEffect(() => {
        const pie = new MultiPieChart('animal-chart')
        pie.onDraw()

        const div: any = document.getElementById('animal-chart')
        const ul = div.childNodes.item(0)
        const lis = ul.childNodes

        console.log(lis)
    }, [chartRef.current])

    return (
        <AwePage>
            <div id="animal-chart" style={{ width: '40%', height: 560 }} ref={chartRef} />
        </AwePage>
    )
}

export default PastureDetail
