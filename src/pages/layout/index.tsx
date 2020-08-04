import * as React from 'react'
import { HashRouter as Router, withRouter, Link } from 'react-router-dom'
import { routes } from '@/router/router'
import { Layout, Menu, Button } from 'antd'
import { LeftCircleOutlined, RightCircleOutlined, MenuOutlined } from '@ant-design/icons'
import { RenderRoutes } from '@/router/RenderRoutes'
import ScrollToTop from '@/components/Base/ScrollToTop'
import { IMenuNav, menuNav } from '@/pages/layout/menu'
import { Logo } from '@/assets/images'
import './index.less'
import { Auth } from '@/auth'

const { Sider, Header, Content } = Layout
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

    function logout() {
        Auth.cleanAuth()
    }

    return (
        <Layout>
            <Sider
                collapsible={true}
                collapsed={collapsed}
                onCollapse={collapsed => setCollapsed(collapsed)}
                className="layout-sidebar"
            >
                <header className="layout-sidebar__header">
                    <Logo />
                </header>

                <Menu mode="inline" theme="dark" multiple={false}>
                    {menuNav.map((nav: IMenuNav) => {
                        if (nav.children) {
                            return NavSubMenu(nav)
                        } else {
                            return NavMenu(nav)
                        }
                    })}
                </Menu>
            </Sider>

            <Layout className="layout-warpper-content">
                <Header>
                    <span>xxx xxxx xxxx</span>
                    <Button onClick={() => logout()}>Logout</Button>
                </Header>

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
