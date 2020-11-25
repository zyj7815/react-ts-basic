import React from 'react'
import { Button } from 'antd'
import GroupAnimalList, { GroupListStatus } from '@/pages/pasture-wrapper/group/detail/list'
import { AweRouteProps } from '@/types/route'
import { useLanguage } from '@/language/useLanguage'
import { Api } from '@/server/api'
import { RouteUris } from '@/router/config'
import GroupInfoModal from '@/pages/pasture-wrapper/group/group-info-modal'

const GroupDetail: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const listRef: any = React.useRef(null)
    const { pastureId, groupId } = routeProps.match.params
    const [editVisible, setEditVisible] = React.useState(false)

    /**
     * 分配生物
     */
    const handleAllocateAnimal = () => {
        routeProps.history.push(RouteUris.PastureGroupDetailAllocation(pastureId, groupId))
    }

    /**
     * 移除生物
     */
    const handleRemoveAnimal = () => {
        routeProps.history.push(RouteUris.PastureGroupDetailRemove(pastureId, groupId))
    }

    return (
        <>
            <GroupAnimalList
                cRef={listRef}
                api={Api.group.biological(groupId)}
                listStatus={GroupListStatus.GroupListDetailStatus}
                rowSelection={null}
                groupId={groupId}
                action={
                    <>
                        <Button className="awe-primary-btn" onClick={handleAllocateAnimal}>
                            {useLanguage.add_creature}
                        </Button>

                        <Button className="awe-primary-btn" onClick={() => setEditVisible(true)}>
                            {useLanguage.edit_group}
                        </Button>

                        <Button onClick={handleRemoveAnimal} danger>
                            {useLanguage.delete_animal_new}
                        </Button>
                    </>
                }
            />

            <GroupInfoModal
                argument={groupId}
                visible={editVisible}
                onMainEvent={() => listRef.current.onUpdateGroup()}
                onClose={() => setEditVisible(false)}
            />
        </>
    )
}

export default GroupDetail
