import React from 'react'
import { useLanguage } from '@/language/useLanguage'
import { Avatar } from 'antd'
import { ServerRequest } from '@/server/request'
import { animalProfile } from '@/assets/images'
import { ServiceTool } from '@/utils/service-tool'

export const animalColumns = () => {
    return [
        {
            title: useLanguage.picture,
            dataIndex: 'photo',
            width: 100,
            render(photo: string, record: any) {
                return (
                    <div>
                        <Avatar
                            size={40}
                            src={
                                record.images
                                    ? ServerRequest.getImgUrl(record.images[0], record.id, true)
                                    : animalProfile
                            }
                        />
                    </div>
                )
            },
        },
        {
            title: useLanguage.animal_nickname,
            dataIndex: 'nickname',
            width: 250,
            render(nickname: string, record: any) {
                return (
                    <div className="animal-nickname-icon">
                        <span className="animal-nickname">
                            {nickname}
                            {!record.device_id && (
                                <span className="unbind-text">{useLanguage.not_installed}</span>
                            )}
                        </span>

                        {record.device_id && (
                            <span className="single-battery-wrapper">
                                <img
                                    className="single-battery__signal"
                                    src={ServiceTool.getSignalIcon(
                                        record.status_device ? record.status_device : record
                                    )}
                                />
                                <img
                                    className="single-battery__battery"
                                    src={ServiceTool.getBatteryIcon(
                                        record.status_device ? record.status_device : record
                                    )}
                                />
                            </span>
                        )}
                    </div>
                )
            },
        },
        {
            title: useLanguage.species,
            dataIndex: 'species',
            width: 120,
            render(species: number) {
                return ServiceTool.getSpecies(species)
            },
        },
        {
            title: useLanguage.group,
            dataIndex: 'room_name',
            width: 150,
            render(room_name: string) {
                return room_name || '-'
            },
        },
        {
            title: useLanguage.latest_gprs_time,
            dataIndex: 'updated_at',
            render(updated_at: number, record: any) {
                return record.device_id ? ServiceTool.getDeviceUpdated(record) : '-'
            },
        },
        {
            title: useLanguage.action,
            dataIndex: 'operation',
            fixed: 'right' as 'right',
            width: (window as any).isEn ? 170 : 100,
            render(operation: string, record: any) {
                return (
                    <div className="action-box">
                        {record.device_id ? (
                            <span>{useLanguage.view_location}</span>
                        ) : (
                            <span>{useLanguage.bound_device}</span>
                        )}
                    </div>
                )
            },
        },
    ]
}
