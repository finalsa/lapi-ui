import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, ModalLayout } from 'components/layout'
import { reduxProperties } from 'reducers/utils/Redux'
import Form from 'components/Deliveries/Form'

function DeliveryForm(props) {

    const [data, setData] = useState(null)
    const [formData, setFormData] = useState(null)
    const { id } = props.match.params
    const { getDeliveryDetails, getEntityList } = props

    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        if (id) {
            getDeliveryDetails(id, {}, callback)
        }
        let dataCallback = (res) => {
            if (res.ok) {
                setFormData({
                    entities: res.body
                })
            }
        }
        getEntityList({ limit: 100, is_principal: 1 }, dataCallback)
    }, [getEntityList, getDeliveryDetails, id])

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
                title="Nueva Entrega"
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
                                getProductDetails={props.getProductDetails}
                                getProductList={props.getProductList}
                                entities={formData.entities}
                                onReturn={props.onReturn}
                                saveDelivery={props.saveDelivery}
                            ></Form>
                        )
                }
            </ModalLayout>

        </>
    )
}

export default reduxProperties(DeliveryForm)