import redux from "reducers/utils/Redux"
import { Route, Switch } from 'react-router-dom';
import { useEffect } from "react";
import Details from './Details'
import Form from './Form'
import List from './List'

function UsersPage(props) {
    const { setActualPage, getUserPagination, getUserDetails, getUserList, saveUser, deleteUser, setUser, } = props
    const { path } = props.match

    const users = { getUserPagination, getUserDetails, getUserList, saveUser, deleteUser, setUser, }
    let onReturn = () => {
        props.history.replace(`${path}`);
    }
    useEffect(() => {
        if (setActualPage) {
            setActualPage('users')
        }
    }, [setActualPage])
    return (
        <>

            <Switch>
                <Route
                    path={`${path}/details/:id`}
                    exact
                >
                    <Details
                        onReturn={onReturn}
                        {...users}
                    ></Details>
                </Route>
                <Route
                    path={`${path}/form`}
                    exact
                >
                    <Form
                        onReturn={onReturn}
                        {...users}
                    ></Form>
                </Route>
                <Route
                    path={`${path}/edit/:id`}
                    exact
                >
                    <Form
                        onReturn={onReturn}
                        {...users}
                    ></Form>
                </Route>
                <Route
                    path={`${path}`}
                    exact
                >
                    <List
                        path={path}
                        history={props.history}
                        {...users}
                    ></List>
                </Route>
            </Switch>
        </>
    )
}

export default redux(UsersPage)