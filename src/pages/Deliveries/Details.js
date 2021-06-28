import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, ModalLayout } from 'components/layout'
import { reduxProperties } from 'reducers/utils/Redux'
import Details from 'components/Deliveries/Details'
import PrintableOptions from "components/Deliveries/PrintableOptions"

function DeliveryDetails(props) {

    const [data, setData] = useState(null)
    const { id } = props.match.params
    const { getDeliveryDetails, } = props

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
                title="Entrega"
                onReturn={props.onReturn}
                onReload={reload}
                options={
                    <PrintableOptions
                        getTemplateTypeList={props.getTemplateTypeList}
                        getTemplateList={props.getTemplateList}
                        getTemplateDetails={props.getTemplateDetails}
                        getItemDetails={props.getItemDetails}
                        getItemPagination={props.getItemPagination}
                        getItemList={props.getItemList}
                        getEntityDetails={props.getEntityDetails}
                        data={data}
                    ></PrintableOptions>
                }
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
                                getItemList={props.getItemList}
                                getTemplateList={props.getTemplateList}
                                getTemplateDetails={props.getTemplateDetails}
                                getItemDetails={props.getItemDetails}
                                getItemPagination={props.getItemPagination}
                                data={data}
                            ></Details>
                        )
                }
            </ModalLayout>

        </>
    )
}

export default reduxProperties(DeliveryDetails)