import React from 'react'
import { AweRouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'

const MainPasture: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const handleDetail = () => {
        routeProps.history.push(RouteUris.PastureAnimal('1293809'))
    }

    return (
        <div>
            <a onClick={handleDetail}>牧场详情</a>
        </div>
    )
}

export default MainPasture
