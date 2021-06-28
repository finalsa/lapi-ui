import moment from "moment"
import {Pagination} from 'components/layout'
import { useState } from "react"
function DeliveryDetails(props) {
    const[items,  setItems] = useState(null)
    const { data } = props

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
                        isLoading={(!items)}
                        cols={[]}
                        data={items}
                    ></Pagination>
                </div>
            </div>
        </>
    )
}
export default DeliveryDetails