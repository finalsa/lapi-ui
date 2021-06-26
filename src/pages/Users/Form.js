import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, ModalLayout } from 'components/layout'
import { reduxProperties } from 'reducers/utils/Redux'
import Form from 'components/Users/Form'

function UserForm(props) {

    const [data, setData] = useState(null)
    const [formData, setFormData] = useState(null)
    const { id } = props.match.params
    const { getUserDetails } = props

    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        if (id) {
            getUserDetails(id, {}, callback)
        }
        setFormData({})
    }, [getUserDetails, id])

    let reload = () => {
        setData(null)
        loadData()
    }

    useEffect(() => {
        loadData()
    }, [loadData])

    return (
        <>

            <ModalLayout
                title="Nuevo Usuario"
                onReturn={props.onReturn}
                onReload={reload}
            >
                {
                    (!formData) ?
                        (
                            <LoadingBar
                                isSmall={true}
                                reload={reload}
                            ></LoadingBar>
                        ) : (
                            <Form
                                data={data}
                                onReturn={props.onReturn}
                                saveUser={props.saveUser}
                            ></Form>
                        )
                }
            </ModalLayout>

        </>
    )
}

export default reduxProperties(UserForm)