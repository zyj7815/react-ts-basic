const PLATFORM = 'cattle'
const SITE = 'user'

export const API_HOST = {
    TEST_HOST: 'https://cattle.coolhei.com/api/v1/', // 测试
    DEVELOP_HOST: 'http://cattle.test.druidtech.net/api/v1/', // 开发
    PRODUCTION_HOST: 'https://cattle.druidtech.cn/api/v1/', // 线上
}

export const HOST = window.location.host

export const ORIGIN = window.location.origin

export const STORAGE_KEY = `${HOST}+${PLATFORM}+${SITE}`

// 设备轨迹浏览记录 track_record_key
// 存储类型：SessionStorage
export const TRACK_RECORD_KEY = `_Druid_${STORAGE_KEY}_map_path_id`

// 围栏浏览记录 fenceRecordKey
// 存储类型：：SessionStorage
export const FENCE_RECORD_KEY = `_Druid_${STORAGE_KEY}_map_fence_id`

// 对比项列表 comparisonKey
// 存储类型：LocalStorage
export const COMPARISON_KEY = `_Druid_${STORAGE_KEY}_comparison`

// 围栏变化轮询监听(未来可改为DruidChannel)
// 存储类型：LocalStorage
export const FENCE_CHANGE_KEY = `_Druid_${STORAGE_KEY}_fence_change_timestamp`

// 上传csv文件
// 存储类型：SessionStorage
export const CSV_KEY = `_Druid_${HOST}_${PLATFORM}_csv`
