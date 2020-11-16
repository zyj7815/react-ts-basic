import React from 'react'
import { Button } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { RadioFalse, RadioTrue } from '@/assets/images/icon'
import { PastureStepProps } from '@/pages/main-wrapper/pasture/new/index'
import { ObjectProps } from '@/types'
import { NewPastureContext } from '@/pages/main-wrapper/pasture/new/context'
import AwePage from '@/pages/components/awe-page'

const pastureTypes: ObjectProps[] = [
    {
        key: 1,
        value: useLanguage.captivity_pasture,
    },
    {
        key: 2,
        value: useLanguage.free_range_pasture,
    },
    {
        key: 3,
        value: useLanguage.inventory_free_range_pasture,
    },
    {
        key: 4,
        value: useLanguage.free_range_captivity_pasture,
    },
]

export const FirstStepScene: React.FC<PastureStepProps> = (props: PastureStepProps) => {
    const { pastureType, setPastureType } = React.useContext(NewPastureContext)

    // header
    const headerRef: any = React.useRef()
    const descriptionRef: any = React.useRef()
    // 箭头
    const arrowRef: any = React.useRef()
    // 当前的radio
    const currentRadioRef: any = React.useRef()
    let currentTypeNode: any = null

    React.useEffect(() => {
        setArrowPosition(currentRadioRef.current)

        window.onresize = () => {
            setArrowPosition(currentTypeNode)
        }

        return () => {
            window.onresize = null
        }
    }, [pastureType])

    /**
     * 切换牧场类型
     * @param element
     * @param pastureType 牧场类型
     */
    const changePastureType = (element: any, pastureType: number | string) => {
        setPastureType(parseInt(`${pastureType}`, 10))
    }

    const setArrowPosition = (element: any) => {
        currentTypeNode = element
        // 获取【牧场类型】相对屏幕左侧的位置
        const typeLeft = element.getBoundingClientRect().left
        // 获取【牧场说明】相对屏幕左侧的位置
        const descLeft = descriptionRef.current.getBoundingClientRect().left
        // 计算两个元素的相对距离差值
        //【牧场类型】相对屏幕左侧的位置 -【牧场说明】相对屏幕左侧的位置
        const diffLeft = typeLeft - descLeft

        arrowRef.current.style.left = element.offsetWidth / 2 + diffLeft + 'px'
    }

    const header = (
        <header className="new-pasture-scene__type" ref={headerRef}>
            <span className="new-pasture-scene__type--title">{useLanguage.pasture_type}</span>

            {pastureTypes.map((obj: ObjectProps) => (
                <span
                    ref={obj.key === pastureType ? currentRadioRef : null}
                    key={obj.key}
                    className="new-pasture-scene__type--radio"
                    onClick={e => changePastureType(e.target, obj.key)}
                >
                    {obj.key === pastureType ? (
                        <img src={RadioTrue} alt="" />
                    ) : (
                        <img src={RadioFalse} alt="" />
                    )}
                    {obj.value}
                </span>
            ))}
        </header>
    )

    const footer = (
        <footer className="new-pasture-footer">
            <Button type="primary" onClick={props.onNextStep}>
                {useLanguage.next_step}
            </Button>
        </footer>
    )

    return (
        <AwePage
            id="new-pasture-scene"
            header={header}
            footer={footer}
            isFBorder={true}
            noPadding={true}
        >
            <article className="new-pasture-scene__description" ref={descriptionRef}>
                <span className="new-pasture-scene__description--arrow" ref={arrowRef} />
                dpqwdkopqwkdpoqkwpdoqwd
            </article>
        </AwePage>
    )
}
