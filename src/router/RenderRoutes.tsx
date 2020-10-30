import React from 'react'
import { Switch } from 'react-router-dom'
import { RouteInterface } from '@/types/route'
import { RouteWithSubRoutes } from './RouteWithSubRoutes'
import NoMatch from '@/pages/status-wrapper/404'
import Login from '@/pages/login'
import { RouteUris } from '@/router/config'
import { Token } from '@/server/token'

export const RenderRoutes = (routes: RouteInterface[] | undefined, authed: boolean) => {
    // 判断是否登录
    if (!Token.auth) {
        return (
            <Switch>
                <Login />
            </Switch>
        )
    }

    if (routes) {
        return (
            <Switch>
                {routes.map((route: RouteInterface, index) => {
                    return RouteWithSubRoutes(route, index, authed, RouteUris.NotAuth)
                })}
            </Switch>
        )
    } else {
        return (
            <Switch>
                <NoMatch />
            </Switch>
        )
    }
}
