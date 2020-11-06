export const ROUTE_ID = ':id'
export const GROUP_ID = ':groupId'

export const RouteUris = {
    Login: '/login',

    Root: '/root',

    NotFound: '*',

    NotAuth: '/root/auth',

    MainWrapper: '/root',

    // 牧场详情
    MainPasture: '/root',

    // 设备信息
    MainDevice: '/root/device',

    // 用户信息
    MainAccount: '/root/account',

    // 公司信息
    MainCompany: '/root/company',

    // 牧场详情（生物详情）
    PastureWrapper: (id = ROUTE_ID) => `/root/pasture/${id}`,

    // 生物列表
    PastureAnimal: (id = ROUTE_ID) => `/root/pasture/${id}/animal`,

    // 生物 - 新建
    PastureAnimalNew: (id = ROUTE_ID) => `/root/pasture/${id}/animal/new`,

    // 分组列表
    PastureGroup: (id = ROUTE_ID) => `/root/pasture/${id}/group`,

    // 分组 - 详情
    PastureGroupDetail: (id = ROUTE_ID, groupId = GROUP_ID) => {
        return `/root/pasture/${id}/group/${groupId}/detail`
    },

    // 分组 - 编辑
    PastureGroupEdit: (id = ROUTE_ID, groupId = GROUP_ID) => {
        return `/root/pasture/${id}/group/${groupId}/edit`
    },

    PastureFence: (id = ROUTE_ID) => `/root/pasture/${id}/fence`,
}
