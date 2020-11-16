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

export type GroupProps = {
    id: string
    updated_at: string
    room_name: string
    description: string
    owner_id: string
    total_biological: number
}

export type PastureProps = {
    id: string
    name: string
}

export type DeviceProps = {
    id: string
    mark: number
    sn: string
}
export type KeyProps = {
    id: string
}
