import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { routes } from '@/router/router'
import ScrollToTop from '@/components/Base/ScrollToTop'
import { RenderRoutes } from '@/router/RenderRoutes'

const authed = false
const authPath = '/'

const AppLayout: React.FC = () => {
    return (
        <section>
            请勿断开欧佩克 前雾灯OK迫切哦我的
            <Router>
                <ScrollToTop />
                {RenderRoutes(routes, authed, authPath)}
            </Router>
        </section>
    )
}

export default AppLayout
