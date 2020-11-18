import React, { useState } from 'react'
import { Button, Modal, Checkbox } from 'antd'
import { useLanguage } from '@/language/useLanguage'

interface CollectionCreateFormProps {
    visible: boolean
    radioValue: boolean
    handleOk: () => void
    handleCancel: () => void
    onChangeRadio: (e: any) => void
}

export const DeleteModal: React.FC<CollectionCreateFormProps> = (event: any) => {
    return (
        <Modal
            visible={event.visible}
            title={useLanguage.confirm_delete}
            bodyStyle={{ paddingBottom: 10 }}
            className={'deleteSecretModal'}
            closable={false}
            width={430}
            footer={[
                <Button key="back" onClick={event.handleCancel}>
                    {useLanguage.cancel}
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    danger={true}
                    disabled={!event.radioValue}
                    onClick={event.handleOk}
                >
                    {useLanguage.delete}
                </Button>,
            ]}
        >
            <section>
                <div className={'confirm-delete-title'}>{useLanguage.delete_confirm}</div>
                <div>
                    <Checkbox onChange={event.onChangeRadio} checked={event.radioValue}>
                        <span className={'confirm-delete-text'}>{useLanguage.confirm_delete}</span>
                    </Checkbox>
                </div>
            </section>
        </Modal>
    )
}
