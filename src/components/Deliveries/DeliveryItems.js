import { Pagination, DatePicker, Counter } from 'components/layout'
import { useState } from 'react';
import ItemModal from './ItemModal';

function DeliveryItems(props) {
    const [modal, setModal] = useState(false)
    const [items, setItems] = useState([])
    let deleteAction = (index) => {
        let helperItems = items
        helperItems.splice(index, 1)
        setItems(helperItems)
    }
    let onAddItem = (item) => {
        let itemsHelper = items
        item["quantity"] = 0
        item["package_number"] = ''
        item["lote"] = ''
        item["expiration_date"] = null
        itemsHelper.push(item)
        if (props.onChange) {
            props.onChange(itemsHelper)
        }
        setItems([...itemsHelper])
    }

    let onModify = (index, key, val) => {
        let itemsHelper = items
        let item = itemsHelper[index]
        item[key] = val
        if (props.onChange) {
            props.onChange(itemsHelper)
        }
        setItems([...itemsHelper])
    }
    const cols = [
        {
            name: "",
            id: "dasdas",
            cell: (row, index) => {
                return (
                    <button className="button is-small is-danger is-ghost"
                        onClick={() => deleteAction(index)}>
                        <span className="icon is-small">
                            <i className="fas fa-times"></i>
                        </span>
                    </button>

                )
            }
        },
        {
            cell: (row, index) => {
                return (
                    <div className="field   py-0" style={{ width: "100px" }}>
                        <div className="control py-0">
                            <input className="input py-0 " onChange={(e) => {
                                onModify(index, "package_number", e.target.value)
                            }} value={row["package_number"]} ></input>
                        </div>
                    </div>
                )
            },
            name: "Paquete",
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
            default: "Sin correo"
        },
        {
            cell: (row, index) => {
                return (
                    <div className="field  mr-3 py-0" style={{ width: "110px" }}>
                        <DatePicker
                            selectedDate={null}
                            setSelectedDate={(date) => {
                                onModify(index, "expiration_date", date)
                            }}
                        ></DatePicker>
                    </div>
                )
            },
            name: "Caducidad",
        },
        {
            cell: (row, index) => {
                return (
                    <div className="field  mr-3 py-0" style={{ width: "100px" }}>
                        <div className="control py-0">
                            <input className="input py-0 " onChange={(e) => {
                                onModify(index, "lote", e.target.value)
                            }} value={row["lote"]}></input>
                        </div>
                    </div>
                )
            },
            name: "Lote",
        },
        {
            cell: (row, index) => {
                return (
                    <div className="field  mr-3 py-0" style={{ width: "auto" }}>
                        <Counter
                            count={row['quantity']}
                            onChange={
                                (val) => {
                                    onModify(index, "quantity", val)
                                }
                            }
                            min={1}
                        ></Counter>
                    </div>
                )
            },
            name: "Canitidad",
        },


    ]

    return (
        <>
            {
                (modal) ? (
                    <ItemModal
                        onAdd={onAddItem}
                        onClose={() => { setModal(false) }}
                        items={items}
                        getProductDetails={props.getProductDetails}
                        getProductList={props.getProductList}
                        getTemplateTypeList={props.getTemplateTypeList}
                        getTemplateList={props.getTemplateList}
                        getTemplateDetails={props.getTemplateDetails}
                        getItemDetails={props.getItemDetails}
                        getItemPagination={props.getItemPagination}
                        getItemList={props.getItemList}
                        getEntityDetails={props.getEntityDetails}
                    ></ItemModal>
                ) :
                    null
            }
            <Pagination
                title="Productos"
                className="p-0 m-3"
                isSelectable={false}
                data={items}
                automatic={true}
                onAdd={() => { setModal(true) }}
                cols={cols}
            ></Pagination>
        </>
    )
}


export default DeliveryItems