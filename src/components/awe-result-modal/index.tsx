import React from 'react'
import { Modal, Button } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import './index.less'

interface AweResultProps {
    title: string
    content: string
    visible: boolean
    onClose: () => void
}

const AweResultModal: React.FC<AweResultProps> = (props: AweResultProps) => {
    return (
        <Modal
            title={useLanguage.processed_result}
            visible={props.visible}
            onCancel={props.onClose}
            footer={[
                <Button key={1} type="primary" onClick={() => props.onClose()}>
                    {useLanguage.got_it}
                </Button>,
            ]}
        >
            AweResultModal
        </Modal>
    )
}

export default AweResultModal
