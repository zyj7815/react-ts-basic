import React from 'react'
import LayoutHeader from './header'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { RenderRoutes } from '@/router/RenderRoutes'
import { currentOpenKey, currentSubOpenKey } from './utils'
import { Utils } from '@/utils'
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
import { AweIcon } from '@/assets/iconfont'
import { IMenuNav } from '@/types/route'
import { RouteUris } from '@/router/config'

const { Sider, Header, Content } = Layout
const SubMenu = Menu.SubMenu

interface IProps {
    routes: any
    pastureId?: string
    menuNav: IMenuNav[]
    history: any
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

    const onCheckMap = () => {
        // 如果是在最外层牧场管理页面，就跳转到牧场列表
        if (props.history.location.pathname.indexOf('main') > -1) {
            props.history.push(RouteUris.MainPastureMap)
        }
        // 如果进入牧场详情后，就跳转到单个牧场地图
        else {
            props.history.push(RouteUris.PastureMapDetail(props.pastureId))
        }
    }

    const menuRoute = (menu: IMenuNav[]) => {
        return menu.map((nav: IMenuNav) => {
            if (nav.children) {
                return (
                    <SubMenu
                        key={nav.uri}
                        title={
                            <span>
                                {nav.icon && <AweIcon type={nav.icon} />}
                                <span
                                    className={`awe-menu-title ${
                                        collapsed ? 'awe-hide-title' : ''
                                    }`}
                                >
                                    {nav.title}
                                </span>
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
                            <span className={`awe-menu-title ${collapsed ? 'awe-hide-title' : ''}`}>
                                {nav.title}
                            </span>
                        </Link>
                    </Menu.Item>
                )
            }
        })
    }

    return (
        <Layout className="awe-layout-wrapper">
            <Header className="awe-layout-wrapper__header">
                <LayoutHeader
                    myself={myself}
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    checkMap={onCheckMap}
                />
            </Header>

            <Content>
                <Layout className="awe-layout-wrapper__content">
                    <Sider
                        theme="light"
                        collapsed={collapsed}
                        onCollapse={(collapsed: any) => setCollapsed(collapsed)}
                        className="layout-sidebar"
                    >
                        {props.children && (
                            <header className="awe-layout-wrapper__content--operation">
                                {props.children}
                            </header>
                        )}

                        <Menu
                            mode="inline"
                            theme="light"
                            defaultSelectedKeys={[]}
                            selectedKeys={[openKey]}
                            openKeys={openSubKey}
                            onOpenChange={(menu: any) => setOpenSubKey(menu)}
                        >
                            {menuRoute(menuNav)}
                        </Menu>
                    </Sider>

                    <Content className="awe-layout-content">{RenderRoutes(routes, true)}</Content>
                </Layout>
            </Content>
        </Layout>
    )
}

export default observer(AweLayout)
