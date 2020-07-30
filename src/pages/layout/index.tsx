import * as React from 'react'
import { HashRouter as Router, withRouter, Link } from 'react-router-dom'
import { routes } from '@/router/router'
import { Layout, Menu } from 'antd'
import { LeftCircleOutlined, RightCircleOutlined, MenuOutlined } from '@ant-design/icons'
import { RenderRoutes } from '@/router/RenderRoutes'
import ScrollToTop from '@/components/Base/ScrollToTop'
import { IMenuNav, menuNav } from '@/pages/layout/menu'
import './index.less'

const { Sider, Header, Content, Footer } = Layout
const SubMenu = Menu.SubMenu

const authed = true
const authPath = '/#/home'

const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = React.useState(false)

    const NavMenu = (nav: IMenuNav) => {
        return (
            <Menu.Item key={nav.title}>
                <Link to={nav.uri ? nav.uri : '/'}>
                    <span>{nav.title}</span>
                </Link>
            </Menu.Item>
        )
    }

    const NavSubMenu = (nav: IMenuNav) => {
        return (
            <SubMenu key={nav.title} title={nav.title}>
                {nav.children &&
                    nav.children.map(value => {
                        return NavMenu(value)
                    })}
            </SubMenu>
        )
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible={true} collapsed={collapsed}>
                <Layout className="layout-sidebar">
                    <Header>
                        <MenuOutlined />
                    </Header>

                    <Content>
                        <Menu mode="inline" theme="dark" multiple={false}>
                            {menuNav.map((nav: IMenuNav) => {
                                if (nav.children) {
                                    return NavSubMenu(nav)
                                } else {
                                    return NavMenu(nav)
                                }
                            })}
                        </Menu>
                    </Content>

                    <Footer>
                        <a onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />}
                        </a>
                    </Footer>
                </Layout>
            </Sider>

            <Layout className="layout-warpper-content">
                <Header>xxx xxxx xxxx</Header>

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
