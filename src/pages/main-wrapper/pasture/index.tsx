import React from 'react'
import { RouteProps } from '@/types/route'
import { RouteUris } from '@/router/config'

const MainPasture: React.FC<RouteProps> = (routeProps: RouteProps) => {
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
