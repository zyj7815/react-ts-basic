import React from 'react'
import { AweNavPage } from '@/pages/components/page-nav'
import { Breadcrumb, Button, Steps } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import FirstStepScene from '@/pages/main-wrapper/pasture/new/step-first-scene'
import SecondStepInfo from '@/pages/main-wrapper/pasture/new/step-second-info'
import ThirdStepLocation from '@/pages/main-wrapper/pasture/new/step-third-location'
import './index.less'
import LastStepFinish from '@/pages/main-wrapper/pasture/new/step-last-finish'

const { Step } = Steps
const steps = [
    useLanguage.select_sence,
    useLanguage.enter_info,
    useLanguage.select_locaiton,
    useLanguage.finish,
]

const NewPasture: React.FC = props => {
    const [current, setCurrent] = React.useState(1)

    const handleNext = () => {
        setCurrent(current + 1)
    }

    const handlePrev = () => {
        setCurrent(current - 1)
    }

    const nav = (
        <Breadcrumb className="awe-page-breadcrumb">
            <Breadcrumb.Item>{useLanguage.pasture_management}</Breadcrumb.Item>
            <Breadcrumb.Item>{useLanguage.new_pasture}</Breadcrumb.Item>
        </Breadcrumb>
    )

    return (
        <AweNavPage nav={nav}>
            <article className="awe-page-wrapper">
                <section className="awe-page-content">
                    <main className="awe-page__layout awe-display">
                        <section className="awe-display__content new-pasture-wrapper">
                            <header className="new-pasture__step">
                                <Steps current={current - 1}>
                                    {steps.map((item: string, index: number) => (
                                        <Step key={index} title={item} />
                                    ))}
                                </Steps>
                            </header>

                            <article className="new-pasture__content">
                                {current === 1 && <FirstStepScene />}
                                {current === 2 && <SecondStepInfo />}
                                {current === 3 && <ThirdStepLocation />}
                                {current === 4 && <LastStepFinish />}
                            </article>
                        </section>

                        {current < 4 && (
                            <footer className="awe-display__footer awe-footer-action">
                                {current > 1 && (
                                    <Button onClick={handlePrev}>{useLanguage.last_step}</Button>
                                )}
                                <Button type="primary" onClick={handleNext}>
                                    {current >= 3 ? useLanguage.confirm : useLanguage.next_step}
                                </Button>
                            </footer>
                        )}
                    </main>
                </section>
            </article>
        </AweNavPage>
    )
}

export default NewPasture
