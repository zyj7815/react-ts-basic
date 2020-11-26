import { AbnormalType } from '@/enum'

enum RecordType {
    // 创建
    RecordCreated = 0,
    // 绑定设备
    RecordDeployDevice,
    // 解绑设备
    RecordUnDeployDevice,
    // 生病开始
    RecordIllnessBegin,
    // 生病结束
    RecordIllnessEnd,
    // 发情开始
    RecordHeatBegin,
    // 发情结束
    RecordHeatEnd,
    // 受精
    RecordFertilization,
    // 怀孕开始
    RecordPregnantBegin,
    // 怀孕结束
    RecordPregnantEnd,
    // 分娩
    RecordParturition,
    // 异常事件
    RecordAbnormal,
    // 保险开始
    RecordInsuranceBegin,
    // 保险结束
    RecordInsuranceEnd,
}

export const createTimeLine = (parent: any, height: number, top: number, level = 1) => {
    if (!parent) return

    const div: any = document.createElement('div')
    div.className = 'record-duration__line--primary'
    div.style = `top: ${top + 10}px; right: ${level * 30}px`
    div.style.height = `${height}px`
    parent.appendChild(div)
}
