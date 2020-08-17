import * as React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import {
    LeftCircleOutlined,
    RightCircleOutlined,
    MenuOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import { RenderRoutes } from '@/router/RenderRoutes'
import { IMenuNav, menuNav } from '@/pages/layout/menu'
import { Logo, DruidLogo } from '@/assets/images'
import { routeProps } from '@/types/route'
import { RouteUri } from '@/router/config'
import { Token } from '@/server/token'
import './index.less'

const { Sider, Header, Content } = Layout
const SubMenu = Menu.SubMenu

const AppLayout: React.FC<routeProps> = (routeProps: routeProps) => {
    const [collapsed, setCollapsed] = React.useState(false)
    const { routes } = routeProps

    const NavMenu = (nav: IMenuNav) => {
        return (
            <Menu.Item key={nav.uri}>
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
        Token.cleanAuth()
    }

    return (
        <Layout>
            <Sider
                collapsible={true}
                collapsed={collapsed}
                onCollapse={(collapsed: any) => setCollapsed(collapsed)}
                className="layout-sidebar"
            >
                <header className="layout-sidebar__header">
                    <img src={!collapsed ? DruidLogo : Logo} alt="" />
                </header>

                <div className="sider-trigger" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                </div>

                <Menu
                    defaultSelectedKeys={[RouteUri.Home]}
                    mode="inline"
                    theme="dark"
                    multiple={false}
                >
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

                <Content>{RenderRoutes(routes, true)}</Content>
            </Layout>
        </Layout>
    )
}

export default withRouter(AppLayout)
