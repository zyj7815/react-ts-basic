import * as React from 'react'
import { HashRouter as Router, withRouter, Link } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import { LeftCircleOutlined, RightCircleOutlined, MenuOutlined } from '@ant-design/icons'
import { RenderRoutes } from '@/router/RenderRoutes'
import { IMenuNav, menuNav } from '@/pages/layout/menu'
import { Logo } from '@/assets/images'
import { Auth } from '@/auth'
import './index.less'
import { routeProps } from '@/types/route'

const { Sider, Header, Content } = Layout
const SubMenu = Menu.SubMenu

const authed = true
const authPath = '/#/home'

const AppLayout: React.FC<routeProps> = (routeProps: routeProps) => {
    const [collapsed, setCollapsed] = React.useState(false)
    const { routes } = routeProps
    console.log(routes)
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

                <Content>{routes && RenderRoutes(routes, true)}</Content>
            </Layout>
        </Layout>
    )
}

export default withRouter(AppLayout)
