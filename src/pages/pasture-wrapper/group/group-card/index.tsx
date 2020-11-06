import React from 'react'
import { GroupProps } from '@/types/animal'
import { useLanguage } from '@/language/useLanguage'
import { Utils } from '@/utils'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import CardItem from '@/pages/components/card-item-wrapper'
import './index.less'

interface GroupCardProps {
    data: GroupProps
    onCheckGroup: (group: GroupProps) => void
    onDeleteGroup: (group: GroupProps) => void
}

const GroupCard: React.FC<GroupCardProps> = (props: GroupCardProps) => {
    const deleteAction = (
        <span onClick={() => props.onDeleteGroup(props.data)}>
            <AweIcon type={aweIconType['icon-delete']} />
        </span>
    )

    return (
        <CardItem action={deleteAction}>
            <main
                className="group-card-item-wrapper"
                onClick={() => props.onCheckGroup(props.data)}
            >
                <div className="group-card-name">{props.data.room_name}</div>
                <div>
                    <span className="animal-tag">
                        {useLanguage.animal_count}:{props.data.total_biological}
                    </span>
                </div>
                <div className="group-card-other">
                    <span>
                        {useLanguage.updating_time}：
                        {Utils.utc2Time(props.data.updated_at, 'YYYY-MM-DD')}
                    </span>

                    <span>
                        {useLanguage.remark}：{props.data.description}
                    </span>
                </div>
            </main>
        </CardItem>
    )
}

export default GroupCard
