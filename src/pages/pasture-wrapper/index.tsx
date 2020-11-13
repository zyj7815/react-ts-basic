import React from 'react'
import AweLayout from '@/pages/layout'
import { AweRouteProps } from '@/types/route'
import { withRouter } from 'react-router-dom'
import { pastureMenuNav } from './menu'
import { RouteUris } from '@/router/config'
import { LeftCircleOutlined } from '@ant-design/icons'

const PastureWrapper: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { routes, history, match } = routeProps
    const { pastureId } = match.params

    const goBack = () => {
        routeProps.history.push(RouteUris.MainPasture)
    }

    return (
        <>
            <AweLayout
                history={history}
                routes={routes}
                menuNav={pastureMenuNav(pastureId)}
                pastureId={pastureId}
            >
                <a onClick={goBack}>
                    <LeftCircleOutlined />
                </a>
            </AweLayout>
        </>
    )
}

export default withRouter(PastureWrapper)
