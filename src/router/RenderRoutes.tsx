import React from 'react'
import { Switch } from 'react-router-dom'
import { RouteInterface } from '@/types/route'
import { RouteWithSubRoutes } from './RouteWithSubRoutes'
import NotFound from '@/pages/status/404'

export const RenderRoutes = (routes: RouteInterface[], authed: boolean, authPath = '/login') => {
    if (authed) {
        return (
            <Switch>
                {routes.map((route: RouteInterface, index) => {
                    return RouteWithSubRoutes(route, index, authed, authPath)
                })}
            </Switch>
        )
    } else {
        return (
            <Switch>
                <NotFound />
            </Switch>
        )
    }
}
