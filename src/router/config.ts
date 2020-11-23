export const PASTURE_ID = ':pastureId'
export const GROUP_ID = ':groupId'
export const FENCE_ID = ':fenceId'
export const ANIMAL_ID = ':animalId'

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
    MainDeviceDetail: (id = PASTURE_ID) => `/root/main-device/detail/${id}`,

    // 密钥管理
    MainKey: '/root/secret',

    // 设备分配牧场
    MainDeviceAllocation: `/root/main-device/allocation`,

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

    // 牧场设备
    PastureDevice: (id = PASTURE_ID) => `/root/pasture-detail/${id}/device`,

    // 牧场 - 牧场管理
    PastureDetail: (id = PASTURE_ID) => `/root/pasture-detail/${id}/pasture`,

    // 牧场异常事件
    PastureAbnormal: (id = PASTURE_ID) => `/root/pasture-detail/${id}/abnormal`,

    // 牧场总览
    PastureOverview: (id = PASTURE_ID) => `/root/pasture-detail/${id}/overview`,

    // 生物管理
    PastureAnimalManager: (id = PASTURE_ID) => `/root/pasture-detail/${id}/animal`,

    // 生物总览
    PastureAnimalOverview: (id = PASTURE_ID) => `/root/pasture-detail/${id}/animal/overview`,

    // 生物列表
    PastureAnimalList: (id = PASTURE_ID) => `/root/pasture-detail/${id}/animal/list`,

    // 生物盘点
    PastureAnimalInventory: (id = PASTURE_ID) => `/root/pasture-detail/${id}/animal/inventory`,

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

    // 围栏列表
    PastureFence: (id = PASTURE_ID) => `/root/pasture-detail/${id}/fence`,

    // 围栏添加生物
    FenceAddBiological: (id = PASTURE_ID, fenceId = FENCE_ID) =>
        `/root/pasture-detail/${id}/fence/${fenceId}/add`,

    // 消息通知
    PastureMessage: (id = PASTURE_ID) => `/root/pasture-detail/${id}/message`,

    // 生物详情
    AnimalWrapper: (id = ANIMAL_ID, pastureId = PASTURE_ID) => {
        return `/root/animal-detail/${id}/pasture/${pastureId}`
    },

    // 生物详情
    AnimalDetail: (id = ANIMAL_ID, pastureId = PASTURE_ID) => {
        return `/root/animal-detail/${id}/pasture/${pastureId}/detail`
    },

    // 生物管理设备
    AnimalDevice: (id = ANIMAL_ID, pastureId = PASTURE_ID) => {
        return `/root/animal-detail/${id}/pasture/${pastureId}/device`
    },

    // 生物管理设备
    AnimalRecord: (id = ANIMAL_ID, pastureId = PASTURE_ID) => {
        return `/root/animal-detail/${id}/pasture/${pastureId}/record`
    },
}
