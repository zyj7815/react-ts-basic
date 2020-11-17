import React from 'react'
import { Modal, Checkbox, Button } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import './index.less'

interface AweConfirmProps {
    visible: boolean
    onConfirm: () => void
    onCancel: () => void
}

const AweConfirm: React.FC<AweConfirmProps> = (props: AweConfirmProps) => {
    const [disable, setDisable] = React.useState(true)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (!props.visible) {
            setLoading(false)
            setDisable(true)
        }
    }, [props.visible])

    const handleConfirm = () => {
        setLoading(true)
        props.onConfirm()
    }

    return (
        <Modal
            title={<span className="beauty-danger">{useLanguage.confirm_delete}</span>}
            visible={props.visible}
            centered={true}
            className="awe-confirm-modal"
            width={430}
            footer={[
                <Button key={1} onClick={() => props.onCancel()}>
                    {useLanguage.cancel}
                </Button>,
                <Button
                    key={2}
                    loading={loading}
                    danger={true}
                    disabled={disable}
                    onClick={handleConfirm}
                >
                    {useLanguage.delete}
                </Button>,
            ]}
        >
            <header>{useLanguage.confirm_delete_desc}</header>
            <section>
                <Checkbox checked={!disable} onChange={e => setDisable(!e.target.checked)}>
                    <span className="beauty-danger">{useLanguage.confirm_delete}</span>
                </Checkbox>
            </section>
        </Modal>
    )
}

export default AweConfirm
