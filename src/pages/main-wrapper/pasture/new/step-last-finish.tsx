import React from 'react'
import { Button } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import { PastureStepProps } from '@/pages/main-wrapper/pasture/new/index'
import { useLanguage } from '@/language/useLanguage'
import AwePage from '@/components/awe-page'

export const LastStepFinish: React.FC<PastureStepProps> = (props: PastureStepProps) => {
    const [countDown, setCountDown] = React.useState(3)
    let timer: any = null

    React.useEffect(() => {
        if (countDown === 0) {
            clearInterval(timer)
            timer = null
            props.onNextStep && props.onNextStep()
        } else {
            timer = setInterval(() => {
                setCountDown(countDown => countDown - 1)
            }, 1000)
        }

        return () => {
            clearInterval(timer)
            timer = null
        }
    }, [countDown])

    return (
        <AwePage>
            <section className="new-pasture-finish">
                <aside>
                    <CheckCircleOutlined />
                </aside>

                <main>
                    <h4>{useLanguage.new_success_com()}</h4>
                    <span
                        dangerouslySetInnerHTML={{
                            __html: useLanguage.new_pasture_result(`<strong>${countDown}</strong>`),
                        }}
                    />
                </main>
                <Button type="primary">{useLanguage.got_it}</Button>
            </section>
        </AwePage>
    )
}
