import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { RadioTrue } from '@/assets/images/icon'

const pastureTypes = [
    useLanguage.captivity_pasture,
    useLanguage.free_range_pasture,
    useLanguage.inventory_free_range_pasture,
    useLanguage.free_range_captivity_pasture,
]

const FirstStepScene: React.FC = props => {
    const changePastureType = (e: any) => {
        console.log(e.target.offsetLeft)
        console.log(e.target.getBoundingClientRect().left)
    }

    return (
        <div className="new-pasture-scene">
            <header className="new-pasture-scene__type">
                <span className="new-pasture-scene__type--title">{useLanguage.pasture_type}</span>

                {pastureTypes.map((type: string) => (
                    <span
                        key={type}
                        className="new-pasture-scene__type--radio"
                        onClick={changePastureType}
                    >
                        <img src={RadioTrue} alt="" />
                        {type}
                    </span>
                ))}
            </header>

            <article className="new-pasture-scene__description">dpqwdkopqwkdpoqkwpdoqwd</article>
        </div>
    )
}

export default FirstStepScene
