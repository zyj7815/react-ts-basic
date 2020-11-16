import React from 'react'
import { useLanguage } from '@/language/useLanguage'

const DevicePasture: React.FC = props => {
    return (
        <div className="main-device-header__item">
            <main className="main-device__pasture">
                <header className="main-device__pasture--title">牧场名称</header>
                <section className="main-device__pasture--content">
                    <div className="device-pasture__item">
                        <span className="device-pasture__item--title">
                            {useLanguage.animals_number}
                        </span>
                        <span className="device-pasture__item--content">22</span>
                    </div>
                    <div className="device-pasture__item">
                        <span className="device-pasture__item--title">
                            {useLanguage.fence_count}
                        </span>
                        <span className="device-pasture__item--content">33</span>
                    </div>
                    <div className="device-pasture__item">
                        <span className="device-pasture__item--title">
                            {useLanguage.group_number}
                        </span>
                        <span className="device-pasture__item--content">33</span>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default DevicePasture
