import React from 'react'
import { Dropdown, message, Radio, Menu, Avatar } from 'antd'
import { Token } from '@/server/token'
import { MySelf } from '@/store'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    AudioOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { AweIcon, aweIconType } from '@/assets/iconfont'
import HeaderSearch from '@/pages/layout/main/header-search'
import { useLanguage } from '@/language/useLanguage'

interface HeaderProps {
    myself: MySelf
    collapsed: boolean
    setCollapsed: (status: boolean) => void
}

const LayoutHeader: React.FC<HeaderProps> = (props: HeaderProps) => {
    const [grid, setGrid] = React.useState('')

    React.useEffect(() => {
        getGrid()

        window.onresize = () => getGrid()

        return () => {
            window.onresize = null
        }
    }, [])

    const getGrid = () => {
        const width = window.innerWidth

        if (width < 576) {
            setGrid('xs')
        } else if (width >= 1600) {
            setGrid('xxl')
        } else if (width >= 1200) {
            setGrid('xl')
        } else if (width >= 992) {
            setGrid('lg')
        } else if (width >= 768) {
            setGrid('md')
        } else if (width >= 576) {
            setGrid('sm')
        }
    }

    /**
     * 修改语言
     */
    const changeLanguage = (e: any) => {
        if (!e.target.value) {
            window.location.pathname = '/'
        } else {
            window.location.pathname = '/en/'
        }
    }

    const logout = () => {
        message.success('退出成功')
        Token.cleanAuth()
    }

    const userMenu = (
        <Menu>
            <Menu.Item>{props.myself.username}</Menu.Item>
            <Menu.Item onClick={logout}>{useLanguage.login_out}</Menu.Item>
        </Menu>
    )

    return (
        <>
            <div className="layout-header-content">
                <div className="sider-trigger" onClick={() => props.setCollapsed(!props.collapsed)}>
                    {!props.collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                </div>

                <AweIcon type={aweIconType['icon-logo-druid-fullname']} className="header-logo" />

                <HeaderSearch placeholder="搜索牧场" />

                {grid}
            </div>

            <nav className="layout-header-content">
                <AweIcon type={aweIconType['icon-map']} className="header-icon" />
                <AweIcon type={aweIconType['icon-msg']} className="header-icon" />
                <Dropdown overlay={userMenu} trigger={['hover']}>
                    <div className="layout-header-user">
                        <Avatar icon={<UserOutlined />} />
                        <span>{props.myself.name}</span>
                    </div>
                </Dropdown>

                <Radio.Group
                    value={(window as any).isEn}
                    onChange={changeLanguage}
                    buttonStyle="solid"
                >
                    <Radio.Button value={false}>中</Radio.Button>
                    <Radio.Button value={true}>En</Radio.Button>
                </Radio.Group>
            </nav>
        </>
    )
}

export default LayoutHeader
