import { FenceMessageType, FenceShapeType } from '../enum'

declare const RoleTypes: ['user', 'admin']
declare type RoleType = typeof RoleTypes[number]

// 生物模型
export type AnimalProps = {
    id: string
    nickname: string
    birth_date: string
    updated_at: string
    species: number

    images?: string[]
    breed_status?: number
    device_id?: string
    owner_id?: string
    owner_name?: string
    company_id?: string
    company_name?: string
    mark?: string
    sn?: string
    uuid?: string
    room_id?: string
    room_name?: string
    total_area?: number
    devices_binding?: any[]
    status_device?: any
    status_env?: any
    status_gps?: any
    loc?: any
    gps_timestamp?: string
    beh_timestamp?: string
    survive?: number
}

// 分组模型
export type GroupProps = {
    id: string
    updated_at: string
    room_name: string
    description: string
    owner_id: string
    total_biological: number
}

// 牧场模型
export type PastureProps = {
    id: string
    name: string
}

//设备模型
export type DeviceProps = {
    id: string
    mark: number
    sn: string
    status_device: {
        battery_power: number
        battery_voltage: number
        signal_strength: number
    }
    status_env: {
        temperature: number
    }
}

// 围栏模型
export type FenceProps = {
    id: string
    area_name: string
    total_biological: number
    total_gateway: number
    msg_type: FenceMessageType
    polygon: { points: any[] }
    distance?: number
    type: FenceShapeType
}

// 密钥模型
export type SecretProps = {
    id: string
    name: string
    access_id: string
    secret_id: string
}

// 消息模型
export type MessageProps = {
    id: string
    src_name: string
    timestamp: string
    readed_at?: string
}

// 异常事件模型
export type AbnormalProps = {
    id: string
    name: string
    type: number
}

// 设备类型
export type DeviceTypeProps = {
    id: string
    model: string
    name: string
    device_type: number
}

export type MySelfProps = {
    id: string
    name: string
    username: string
    company_name: string
    company_id: string
    role: RoleType
    profile: {
        language: number
        page_size: number
        time_zone: number
    }
}
