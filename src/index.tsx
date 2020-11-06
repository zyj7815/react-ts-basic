import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
import dayjs from 'dayjs'
import { ConfigProvider } from 'antd'
import { Language } from '@/language'
import '@/assets/style/index.less'

dayjs.extend(require('dayjs/plugin/utc'))

Language.init()

ReactDOM.render(
    <ConfigProvider locale={(window as any).isEn ? enUS : zhCN}>
        <App />
    </ConfigProvider>,
    document.getElementById('root')
)
