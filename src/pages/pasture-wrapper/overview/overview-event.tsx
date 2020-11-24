import React from 'react'
import { Card } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { errorMessage } from '@/server/error'
import axios from 'axios'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { ServiceTip } from '@/service'
import dayjs from 'dayjs'

const OverviewEvent: React.FC = props => {
    const [dataSource, setDataSource] = React.useState<any[]>([])
    React.useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await axios.get(Api.event, Token.pageToken(100))
            setDataSource(res.data)
        } catch (e) {
            errorMessage.alert(e)
        }
    }

    return (
        <div
            className="pasture-overview-item beauty-shadow"
            style={{ height: '32%', minHeight: 220 }}
        >
            <header className="pasture-overview-item__header">{useLanguage.abnormal_event}</header>

            <section className="pasture-overview-item__content">
                <main className="pasture-overview-event">
                    <h4>
                        {useLanguage.abnormal_event_number}：<strong>{dataSource.length}</strong>
                    </h4>
                    {dataSource.map((event: any) => (
                        <div key={event.id} className="pasture-event__item">
                            <span className="pasture-event__item--content">
                                {event.biological_name}
                                {ServiceTip.getAbnormalEvent(event.type)},{' '}
                                {useLanguage.please_focus}
                            </span>
                            <span className="pasture-event__item--date">
                                {dayjs(event.timestamp).format('MM.DD')}
                            </span>
                        </div>
                    ))}
                </main>
            </section>
        </div>
    )
}

export default OverviewEvent
