import React from 'react'
import { Card } from 'antd'
import { useLanguage } from '@/language/useLanguage'

const OverviewMessage: React.FC = props => {
    return (
        <div className="pasture-overview-item">
            <Card title={useLanguage.weather}>
                <main className="pasture-overview-main">
                    <section className="pasture-weather__content">section</section>

                    <footer className="pasture-weather__more">footer</footer>
                </main>
            </Card>
        </div>
    )
}

export default OverviewMessage
