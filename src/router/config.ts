export const PASTURE_ID = ':pastureId'
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
    MainPastureNew: '/root/main-pasture/new',

    // 编辑牧场
    MainPastureEdit: (id = PASTURE_ID) => `/root/main-pasture/edit/${id}`,

    // 牧场地图详情
    MainPastureMap: '/root/main-pasture/map',

    // 设备信息
    MainDevice: '/root/main-device',

    // 设备详情
    MainDeviceDetail: (id = PASTURE_ID) => `/root/main-device/${id}/device`,

    // 密钥管理
    MainKey: '/root/key-management',

    // 用户信息
    MainAccount: '/root/main-account',

    // 编辑用户信息
    EditAccount: '/root/accountEdit',

    // 公司信息
    MainCompany: '/root/main-company',

    // 公司编辑
    CompanyEdit: '/root/companyEdit',

    // 牧场详情（牧场总览）
    PastureWrapper: (id = PASTURE_ID) => `/root/pasture-detail/${id}`,

    // 牧场地图
    PastureMapDetail: (id = PASTURE_ID) => `/root/pasture-detail/${id}/map`,

    // 牧场总览
    PastureOverview: (id = PASTURE_ID) => `/root/pasture-detail/${id}/pasture`,

    // 生物列表
    PastureAnimal: (id = PASTURE_ID) => `/root/pasture-detail/${id}/animal`,

    // 生物 - 新建
    PastureAnimalNew: (id = PASTURE_ID) => `/root/pasture-detail/${id}/animal/new`,

    // 分组列表
    PastureGroup: (id = PASTURE_ID) => `/root/pasture-detail/${id}/group`,

    // 分组 - 详情
    PastureGroupDetail: (id = PASTURE_ID, groupId = GROUP_ID) => {
        return `/root/pasture-detail/${id}/group/${groupId}/detail`
    },

    // 分组 - 编辑
    PastureGroupEdit: (id = PASTURE_ID, groupId = GROUP_ID) => {
        return `/root/pasture-detail/${id}/group/${groupId}/edit`
    },

    PastureFence: (id = PASTURE_ID) => `/root/pasture-detail/${id}/fence`,
}
