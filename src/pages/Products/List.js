import React, { useCallback, useEffect, useState } from "react"
import { Pagination, Notification } from 'components/layout'


function ProductList(props) {

    const [data, setData] = useState({})
    const { getProductPagination, deleteProduct, path } = props

    let loadData = useCallback((actualPage = 0, search = '') => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        getProductPagination({ page: actualPage, search : search }, true, callback)
    }, [getProductPagination])

    let reload = () => {
        setData({})
        loadData()
    }

    useEffect(() => {
        loadData()
    }, [loadData])

    let searchAction = (text) => {
        setData({})
        loadData(0, text)
    }

    
    let deleteAction = (row) => {
        let callback = (res) => {
            if (res.ok) {
                reload()
            }
            else {

            }
        }
        deleteProduct(row.id, callback)
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
                        Productos
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
                        title="Productos"
                        data={data.data}
                        isLoading={(!data.data)}
                        onAdd={() => {
                            props.history.replace(`${path}/form`);
                        }}
                        onSearch={searchAction}
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

export default (ProductList)