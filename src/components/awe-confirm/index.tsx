import React from 'react'
import { Modal } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import './index.less'

const AweConfirm: React.FC = props => {
    React.useEffect(() => {}, [])

    return <Modal title={useLanguage.confirm_delete}>AweConfirm</Modal>
}

export default AweConfirm
