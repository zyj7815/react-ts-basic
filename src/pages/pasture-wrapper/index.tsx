import React from 'react'
import AweLayout from '@/pages/layout/main'
import { AweRouteProps } from '@/types/route'
import { withRouter } from 'react-router-dom'
import { pastureMenuNav } from './menu'

const PastureWrapper: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { routes, history, match } = routeProps
    const { id } = match.params

    return (
        <>
            <AweLayout history={history} routes={routes} menuNav={pastureMenuNav(id)} />
        </>
    )
}

export default withRouter(PastureWrapper)
