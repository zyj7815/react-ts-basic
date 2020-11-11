import React from 'react'
import { PastureStepProps } from '@/pages/main-wrapper/pasture/new/index'
import { Button } from 'antd'
import { useLanguage } from '@/language/useLanguage'

export const ThirdStepLocation: React.FC<PastureStepProps> = (props: PastureStepProps) => {
    return (
        <article className="new-pasture__content">
            <section className="new-pasture-location">qwdqw</section>

            <footer className="new-pasture-footer awe-footer-action">
                <Button onClick={props.onPreStep}>{useLanguage.last_step}</Button>
                <Button type="primary" onClick={props.onNextStep}>
                    {useLanguage.confirm}
                </Button>
            </footer>
        </article>
    )
}
