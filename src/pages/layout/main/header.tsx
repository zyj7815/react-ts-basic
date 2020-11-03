import React from 'react'
import { Dropdown, Layout, message, Radio, Menu, Avatar } from 'antd'
import { Token } from '@/server/token'
import { MySelf } from '@/store'

const { Header } = Layout

interface HeaderProps {
    myself: MySelf
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
            <Menu.Item onClick={logout}>退出登录</Menu.Item>
        </Menu>
    )

    return (
        <Header className="layout-wrapper-header">
            <div>{grid}</div>

            <nav className="layout-header-nav">
                <Dropdown overlay={userMenu} trigger={['click']}>
                    <div className="layout-header-user">
                        <Avatar style={{ background: '#16B351' }}>{props.myself.name[0]}</Avatar>
                        <span>{props.myself.name}</span>
                    </div>
                </Dropdown>

                <Radio.Group value={(window as any).isEn} onChange={changeLanguage}>
                    <Radio.Button value={false}>中</Radio.Button>
                    <Radio.Button value={true}>En</Radio.Button>
                </Radio.Group>
            </nav>
        </Header>
    )
}

export default LayoutHeader
