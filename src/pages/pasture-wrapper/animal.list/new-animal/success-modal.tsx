import React from 'react'
import { SimpleModalProps } from '../../../../types'
import { Modal, Button } from 'antd'
import { AweIcon, aweIconType } from '../../../../assets/iconfont'
import { useLanguage } from '../../../../language/useLanguage'
import './success-modal.less'
import { AnimalProps } from '@/types/common'

const AnimalSuccessModal: React.FC<SimpleModalProps<AnimalProps>> = (
    props: SimpleModalProps<AnimalProps>
) => {
    const [timer, setTimer] = React.useState(5)
    let interval: any = null

    React.useEffect(() => {
        if (props.visible) {
            if (timer === 5 && !interval) {
                interval = setInterval(() => {
                    setTimer(timer => timer - 1)
                }, 1000)
            } else if (timer === 0) {
                clearInterval(interval)
                interval = null
                // 5秒结束，跳转到生物详情
                props.onClose()
            }
        } else {
            setTimer(5)
        }

        return () => {
            clearInterval(timer)
            interval = null
        }
    }, [props.visible, timer])

    return (
        <Modal
            centered={true}
            title={useLanguage.add_success}
            visible={props.visible}
            onCancel={props.onClose}
            footer={[
                <Button key="a" onClick={() => props.onSubEvent && props.onSubEvent()}>
                    {useLanguage.view_animal_info}
                </Button>,
                <Button key="b" type="primary" onClick={() => props.onMainEvent()}>
                    {useLanguage.bound_device}
                </Button>,
            ]}
        >
            <div className="success-modal">
                <AweIcon type={aweIconType['icon-check-circle']} />

                <div>
                    <strong>{timer} </strong>
                    <span>{useLanguage.auto_goto_page}</span>
                    <strong> {useLanguage.animal_card} </strong>
                    <span>{useLanguage.page}</span>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(AnimalSuccessModal)
