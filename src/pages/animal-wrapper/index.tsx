import React from 'react'
import AweLayout from '@/pages/layout'
import { AweRouteProps } from '@/types/route'
import { withRouter } from 'react-router-dom'
import { animalMenuNav } from './menu'
import { RouteUris } from '@/router/config'
import { LeftCircleOutlined } from '@ant-design/icons'

const AnimalWrapper: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { routes, history, match } = routeProps
    const { pastureId, animalId } = match.params

    const goBack = () => {
        routeProps.history.push(RouteUris.PastureAnimalList(pastureId))
    }

    return (
        <>
            <AweLayout
                history={history}
                routes={routes}
                menuNav={animalMenuNav(animalId, pastureId)}
                pastureId={pastureId}
            >
                <a onClick={goBack}>
                    <LeftCircleOutlined />
                </a>
            </AweLayout>
        </>
    )
}

export default withRouter(AnimalWrapper)
