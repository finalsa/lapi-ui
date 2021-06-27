import React, { useEffect, useState, useCallback } from 'react'
import HomeLayout from 'components/Home'
import { LoadingBar } from 'components/layout'
import redux from 'reducers/utils/Redux'
import NotFound from 'pages/404'
import Users from 'pages/Users'
import Entities from 'pages/Entities'

import { Route, Switch } from 'react-router'

function Home(props) {
    console.log(props)

    const [selectedPath, setSelectedPath] = useState('')
    const { getUser, logout, restartUser, getUserDetails, history } = props
    const { path } = props.match
    const logoutAction = useCallback(() => {
        restartUser()
        history.replace('/login');
    }, [restartUser, history])

    const callback = useCallback((res) => {
        if (res.ok) {
            setUser(res.body)
        } else {
            logout(null, logoutAction)
        }
    }, [logout, logoutAction])

    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log("render")
        getUser(callback, logoutAction, getUserDetails)

    }, [setUser, getUser, getUserDetails, callback, logoutAction,])

    if (!props) {
        return (
            <>
            </>
        )
    }

    if (!user) {
        return (
            <>
                <LoadingBar></LoadingBar>
            </>
        )
    }
    return (
        <>
            <HomeLayout path={selectedPath} user={user} logout={logout}>
                <Switch>
                    <Route path={`${path}/users`}>
                        <Users
                            setActualPage={setSelectedPath}
                        ></Users>
                    </Route>
                    <Route path={`${path}/entities`}>
                        <Entities
                            setActualPage={setSelectedPath}
                        ></Entities>
                    </Route>
                    <Route>
                        <NotFound
                            setActualPage={setSelectedPath}
                        ></NotFound>
                    </Route>
                </Switch>
            </HomeLayout>
        </>
    )
}

export default redux(Home)