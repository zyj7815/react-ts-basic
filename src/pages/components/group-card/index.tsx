import React from 'react'
import { GroupProps } from '@/types/animal'
import { useLanguage } from '@/language/useLanguage'
import { Utils } from '@/utils'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import ListCard from '@/pages/components/list-card/list-card'
import './index.less'

const GroupCard: React.FC<{ data: GroupProps }> = (props: { data: GroupProps }) => {
    const deleteAction = (
        <span onClick={() => console.log(12412)}>
            <AweIcon type={aweIconType['icon-delete']} />
        </span>
    )

    return (
        <ListCard action={deleteAction}>
            <div className="group-card-item-wrapper">
                <div className="group-card-name">{props.data.room_name}</div>
                <div>
                    <span className="animal-tag">
                        {useLanguage.animal_count}:{props.data.total_biological}
                    </span>
                </div>
                <div className="group-card-other">
                    <span>
                        {useLanguage.created_date}：
                        {Utils.utc2Time(props.data.updated_at, 'YYYY-MM-DD')}
                    </span>

                    <span>
                        {useLanguage.remark}：{props.data.description}
                    </span>
                </div>
            </div>
        </ListCard>
    )
}

export default GroupCard
