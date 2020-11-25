import React from 'react'
import GroupAnimalList, { GroupListStatus } from '../list'
import { Api } from '@/server/api'
import { Button, message } from 'antd'
import { useLanguage } from '@/language/useLanguage'
import { AweRouteProps } from '@/types/route'
import { errorMessage } from '@/server/error'
import axios from 'axios'
import { AweProgress } from '@/components/awe-progress'
import { Token } from '@/server/token'
import AweConfirm from '@/components/awe-confirm'
import AweResultModal from '@/components/awe-result-modal'

const GroupRemoveAnimal: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { groupId } = routeProps.match.params
    const animalListRef: any = React.useRef(null)
    const [selectedIds, setSelectedIds] = React.useState<React.Key[]>([])
    const [progressVisible, setProgressVisible] = React.useState(false)
    const [confirmVisible, setConfirmVisible] = React.useState(false)
    const [percent, setPercent] = React.useState(0)

    const onSelectChange = (selectedIds: React.Key[]) => {
        setSelectedIds(selectedIds)
    }

    /**
     * 点击删除按钮时触发提醒
     */
    const handleRemove = () => {
        if (selectedIds.length === 0) {
            message.warn(useLanguage.select_common(useLanguage.animal_basic))
        } else {
            setConfirmVisible(true)
        }
    }

    /**
     * 确认删除
     */
    const onConfirmRemove = () => {
        setProgressVisible(true)
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
                await axios.put(Api.group.delBiological(groupId, `${animalId}`), {}, Token.data)
                setPercent(((selectedIds.length - animalIds.length) / selectedIds.length) * 100)
                onRemoveAnimal(animalIds)
            } catch (err) {
                onRemoveAnimal(animalIds)
                errorMessage.alert(err)
            }
        } else {
            setPercent(100)
            setSelectedIds([])
            animalListRef.current.onUpdateList()

            setTimeout(() => {
                setProgressVisible(false)
            }, 1000)
        }
    }

    return (
        <>
            <GroupAnimalList
                cRef={animalListRef}
                groupId={groupId}
                api={Api.group.biological(groupId)}
                listStatus={GroupListStatus.GroupListDetailStatus}
                rowSelection={{
                    selectedRowKeys: selectedIds,
                    onChange: onSelectChange,
                }}
                action={
                    <>
                        <Button onClick={handleRemove} danger>
                            {useLanguage.delete}
                        </Button>
                        <Button onClick={() => routeProps.history.goBack()}>
                            {useLanguage.cancel}
                        </Button>
                    </>
                }
            />

            <AweProgress visible={progressVisible} percent={percent} />

            <AweConfirm
                visible={confirmVisible}
                onConfirm={onConfirmRemove}
                onCancel={() => setConfirmVisible(false)}
            />
        </>
    )
}

export default GroupRemoveAnimal
