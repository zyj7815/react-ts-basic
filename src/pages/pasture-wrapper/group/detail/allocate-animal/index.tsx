import React from 'react'
import GroupAnimalList, { GroupListStatus } from '../list'
import { Api } from '@/server/api'
import { Button } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { errorMessage } from '@/server/error'
import axios from 'axios'
import { AweProgress } from '@/components/awe-progress'
import { Token } from '@/server/token'
import { RouteUris } from '@/router/config'

const GroupAllocateAnimal: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { pastureId, groupId } = routeProps.match.params
    const animalListRef: any = React.useRef(null)
    const [selectedIds, setSelectedRowKeys] = React.useState<React.Key[]>([])
    const [visible, setVisible] = React.useState(false)
    const [percent, setPercent] = React.useState(0)

    const onSelectChange = (selectedIds: React.Key[]) => {
        setSelectedRowKeys(selectedIds)
    }

    const handleSave = () => {
        setVisible(true)
        onRemoveAnimal(selectedIds.slice())
    }

    /**
     * 移除生物操作
     * @param animalIds
     */
    const onRemoveAnimal = async (animalIds: React.Key[]) => {
        if (animalIds.length > 0) {
            const animalId = animalIds.shift()

            try {
                await axios.put(Api.group.addBiological(groupId, `${animalId}`), {}, Token.data)
                setPercent(((selectedIds.length - animalIds.length) / selectedIds.length) * 100)
                onRemoveAnimal(animalIds)
            } catch (err) {
                onRemoveAnimal(animalIds)
                errorMessage.alert(err)
            }
        } else {
            setPercent(100)
            setSelectedRowKeys([])
            setTimeout(() => {
                routeProps.history.push(RouteUris.PastureGroupDetail(pastureId, groupId))
            }, 1000)
        }
    }

    return (
        <>
            <GroupAnimalList
                cRef={animalListRef}
                groupId={groupId}
                api={Api.group.idle}
                listStatus={GroupListStatus.GroupListDetailStatus}
                rowSelection={{
                    selectedRowKeys: selectedIds,
                    onChange: onSelectChange,
                }}
                action={
                    <>
                        <Button onClick={handleSave} className="awe-primary-btn">
                            {useLanguage.save}
                        </Button>
                        <Button onClick={() => routeProps.history.goBack()}>
                            {useLanguage.cancel}
                        </Button>
                    </>
                }
            />

            <AweProgress visible={visible} percent={percent} />
        </>
    )
}

export default GroupAllocateAnimal
