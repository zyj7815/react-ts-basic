import React from 'react'
import { Input, Dropdown, Menu } from 'antd'
import { InputProps } from 'antd/lib/input'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import { AweIcon, aweIconType } from '../../assets/iconfont'
import { AnimalProps } from '@/types/common'
import { debounce } from 'lodash'
import { Api } from '@/server/api'
import { Token } from '@/server/token'
import { errorMessage } from '@/server/error'
import { useLanguage } from '@/language/useLanguage'
import Highlighter from 'react-highlight-words'
import axios from 'axios'
import './index.less'

interface AweSearchOvalProps extends InputProps {
    height?: number
}

const HeaderSearch: React.FC<AweSearchOvalProps> = (props: AweSearchOvalProps) => {
    const [dataSource, setDataSource] = React.useState<AnimalProps[]>([])
    const [searchVal, setSearchVal] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(Api.biological.searchName(searchVal), Token.data)
                setDataSource(res.data)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                errorMessage.alert(err)
            }
        }

        if (searchVal) {
            fetchData()
        } else {
            setLoading(false)
            setDataSource([])
        }
    }, [searchVal])

    /**
     * 搜索，加500ms延迟搜索
     */
    const onSearchChange = debounce((name: string) => {
        setLoading(true)
        setSearchVal(name.replace(/ /g, ''))
    }, 500)

    const menu = dataSource.length ? (
        <Menu>
            {dataSource.map((animal: AnimalProps) => (
                <Menu.Item key={animal.id}>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[searchVal]}
                        autoEscape={true}
                        textToHighlight={animal.nickname}
                    />
                </Menu.Item>
            ))}
        </Menu>
    ) : (
        <Menu>
            <Menu.Item>{useLanguage.no_data_found}</Menu.Item>
        </Menu>
    )

    return (
        <Dropdown trigger={['click']} overlay={menu}>
            <span
                className="header-search-oval"
                style={props.height ? { height: props.height } : {}}
            >
                <Input {...props} onChange={e => onSearchChange(e.target.value)} />
                {loading ? <LoadingOutlined /> : <AweIcon type={aweIconType['icon-search2']} />}
            </span>
        </Dropdown>
    )
}

export default HeaderSearch
