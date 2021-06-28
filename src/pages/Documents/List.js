import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, Pagination, Notification } from 'components/layout'


function DocumentList(props) {

    const [data, setData] = useState(null)
    const { getDocumentPagination, deleteDocument, path } = props

    let loadData = useCallback((actualPage = 0) => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        getDocumentPagination({ page: actualPage }, true, callback)
    }, [getDocumentPagination])

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
        deleteDocument(row.id, callback)
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
            selector: 'person.name',
            name: "Nombre"
        },
        {
            selector: 'document_name',
            name: "Usuario"
        },
       
        {
            selector: 'person.phone',
            name: "Teléfono"
        },
        {
            selector: 'person.email',
            name: "Correo",
            default :"Sin correo"
        },
        {
            selector: 'entity.name',
            name: "Entidad"
        },
        {
            selector: 'document_type.description',
            name: "Rol"
        },
       
    ]


    return (
        <>
            <div className="columns ml-0 pl-0 pt-0 mt-0 is-multiline ">
                <div className="column  ml-0 pl-0 pt-0 mt-0 is-full">
                    <div className="title ">
                        Documentos
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
                        title="Documentos"
                        data={data.data}
                     
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

export default (DocumentList)