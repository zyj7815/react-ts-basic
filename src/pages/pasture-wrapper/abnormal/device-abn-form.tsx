import React, { useState } from 'react'
import { Button, Modal, Select } from 'antd'
import { useLanguage } from '@/language/useLanguage'
const { Option } = Select

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
            closable={false}
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
                <header style={{ marginBottom: 20 }}>请根据设备实际状态进行选择：</header>
                <div>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        onChange={event.onChangeRadio}
                    >
                        <Option value="jack">{useLanguage.device_lost}</Option>
                        <Option value="lucy">{useLanguage.device_damage}</Option>
                        <Option value="Yiminghe">{useLanguage.device_good}</Option>
                    </Select>
                </div>
            </div>
        </Modal>
    )
}
