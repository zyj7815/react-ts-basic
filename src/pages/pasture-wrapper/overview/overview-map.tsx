import React from 'react'
import { useLanguage } from '@/language/useLanguage'

const OverviewMap: React.FC = props => {
    return (
        <div className="pasture-overview-item beauty-shadow" id="pasture-overview-map">
            <header className="pasture-overview-map__header">
                <div className="pasture-overview-map__header--item" data-line={true}>
                    <strong>120/333</strong>
                    <article>{useLanguage.animal_total}</article>
                </div>
                <div className="pasture-overview-map__header--item" data-line={true}>
                    <strong>43</strong>
                    <article>{useLanguage.fence}</article>
                </div>
                <div className="pasture-overview-map__header--item" data-line={true}>
                    <strong>20</strong>
                    <article>{useLanguage.group}</article>
                </div>
                <div className="pasture-overview-map__header--item">
                    <strong>120/333</strong>
                    <article>{useLanguage.total_of_device}</article>
                </div>
            </header>
        </div>
    )
}

export default OverviewMap
