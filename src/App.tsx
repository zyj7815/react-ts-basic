import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { stores, StoresContext } from '@/provider'
import { RenderRoutes } from '@/router/RenderRoutes'
import { routes } from '@/router/router'
import { Language } from '@/language'
import '@/assets/style/theme.css'

const App: React.FC = () => {
    React.useEffect(() => {
        Language.init()
    }, [])

    return (
        <>
            <Provider {...stores}>
                <StoresContext.Provider value={stores}>
                    <Router>{RenderRoutes(routes, true)}</Router>
                </StoresContext.Provider>
            </Provider>
        </>
    )
}

export default App
