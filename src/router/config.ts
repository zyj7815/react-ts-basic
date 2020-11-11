export const ROUTE_ID = ':id'
export const GROUP_ID = ':groupId'

export const RouteUris = {
    Login: '/login',

    Root: '/root',

    NotFound: '*',

    NotAuth: '/root/auth',

    MainWrapper: '/root',

    // 牧场信息
    MainPasture: '/root/main-pasture',

    // 新建牧场
    MainPastureNew: '/root/main-pasture-new',

    // 设备信息
    MainDevice: '/root/device',

    // 设备详情
    MainDeviceDetail: (id = ROUTE_ID) => `/root/main-device/${id}`,

    // 用户信息
    MainAccount: '/root/account',

    // 公司信息
    MainCompany: '/root/company',

    // 牧场详情（牧场总览）
    PastureWrapper: (id = ROUTE_ID) => `/root/pasture-detail/${id}`,

    // 牧场总览
    PastureOverview: (id = ROUTE_ID) => `/root/pasture-detail/${id}/pasture`,

    // 生物列表
    PastureAnimal: (id = ROUTE_ID) => `/root/pasture-detail/${id}/animal`,

    // 生物 - 新建
    PastureAnimalNew: (id = ROUTE_ID) => `/root/pasture-detail/${id}/animal/new`,

    // 分组列表
    PastureGroup: (id = ROUTE_ID) => `/root/pasture-detail/${id}/group`,

    // 分组 - 详情
    PastureGroupDetail: (id = ROUTE_ID, groupId = GROUP_ID) => {
        return `/root/pasture-detail/${id}/group/${groupId}/detail`
    },

    // 分组 - 编辑
    PastureGroupEdit: (id = ROUTE_ID, groupId = GROUP_ID) => {
        return `/root/pasture-detail/${id}/group/${groupId}/edit`
    },

    PastureFence: (id = ROUTE_ID) => `/root/pasture-detail/${id}/fence`,
}
