import * as React from 'react'
import { observer } from 'mobx-react'
import { useRootStore } from '@/provider'
import { AweRouteProps } from '@/types/route'
import { RenderRoutes } from '@/router/RenderRoutes'
import { Loading } from '@/assets/images'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { RouteUris } from '@/router/config'
import '@/pages/root/index.less'

const Root: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { routes } = routeProps
    const { getBasicData } = useRootStore()
    const [loading, setLoading] = React.useState(true)
    const [routeShow, setRouteShow] = React.useState(false)

    React.useEffect(() => {
        /**
         * 请求数据
         */
        const fetchData = async () => {
            try {
                await getBasicData()
                setRouteShow(true)
                onRemoveLoading()

                // 如果是根目录进来，就跳转到 /#/root/main-pasture
                if (routeProps.history.location.pathname === RouteUris.Root) {
                    routeProps.history.push(RouteUris.MainPasture)
                }
            } catch (e) {
                errorMessage.alert(e)
                Token.cleanAuth()
            }
        }

        /**
         * 移除loading
         */
        const onRemoveLoading = () => {
            setTimeout(() => {
                setLoading(false)
            }, 100)

            // 销毁loading
            setTimeout(() => {
                const dom = document.getElementById('loading-wrapper')
                if (dom) {
                    dom.style.display = 'none'
                }
            }, 500)
        }

        fetchData()
    }, [])

    return (
        <>
            {routeShow && RenderRoutes(routes, true)}

            <section id="loading-wrapper" style={{ opacity: loading ? 1 : 0 }}>
                <img src={Loading} alt="" />
            </section>
        </>
    )
}

export default observer(Root)
