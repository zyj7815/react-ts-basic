import React from 'react'
import AweLayout from '@/pages/layout'
import { RouteProps } from '@/types/route'
import { withRouter } from 'react-router-dom'
import { pastureMenuNav } from './menu'

const PastureWrapper: React.FC<RouteProps> = (routeProps: RouteProps) => {
    const { routes, history, match } = routeProps
    const { id } = match.params

    return (
        <>
            <AweLayout history={history} routes={routes} menuNav={pastureMenuNav(id)} />
        </>
    )
}

export default withRouter(PastureWrapper)
