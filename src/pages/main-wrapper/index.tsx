import React from 'react'
import AweLayout from '@/pages/layout'
import { RouteProps } from '@/types/route'
import { withRouter } from 'react-router-dom'
import { mainMenuNav } from './menu'

const MainWrapper: React.FC<RouteProps> = (routeProps: RouteProps) => {
    const { routes, history } = routeProps

    return (
        <>
            <AweLayout history={history} routes={routes} menuNav={mainMenuNav} />
        </>
    )
}

export default withRouter(MainWrapper)
