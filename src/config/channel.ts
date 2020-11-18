const host = window.location.host
const platform = 'cattle'
const site = 'user'

export const storageKey = `${host}+${platform}+${site}`

// 设备轨迹浏览记录
// 存储类型：SessionStorage
export const trackRecordKey = `_Druid_${storageKey}_map_path_id`

// 围栏浏览记录
// 存储类型：：SessionStorage
export const fenceRecordKey = `_Druid_${storageKey}_map_fence_id`

// 对比项列表
// 存储类型：LocalStorage
export const comparisonKey = `_Druid_${storageKey}_comparison`

// 围栏变化轮询监听(未来可改为DruidChannel)
// 存储类型：LocalStorage
export const fenceChangeKey = `_Druid_${storageKey}_fence_change_timestamp`

// 上传csv文件
// 存储类型：SessionStorage
export const csvKey = `_Druid_${host}_${platform}_csv`
