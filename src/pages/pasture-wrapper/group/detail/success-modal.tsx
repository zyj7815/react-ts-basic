import React from 'react'
import { SimpleModalProps } from '@/types'
import { Modal, Button } from 'antd'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import { useLanguage } from '@/language/useLanguage'
import './success-modal.less'
interface ModalProps {
    addAll: number
    failedAnimals: number
    visible: boolean
    loading?: boolean

    // 主按的事件
    onMainEvent: (ary?: any) => void
    // 次要的事件
    onSubEvent?: (arg?: any) => void
    // 关闭
    onClose: () => void
}

const AddAnimalSuccessModal: React.FC<ModalProps> = (props: ModalProps) => {
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
                // 5秒结束，跳转
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
                <Button key="b" type="primary" onClick={() => props.onMainEvent()}>
                    {useLanguage.finish}
                </Button>,
            ]}
        >
            <div className="success-modal">
                <AweIcon type={aweIconType['icon-check-circle']} />

                <div>
                    <div>{useLanguage.add_animal_num(props.addAll)}</div>
                    <div>
                        {useLanguage.add_animal_num_sub(
                            props.addAll - props.failedAnimals,
                            props.failedAnimals
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(AddAnimalSuccessModal)
