import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, Pagination, Notification } from 'components/layout'


function DeliveryList(props) {

    const [data, setData] = useState(null)
    const { getDeliveryPagination, deleteDelivery, path } = props

    let loadData = useCallback((actualPage = 0) => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        getDeliveryPagination({ page: actualPage }, true, callback)
    }, [getDeliveryPagination])

    let reload = () => {
        setData(null)
        loadData()
    }

    useEffect(() => {
        loadData()
    }, [loadData])

    if (!data) {
        return (
            <LoadingBar
                reload={reload}
            ></LoadingBar>
        )
    }
    let deleteAction = (row) => {
        let callback = (res) => {
            if (res.ok) {
                reload()
            }
            else {

            }
        }
        deleteDelivery(row.id, callback)
    }

    const cols = [
        
        {
            name: "",
            id: "dasdas",
            cell: (row) => {
                return (
                    <button className="button is-small is-danger is-ghost"
                        onClick={() => deleteAction(row)}>
                        <span className="icon is-small">
                            <i className="fas fa-times"></i>
                        </span>
                    </button>

                )
            }
        },
        {
            selector: 'name',
            name: "Nombre"
        },
        {
            selector: 'reference',
            name: "Referencia"
        },
       
        {
            selector: 'size',
            name: "Tamaño"
        },
        {
            selector: 'product_type.description',
            name: "Tipo",
            default :"Sin correo"
        },
    ]


    return (
        <>
            <div className="columns ml-0 pl-0 pt-0 mt-0 is-multiline ">
                <div className="column  ml-0 pl-0 pt-0 mt-0 is-full">
                    <div className="title ">
                        Entregas
                    </div>
                </div>
                <div className="column is-full pl-0">
                    <Notification></Notification>
                </div>
                <div className="column is-full ml-0 pl-0 ">
                    <Pagination
                        cols={cols}
                        onSelectedRow={(row) => {
                            props.history.replace(`${path}/details/${row.id}`);
                        }}
                        title="Entregas"
                        data={data.data}
                        onAdd={() => {
                            props.history.replace(`${path}/form`);
                        }}
                        onReload={reload}
                        totalPages={data.total_pages}
                        automatic={false}
                        handleChangePage={loadData}
                        count={data.actualPage}
                    ></Pagination>
                </div>
            </div>
        </>
    )
}

export default (DeliveryList)