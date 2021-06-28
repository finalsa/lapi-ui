import React, { useCallback, useEffect, useState } from "react"
import { Pagination, Notification } from 'components/layout'


function EntityList(props) {

    const [data, setData] = useState({})
    const { getEntityPagination, deleteEntity, path } = props

    let loadData = useCallback((actualPage = 0, search = "") => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
            } else {

            }
        }
        getEntityPagination({ page: actualPage, search : search }, true, callback)
    }, [getEntityPagination])

    let reload = () => {
        setData({})
        loadData()
    }

    let onSearch = (text) => {
        setData({})
        loadData(0, text)
    }

    useEffect(() => {
        loadData()
    }, [loadData])

    let deleteAction = (row) => {
        let callback = (res) => {
            if (res.ok) {
                reload()
            }
            else {

            }
        }
        deleteEntity(row.id, callback)
    }

    const cols = [
        {
            id: "delete-entity",
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
            selector: 'lab_chief.name',
            name: "Jefe de Labotorio",
            default : "-"
        },
    ]


    return (
        <>
            <div className="columns ml-0 pl-0 pt-0 mt-0 is-multiline ">
                <div className="column  ml-0 pl-0 pt-0 mt-0 is-full">
                    <div className="title ">
                        Entidades
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
                        title="Entidades"
                        data={data.data}
                        onAdd={() => {
                            props.history.replace(`${path}/form`);
                        }}
                        isLoading={(!data.data)}
                        onSearch={onSearch}
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

export default (EntityList)