import * as React from 'react'
import { HashRouter as Router, withRouter } from 'react-router-dom'
import { routes } from '@/router/router'
import { Layout } from 'antd'
import { LeftCircleOutlined } from '@ant-design/icons'
import { RenderRoutes } from '@/router/RenderRoutes'
import ScrollToTop from '@/components/Base/ScrollToTop'
import { useEffect } from 'react'
import './index.less'

const { Sider, Header, Content, Footer } = Layout

const authed = true
const authPath = '/home'

const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false)

    return (
        <Layout>
            <Sider trigger={null} collapsible={true} collapsed={collapsed}>
                <Layout className="layout-sidebar">
                    <Header>Icon</Header>
                    <Content>Sider</Content>
                    <Footer>
                        <a onClick={() => setCollapsed(!collapsed)}>
                            <LeftCircleOutlined />
                        </a>
                    </Footer>
                </Layout>
            </Sider>

            <Layout>
                <Header>qoiwjd</Header>

                <Content>
                    <Router>
                        <ScrollToTop />
                        {RenderRoutes(routes, authed, authPath)}
                    </Router>
                </Content>
            </Layout>
        </Layout>
    )
}

export default withRouter(AppLayout)
