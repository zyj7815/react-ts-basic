import React, { useState } from 'react'
import { Button, Modal, Input, Checkbox } from 'antd'
import { useLanguage } from '@/language/useLanguage'
const { TextArea } = Input

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
            className={'deleteGroupModal'}
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
                <div className={'confirm-delete-title'}>{'请勾选以下选项来继续此操作'}</div>
                <div>
                    <Checkbox onChange={event.onChangeRadio} checked={event.radioValue}>
                        <span className={'confirm-delete-text'}>{useLanguage.confirm_delete}</span>
                    </Checkbox>
                </div>
            </section>
        </Modal>
    )
}
