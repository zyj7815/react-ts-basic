import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Logo from './react-logo.svg'
import './index.less'

const Index: React.FC<RouteComponentProps> = (routeProps: RouteComponentProps) => {
    return (
        <div className="App">
            <section className="App-section">
                <Logo className="App-logo" />
                <p className="App-content">Webpack - React - Typescript - TSLint 基础架构搭建</p>
                <div className="App-desc">123</div>
            </section>
        </div>
    )
}

export default Index
