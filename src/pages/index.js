import { Route, Switch } from 'react-router-dom';
import Login from 'pages/Login'
import Administration from 'pages/Home'

function Pages() {
    return (
        <div className={`App`}>
            <Switch>
                <Route path="/home">
                    <Administration></Administration>
                </Route>
                <Route path="/login" exact>
                    <Login></Login>
                </Route>
                <Route>
                    <Login></Login>
                </Route>
            </Switch>
        </div>
    )
}

export default Pages