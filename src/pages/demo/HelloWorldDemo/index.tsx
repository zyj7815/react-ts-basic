import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import Logo from './react-logo.svg'
import './index.less'

const Index: React.FC<RouteComponentProps> = (routeProps: RouteComponentProps) => {
    console.log(routeProps)

    return (
        <div className="App">
            <header className="App-header">
                <Logo className="App-logo" />
                <p className="App-content">Webpack - React - Typescript - TSLint 基础架构搭建</p>
            </header>
        </div>
    )
}

export default Index
