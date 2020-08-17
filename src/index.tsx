import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/App'
import '@/assets/style/style.less'
import { Language } from '@/language'

Language.init()

ReactDOM.render(<App />, document.getElementById('root'))
