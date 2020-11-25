import React from 'react'
import AwePage from '@/components/awe-page'
import { useLanguage } from '@/language/useLanguage'

const Inventoried: React.FC = props => {
    return (
        <AwePage
            bgColor={true}
            noPadding={true}
            isHPadding={true}
            isHShadow={true}
            header={useLanguage.inventory_history}
            mainClass="beauty-radius beauty-shadow"
        >
            Inventoried
        </AwePage>
    )
}

export default Inventoried
