import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { RouteInterface } from '@/types/route'
import { RouteWithSubRoutes } from './RouteWithSubRoutes'
import { Auth } from '@/auth'
import Login from '@/pages/login'

export const RenderRoutes = (routes: RouteInterface[], authed: boolean, authPath = '/login') => {
    if (Auth.getAuth) {
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
                <Route path="*" component={Login} />
            </Switch>
        )
    }
}
