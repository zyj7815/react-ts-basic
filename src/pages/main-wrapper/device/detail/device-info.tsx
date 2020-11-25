import React from 'react'
import AwePage from '@/components/awe-page'
import { useLanguage } from '@/language/useLanguage'
import { ServiceTip } from '@/service'

const DeviceInfo: React.FC = props => {
    const header = (
        <header className="main-device__info--detail">
            <h4 className="device-info__detail--mark">2222</h4>
            <article className="device-info__detail--env">
                <span>
                    <span>{useLanguage.temperature}</span>
                    <span>33 ℃</span>
                </span>

                <span>
                    <span>{useLanguage.temperature}</span>
                    <span>33 ℃</span>
                </span>
            </article>
            <img className="device-info__detail--icon" src={ServiceTip.getSignalIcon(13)} alt="" />
        </header>
    )

    return (
        <div className="main-device-header__item beauty-shadow beauty-radius">
            <AwePage
                isFBorder={true}
                isHiddenX={true}
                className="main-device__info"
                header={header}
                footer={
                    <footer>
                        <span className="beauty-primary">{useLanguage.gprs_type}</span>
                        <span style={{ marginRight: 15 }}>定时回传</span>
                        <span>时间间隔10 min</span>
                    </footer>
                }
            >
                <div className="main-device__info--center">
                    <span className="beauty-primary">{useLanguage.latest_communication_time}:</span>
                    2020-02-02 22:22:22
                </div>
                <div className="main-device__info--center">
                    <span className="beauty-primary">{useLanguage.device_type}:</span>全功能耳标
                </div>
            </AwePage>
        </div>
    )
}

export default DeviceInfo
