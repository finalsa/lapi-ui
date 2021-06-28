import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, ModalLayout } from 'components/layout'
import { reduxProperties } from 'reducers/utils/Redux'
import Details from 'components/Deliveries/Details'

function DeliveryDetails(props) {

    const [data, setData] = useState(null)
    const { id } = props.match.params
    const { getDeliveryDetails } = props

    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        getDeliveryDetails(id, {}, callback)
    }, [getDeliveryDetails, id])

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
                title="Deliveryo"
                onReturn={props.onReturn}
                onReload={reload}
            >
                {
                    (!data) ?
                        (
                            <LoadingBar
                                isSmall={true}
                                reload={reload}
                            ></LoadingBar>
                        ) : (
                            <Details
                                data={data}
                            ></Details>
                        )
                }
            </ModalLayout>

        </>
    )
}

export default reduxProperties(DeliveryDetails)