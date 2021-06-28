import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, ModalLayout } from 'components/layout'
import { reduxProperties } from 'reducers/utils/Redux'
import Form from 'components/Products/Form'

function ProductForm(props) {

    const [data, setData] = useState(null)
    const [formData, setFormData] = useState(null)
    const { id } = props.match.params
    const { getProductDetails,  getProductTypeList} = props

    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        if (id) {
            getProductDetails(id, {}, callback)
        }
        let dataCallback = (res) => {
            if (res.ok) {
                let list = res.body
                setFormData(
                    {
                        types : list
                    }
                )
            }
        }
        getProductTypeList({ limit: 100 }, dataCallback)
    }, [getProductTypeList, getProductDetails, id])

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
                title="Nuevo Producto"
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
                                productTypes={formData.types}
                                saveProduct={props.saveProduct}
                            ></Form>
                        )
                }
            </ModalLayout>

        </>
    )
}

export default reduxProperties(ProductForm)