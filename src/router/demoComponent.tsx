/* 这个demo用于演示子路由，可以删除 */
import React from 'react'
import { routeProps } from '@/types/route'
import { RenderRoutes } from '@/router/RenderRoutes'

export const RouteDemoA = (routeProps: routeProps) => {
    const { routes } = routeProps
    const authed = false

    return routes ? (
        <div>
            <h1>B123</h1>
            {/* 子路由控制 */}
            {RenderRoutes(routes, authed)}
        </div>
    ) : null
}

export const RouteDemoB = (props: routeProps) => {
    return <CountHooks age={1} />
}

type Person = {
    age: number
}

export const CountHooks: React.FC<Person> = (props: Person) => {
    const [person, setPerson] = React.useState<Person>({ age: props.age })

    return (
        <div>
            <p>Count: {person.age}</p>
            <button
                onClick={() =>
                    setPerson({
                        age: person.age + 1,
                    })
                }
            >
                增加年龄
            </button>
        </div>
    )
}
