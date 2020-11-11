import React from 'react'
import { AweNavPage } from '@/pages/components/page-nav'
import { Breadcrumb, Button, Steps } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { FirstStepScene } from '@/pages/main-wrapper/pasture/new/step-first-scene'
import { SecondStepInfo } from '@/pages/main-wrapper/pasture/new/step-second-info'
import { ThirdStepLocation } from '@/pages/main-wrapper/pasture/new/step-third-location'
import { LastStepFinish } from '@/pages/main-wrapper/pasture/new/step-last-finish'
import {
    NewPastureContext,
    PastureInfoProps,
    PastureLocationProps,
} from '@/pages/main-wrapper/pasture/new/context'
import './index.less'
import { AweRouteProps } from '@/types/route'

export interface PastureStepProps {
    onNextStep?: () => void
    onPreStep?: () => void
}

const { Step } = Steps

const steps = [
    useLanguage.select_sence,
    useLanguage.enter_info,
    useLanguage.select_locaiton,
    useLanguage.finish,
]

const NewPasture: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const [current, setCurrent] = React.useState(4)
    const [pastureType, setPastureType] = React.useState(1)
    const [information, setInformation] = React.useState<PastureInfoProps | null>(null)
    const [location, setLocation] = React.useState<PastureLocationProps | null>(null)

    const handleNext = () => {
        if (current === 4) {
            routeProps.history.goBack()
        } else {
            setCurrent(current + 1)
        }
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
        <NewPastureContext.Provider
            value={{
                pastureType,
                setPastureType,
                information,
                setInformation,
                location,
                setLocation,
            }}
        >
            <AweNavPage nav={nav}>
                <article className="awe-page-wrapper">
                    <section className="new-pasture-wrapper">
                        <header className="new-pasture__step">
                            <Steps current={current - 1}>
                                {steps.map((item: string, index: number) => (
                                    <Step key={index} title={item} />
                                ))}
                            </Steps>
                        </header>

                        {current === 1 && <FirstStepScene onNextStep={handleNext} />}
                        {current === 2 && (
                            <SecondStepInfo onPreStep={handlePrev} onNextStep={handleNext} />
                        )}
                        {current === 3 && (
                            <ThirdStepLocation onPreStep={handlePrev} onNextStep={handleNext} />
                        )}
                        {current === 4 && <LastStepFinish onNextStep={handleNext} />}
                    </section>
                </article>
            </AweNavPage>
        </NewPastureContext.Provider>
    )
}

export default NewPasture
