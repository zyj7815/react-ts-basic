import React from 'react'
import AwePage from '@/components/awe-page'
import { useLanguage } from '@/language/useLanguage'

const DeviceAnimal: React.FC = props => {
    return (
        <div className="main-device-header__item beauty-radius beauty-shadow">
            <AwePage
                className="main-device__animal"
                footer={
                    <footer className="main-device__animal--status">
                        <span>发情</span>
                        <span>生病</span>
                        <span>已怀孕</span>
                        <span>已怀孕</span>
                        <span>已怀孕</span>
                    </footer>
                }
            >
                <main className="main-device__animal--content">
                    <aside>
                        <img alt="" />
                    </aside>

                    <article>
                        <div>
                            <span className="beauty-primary">{useLanguage.nickname}：</span>xxx
                        </div>
                        <div>
                            <span className="beauty-primary">{useLanguage.species}：</span>xxx
                        </div>
                        <div>
                            <span className="beauty-primary">{useLanguage.gender}：</span>xxx
                        </div>
                    </article>

                    <article>
                        <div>
                            <span className="beauty-primary">{useLanguage.age}：</span>xxx
                        </div>
                        <div>
                            <span className="beauty-primary">{useLanguage.weight}：</span>xxx
                        </div>
                        <div>
                            <span className="beauty-primary">{useLanguage.remark}：</span>xxx
                        </div>
                    </article>
                </main>
            </AwePage>
        </div>
    )
}

export default DeviceAnimal
