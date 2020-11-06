import React from 'react'
import { Avatar } from 'antd'
import { AnimalProps } from '@/types/animal'
import { ServiceTool } from '@/utils/service-tool'
import { useLanguage } from '@/language/useLanguage'
import { BindingStatus } from '@/enum/device'
import { Utils } from '@/utils'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import { ServerRequest } from '@/server/request'
import { animalProfile } from '@/assets/images'
import './index.less'
import CardItem from '@/pages/components/card-item-wrapper'

const ActiveAnimalCard: React.FC<{ data: AnimalProps }> = (props: { data: AnimalProps }) => {
    const animal: AnimalProps = props.data
    const bindingStatus = ServiceTool.getBindingStatus(animal)

    const action = (
        <>
            {bindingStatus === BindingStatus.Deploying ? (
                <AweIcon type={aweIconType['icon-mark']} />
            ) : (
                <AweIcon type={aweIconType['icon-bnding']} />
            )}
        </>
    )

    return (
        <CardItem action={action}>
            <main className="active-animal-card">
                <aside className="active-animal-card__avator">
                    <Avatar
                        size={40}
                        src={
                            animal.images
                                ? ServerRequest.getImgUrl(animal.images[0], animal.id, true)
                                : animalProfile
                        }
                    />
                </aside>
                <section className="active-animal-card__content">
                    <nav className="animal-card-nickname">
                        <span className="animal-nickname">
                            {animal.nickname || useLanguage.no_nickname}
                        </span>
                        {animal.device_id && (
                            <span className="animal-icon single-battery-wrapper">
                                <img
                                    className="single-battery__signal"
                                    src={ServiceTool.getSignalIcon(
                                        animal.status_device ? animal.status_device : animal
                                    )}
                                />
                                <img
                                    className="single-battery__battery"
                                    src={ServiceTool.getBatteryIcon(
                                        animal.status_device ? animal.status_device : animal
                                    )}
                                />
                            </span>
                        )}
                    </nav>

                    <div>
                        <span className="animal-tag">
                            {useLanguage.species}: {ServiceTool.getSpecies(animal.species)}
                        </span>
                        <span className="animal-tag">
                            {useLanguage.group}: {animal.room_name || '-'}
                        </span>
                    </div>

                    <div>{useLanguage.abnormal_info_total}: 0</div>

                    <div>
                        {bindingStatus === BindingStatus.Deploying ? (
                            <span>
                                {useLanguage.communication}
                                {useLanguage.on}
                                {Utils.getTimeDiff(
                                    animal.status_device.updated_at || '',
                                    useLanguage.before
                                )}
                            </span>
                        ) : (
                            <span>{useLanguage.unbound}</span>
                        )}
                    </div>
                </section>
            </main>
        </CardItem>
    )
}

export default ActiveAnimalCard
