import * as React from 'react'
import axios from 'axios'
import { observer } from 'mobx-react'
import { useRootStore } from '@/provider'
import { AweRouteProps } from '@/types/route'
import { RenderRoutes } from '@/router/RenderRoutes'
import { Loading } from '@/assets/images'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { AweGlobal } from '@/global'
import { errorMessage } from '@/server/error'
import '@/pages/root/index.less'
import { RouteUris } from '@/router/config'

const Root: React.FC<AweRouteProps> = (routeProps: AweRouteProps) => {
    const { routes } = routeProps
    const { setMyself, setResources, setTheme } = useRootStore()
    const [loading, setLoading] = React.useState(true)
    const [routeShow, setRouteShow] = React.useState(false)

    // routeProps.history.push(RouteUris.MainPasture)

    React.useEffect(() => {
        /**
         * 请求数据
         */
        const fetchData = async () => {
            try {
                const myself = await axios.get(Api.myself, Token.data)

                const customzie = await axios.get(Api.customize(myself.data.company_id), Token.data)

                // 配置自模块定义参数
                if (customzie.data) {
                    // 模块权限
                    setResources(customzie.data.company_policy.resources)
                    // 配置主题
                    setTheme(customzie.data.theme)
                }

                // 设置全局变量
                AweGlobal.setTimeZone(myself.data.profile.time_zone)
                // 设置myself参数
                setMyself(myself.data)

                setRouteShow(true)

                onRemoveLoading()
            } catch (e) {
                errorMessage.alert(e)
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
