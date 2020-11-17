import React, { useState } from 'react'
import { Button, Modal, Radio } from 'antd'
import { useLanguage } from '@/language/useLanguage'

interface CollectionCreateFormProps {
    visible: boolean
    handleOk: () => void
    handleCancel: () => void
    onChangeRadio: (e: any) => void
}

export const DeviceAbnForm: React.FC<CollectionCreateFormProps> = (event: any) => {
    return (
        <Modal
            visible={event.visible}
            title={useLanguage.device_abnormal}
            bodyStyle={{ paddingBottom: 10, margin: '0 auto', width: 338 }}
            className={'DeviceAbnModal'}
            width={350}
            footer={[
                <Button key="back" onClick={event.handleCancel}>
                    {useLanguage.cancel}
                </Button>,
                <Button key="submit" type="primary" onClick={event.handleOk}>
                    {useLanguage.finish}
                </Button>,
            ]}
        >
            <div>
                <header>请根据设备实际状态进行选择：</header>
                <div>
                    <Radio.Group
                        onChange={event.onChangeRadio}
                        defaultValue="a"
                        style={{ marginTop: 16 }}
                    >
                        <Radio.Button value="a" className={'radio-button'}>
                            {useLanguage.device_lost}
                        </Radio.Button>
                        <Radio.Button value="b" className={'radio-button'}>
                            {useLanguage.device_damage}
                        </Radio.Button>
                        <Radio.Button value="c" className={'radio-button-last'}>
                            {useLanguage.device_good}
                        </Radio.Button>
                    </Radio.Group>
                </div>
            </div>
        </Modal>
    )
}
