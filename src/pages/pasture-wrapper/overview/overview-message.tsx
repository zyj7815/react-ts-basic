import React from 'react'
import { useLanguage } from '@/language/useLanguage'

const OverviewMessage: React.FC = props => {
    return (
        <div className="pasture-overview-item beauty-shadow" style={{ height: '31%' }}>
            <header className="pasture-overview-item__header">
                {useLanguage.message_notification}
            </header>
            <section className="pasture-overview-item__content">
                <main className="pasture-overview-message">dqwd</main>
            </section>
        </div>
    )
}

export default OverviewMessage
