import React, { useCallback, useEffect, useState } from "react"
import { LoadingBar, Pagination, Notification } from 'components/layout'


function UserList(props) {

    const [data, setData] = useState(null)
    const { getUserPagination, deleteUser, path } = props

    let loadData = useCallback((actualPage = 0) => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        getUserPagination({ page: actualPage }, true, callback)
    }, [getUserPagination])

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
        deleteUser(row.id, callback)
    }

    const cols = [
        {
            name: "Borrar",
            cell: (row) => {
                return (
                    <div className="buttons">
                        <button className="button is-small is-danger is-outlined"
                            onClick={() => deleteAction(row)}>
                            <span>Borrar</span>
                            <span className="icon is-small">
                                <i className="fas fa-times"></i>
                            </span>
                        </button>
                    </div>
                )
            }
        },
        {
            selector: 'user_name',
            name: "Usuario"
        },
        {
            selector: 'name',
            name: "Nombre"
        },
        {
            selector: 'phone',
            name: "Teléfono"
        },
        {
            selector: 'email',
            name: "Correo"
        },
        {
            selector: 'user_type.name',
            name: "Rol"
        },
    ]


    return (
        <>
            <div className="columns ml-0 pl-0 pt-0 mt-0 is-multiline ">
                <div className="column  ml-0 pl-0 pt-0 mt-0 is-full">
                    <div className="title ">
                        Usuarios
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
                        title="Usuarios"
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

export default (UserList)