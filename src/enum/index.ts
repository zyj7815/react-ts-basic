export enum TabType {
    List = 'list',
    Card = 'card',
}

// 设备绑定状态
export enum BindingStatus {
    // 未绑定
    Undeploy = 0,
    // 已解绑
    Deployed,
    // 绑定中
    Deploying,
}

// 异常事件
export enum AbnormalType {
    // 活动量异常
    AbnormalActivity = 1,
    // 进食异常
    AbnormalEating,
    // 反刍异常
    AbnormalRuminate,
}

// 消息类型
export enum MessageType {
    // 生物信息
    AnimalInfo = 5,
    // 围栏信息
    FenceInfo = 6,
    // 设备信息
    DeviceInfo = 3,
}

export enum FenceMessageType {
    // 进入围栏
    EnterFence = 1,
    // 离开围栏
    OutFence,
}
