import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { stores, StoresContext } from '@/store'
import { RenderRoutes } from '@/router/RenderRoutes'
import { routes } from '@/router/router'
import { Loading } from '@/assets/images'
// import DynamicColor from 'dynamic-antd-theme'
import '@/assets/style/theme.css'

const App: React.FC = () => {
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)

        return function() {
            setTimeout(() => {
                const loading = document.getElementById('loading-wrapper')
                if (loading) {
                    loading.style.display = 'none'
                }
            }, 400)
        }
    })

    return (
        <>
            {/*<DynamicColor style={{ display: 'none' }} primaryColor="#77dd66" />*/}
            <section id="loading-wrapper" style={{ opacity: loading ? 1 : 0 }}>
                <img src={Loading} alt="" />
            </section>

            <Provider {...stores}>
                <StoresContext.Provider value={stores}>
                    <Router>{RenderRoutes(routes, true)}</Router>
                </StoresContext.Provider>
            </Provider>
        </>
    )
}

export default App
