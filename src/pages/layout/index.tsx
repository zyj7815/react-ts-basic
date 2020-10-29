import React from 'react'
import { Link } from 'react-router-dom'
import { IMenuNav } from '@/types/route'
import { Layout, Menu, Dropdown, message } from 'antd'
import { Logo, DruidLogo } from '@/assets/images'
import { RenderRoutes } from '@/router/RenderRoutes'
import { currentOpenKey, currentSubOpenKey } from '@/pages/layout/utils'
import { Utils } from '@/utils'
import { Token } from '@/server/token'
import { AweIcon } from '@/assets/iconfont'
import { useRootStore } from '@/provider'
import { observer } from 'mobx-react'
import {
    LeftCircleOutlined,
    RightCircleOutlined,
    MenuOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons'
import './index.less'

const { Sider, Header, Content } = Layout
const SubMenu = Menu.SubMenu

interface IProps {
    routes: any
    menuNav: IMenuNav[]
    history?: any
    children?: React.ReactNode
    textCenter?: boolean
}

const AweLayout: React.FC<IProps> = (props: IProps) => {
    const { myself } = useRootStore()
    const { routes, menuNav, history } = props
    const [openKey, setOpenKey] = React.useState('')
    const [openSubKey, setOpenSubKey] = React.useState([''])
    const [collapsed, setCollapsed] = React.useState(false)

    React.useEffect(() => {
        // 打开下拉菜单
        setOpenSubKey(currentSubOpenKey(menuNav))

        // 取出菜单所有route
        const tmpMenu = Utils.tree2Arr(menuNav).map(val => val.uri)

        // 定位到菜单选项
        setOpenKey(currentOpenKey(tmpMenu))

        // 监听路由变化，并设置openKey
        history &&
            history.listen(() => {
                setOpenKey(currentOpenKey(tmpMenu))
            })
    }, [])

    const menuRoute = (menu: IMenuNav[]) => {
        return menu.map((nav: IMenuNav) => {
            if (nav.children) {
                return (
                    <SubMenu
                        key={nav.uri}
                        title={
                            <span>
                                {nav.icon && <AweIcon type={nav.icon} />}
                                <span>{nav.title}</span>
                            </span>
                        }
                    >
                        {menuRoute(nav.children)}
                    </SubMenu>
                )
            } else {
                // 当点击有children的菜单栏时，才会收起下来菜单
                const click: any = nav.level === 1 ? { onClick: () => setOpenSubKey([]) } : {}
                return (
                    <Menu.Item key={nav.uri} {...click}>
                        {nav.icon && <AweIcon type={nav.icon} />}
                        <Link to={nav.uri ? nav.uri : '/'}>
                            <span>{nav.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }

    const logout = () => {
        message.success('退出成功')
        Token.cleanAuth()
    }

    const userMenu = (
        <Menu>
            <Menu.Item onClick={logout}>退出登录</Menu.Item>
        </Menu>
    )

    return (
        <Layout className="awe-layout-wrapper">
            <Sider
                // collapsible={true}
                collapsed={collapsed}
                onCollapse={(collapsed: any) => setCollapsed(collapsed)}
                className="layout-sidebar"
            >
                <header className="layout-sidebar__header">
                    {props.children ? (
                        props.children
                    ) : (
                        <img src={!collapsed ? DruidLogo : Logo} alt="" />
                    )}
                </header>

                <div className="sider-trigger" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                </div>

                <Menu
                    mode="inline"
                    theme={'dark'}
                    defaultSelectedKeys={[]}
                    selectedKeys={[openKey]}
                    openKeys={openSubKey}
                    onOpenChange={(menu: any) => setOpenSubKey(menu)}
                >
                    {menuRoute(menuNav)}
                </Menu>
            </Sider>

            <Layout className="layout-warpper-content">
                <Header>
                    <nav className="awe-user-info">
                        <Dropdown overlay={userMenu} trigger={['click']}>
                            <a>
                                <span>{myself.username}</span>
                            </a>
                        </Dropdown>
                    </nav>
                </Header>

                <Content className="awe-layout-content">{RenderRoutes(routes, true)}</Content>
            </Layout>
        </Layout>
    )
}

export default observer(AweLayout)
