import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '@/pages/login'
import { Auth } from '@/auth'
import AppLayout from '@/pages/layout'
import '@/App.less'

const App: React.FC = () => {
    return (
        <Router>
            {Auth.getAuth ? (
                <Switch>
                    <Route path="/" component={AppLayout} />
                </Switch>
            ) : (
                <Switch>
                    <Route path="*" component={Login} />
                </Switch>
            )}
        </Router>
    )
}

export default App
