import moment from "moment"
import { Pagination } from 'components/layout'
import { useCallback, useEffect, useState } from "react"
function DeliveryDetails(props) {

    const [items, setItems] = useState(null)
    const { getItemList, data } = props

    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setItems(res.body)
            }
        }
        getItemList({ delivery: data.id }, callback)
    }, [getItemList, data])

    useEffect(() => {
        loadData()
    }, [loadData])

    return (
        <>
            <div className="columns is-multiline">
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Folio
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.number}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Version
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.version}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Entidad
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.entity.name}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Emisión
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={moment(data.created_date).format('DD/MM/YYYY')}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Revisión
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={moment(data.revision_date).format('DD/MM/YYYY')}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Entrega
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={moment(data.delivery_date).format('DD/MM/YYYY')}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-full">
                    <Pagination
                        className="p-0 m-0"
                        title="Productos"
                        onReload={loadData}
                        isLoading={(!items)}
                        cols={[
                            {
                                selector: 'package_number',
                                name: "Paquete",
                                default: "-"
                            },
                            {
                                "name" : "Nombre",
                                "selector" : "product_name"
                            },
                            {
                                selector: 'size',
                                name: "Tamaño"
                            },
                            {
                                selector: 'reference',
                                name: "Referencia"
                            },
                            {
                                selector: 'product_type',
                                name: "Tipo",
                                default: "Sin correo"
                            },
                            {
                                cell: (row) => (
                                    <div className="mr-4 ml-1">
                                        
                                        {(row.expiration_date) ? moment(row.expiration_date).format('DD/MM/YYYY') : 'NA'}
                                    </div>) ,
                                name: "Caducidad",
                                default: "NA"
                            },
                            {
                                selector: 'lote',
                                name: "Lote",
                                default: "NA"
                            },
                           
                            {
                                selector: 'quantity',
                                name: "Cantidad",
                                default: "0"
                            },
                        ]}
                        data={items}
                    ></Pagination>
                </div>
            </div>
        </>
    )
}
export default DeliveryDetails