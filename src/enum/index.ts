export enum GenderType {
    // 雄性
    Male = 1,
    // 雌性
    Female,
    // 未知
    Unknown,
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

// 围栏形状
export enum FenceShapeType {
    // 多边形
    FencePolygon = 'Polygon',
    // 圆形
    FenceRound = 'Round',
}

export enum FenceMessageType {
    // 进入围栏
    EnterFence = 1,
    // 离开围栏
    OutFence,
}
