import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, ModalLayout } from 'components/layout'
import { reduxProperties } from 'reducers/utils/Redux'
import Details from 'components/Products/Details'

function ProductDetails(props) {

    const [data, setData] = useState(null)
    const { id } = props.match.params
    const { getProductDetails } = props

    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        getProductDetails(id, {}, callback)
    }, [getProductDetails, id])

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
                title="Usuario"
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

export default reduxProperties(ProductDetails)