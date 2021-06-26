import React, { useEffect, useState } from 'react'
import Form from 'components/Login'
import redux from 'reducers/utils/Redux'
import { LoadingBar } from 'components/layout'

function LoginModule(props) {
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(props)
    useEffect(() => {
        let callbackValidate = (ok) => {
            if (ok) {
                props.history.replace('/home');
            } else {
                setIsLoaded(true)
            }
        }
        if (props) {
            props.validateSession(callbackValidate)
        }
    }, [props])

    if (!isLoaded) {
        return (
            <LoadingBar></LoadingBar>
        )
    }
    return (
        <>
            <Form
                history={props.history}
                login={props.login}
            ></Form>
        </>
    )
}

export default redux(LoginModule)