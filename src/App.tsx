import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '@/pages/login'
import { Auth } from '@/auth'
import AppLayout from '@/pages/layout'

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                {Auth.getAuth ? (
                    <Route path="/" component={AppLayout} />
                ) : (
                    <Route path="*" component={Login} />
                )}
            </Switch>
        </Router>
    )
}

export default App
