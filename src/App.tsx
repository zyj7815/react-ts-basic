import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { stores, StoresContext } from '@/store'
import { RenderRoutes } from '@/router/RenderRoutes'
import { routes } from '@/router/router'

const App: React.FC = () => {
    return (
        <Provider {...stores}>
            <StoresContext.Provider value={stores}>
                <Router>{RenderRoutes(routes, true)}</Router>
            </StoresContext.Provider>
        </Provider>
    )
}

export default App
