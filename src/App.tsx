import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '@/pages/login'
import { Auth } from '@/auth'
import AppLayout from '@/pages/layout'
import { Provider } from 'mobx-react'
import { stores, StoresContext } from '@/store'

const App: React.FC = () => {
    return (
        <Provider {...stores}>
            <StoresContext.Provider value={stores}>
                <Router>
                    <Switch>
                        {Auth.getAuth ? (
                            <Route path="/" component={AppLayout} />
                        ) : (
                            <Route path="*" component={Login} />
                        )}
                    </Switch>
                </Router>
            </StoresContext.Provider>
        </Provider>
    )
}

export default App
