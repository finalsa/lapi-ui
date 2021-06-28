import { useForm, Controller } from 'react-hook-form';
import { SelectLayout, Pagination, DatePicker, Counter } from 'components/layout'
import { useCallback, useEffect, useState } from 'react';
import ProductDetails from 'components/Products/Details';

function ItemModal({
    onClose,
    onAdd,
    getProductList
}) {
    const [selectedItem, setSelectedItem] = useState(null)
    const [data, setData] = useState([])

    let loadData = useCallback((search = '') => {
        let callback = (res) => {
            if (res.ok) {
                setData(res.body)
                setSelectedItem(res.body[0])
            }
        }
        getProductList({ limit: 20, search: search }, callback)
    }, [getProductList])

    useEffect(() => {
        loadData()
    }, [loadData])

    let add = () => {
        if (onAdd)
            onAdd(selectedItem)
        onClose()
    }

    let onSelect = (val, pos) => {
        setSelectedItem(
            data[pos]
        )
    }

    let search = (text) => {
        loadData(text)
    }

    let dataHelper = []
    let mapper = (item) => {
        dataHelper.push({
            label: `${item.reference}-${item.name}-${item.size}-${item.product_type.description}`,
            value: item.id
        })
    }
    data.map(mapper)
    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Agregar producto</p>
                        <button className="delete" aria-label="close" type="button" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="columns is-multiline">
                            <div className="column is-full">
                                <div className="field">
                                    <label className="label">
                                        Busqueda
                                    </label>
                                    <div className="control">
                                        <SelectLayout
                                            placeholder="a"
                                            onSearch={search}
                                            options={dataHelper}
                                            onSelect={onSelect}
                                        ></SelectLayout>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            (selectedItem) ? (
                                <>
                                    <ProductDetails
                                        data={selectedItem}
                                    ></ProductDetails>
                                </>
                            ) : null
                        }

                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-link" type="button" onClick={add}>Agregar</button>
                        <button className="button is-danger" type="button" onClick={onClose}>Cancel</button>
                    </footer>
                </div>
            </div>
        </>
    )
}

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
                            }}></input>
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
        {
            cell: (row, index) => {
                return (
                    <div className="field   py-0" style={{ width: "100px" }}>
                        <div className="control py-0">
                            <input className="input py-0 " onChange={(e) => {
                                onModify(index, "package_number", e.target.value)
                            }}></input>
                        </div>
                    </div>
                )
            },
            name: "Paquete",
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
                    ></ItemModal>
                ) :
                    null
            }
            <Pagination
                title="Productos"
                className=""
                data={items}
                automatic={true}
                onAdd={() => { setModal(true) }}
                cols={cols}
            ></Pagination>
        </>
    )
}


function DeliveryForm(props) {
    const { handleSubmit, register, errors, control } = useForm(
        {
            defaultValues: {
                items: []
            }
        }
    );
    let onSubmit = (event) => {
        console.log(event)
        let callback = (res) => {
            if (res.ok) {
                props.onReturn()
            }
        }
        let items = []
        let mapper = (item) => {
            items.push(
                {
                    product: item.id,
                    quantity: item["quantity"],
                    package_number: item["package_number"],
                    lote: item["lote"],
                    expiration_date: item["expiration_date"]
                }
            )
        }
        event.items.map(mapper)
        let data = {
            number: event.number,
            entity: event.entity,
            created_date: event.created_date,
            revision_date: event.revision_date,
            delivery_date: event.delivery_date,
            items: items,
        }
        console.log(data)
        props.saveDelivery(data, callback)
    }
    console.log(errors)

    return (
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="columns is-multiline">
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Número</label>
                            <div className="control">
                                <input
                                    {...register("number", { required: true })}
                                    type="text"
                                    className="input"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Entidad</label>
                            <div className="control">
                                <Controller
                                    control={control}
                                    name="entity"
                                    render={({ field: { onChange, onBlur, ref } }) => (
                                        <SelectLayout
                                            onSelect={(val) => onChange(val)}
                                            ref={ref}
                                            onBlur={onBlur}
                                            placeholder="Selecciona la entidad"
                                            options={props.entities}
                                            value="id"
                                            label="name"
                                        ></SelectLayout>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">
                                Fecha de emisión
                            </label>
                            <div className="control">
                                <Controller
                                    control={control}
                                    name="created_date"
                                    render={({ field: { onChange, onBlur, ref } }) => (
                                        <DatePicker
                                            ref={ref}
                                            onBlur={onBlur}
                                            setSelectedDate={onChange}
                                        ></DatePicker>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">
                                Fecha de revisión
                            </label>
                            <div className="control">
                                <Controller
                                    control={control}
                                    name="revision_date"
                                    render={({ field: { onChange, onBlur, ref } }) => (
                                        <DatePicker
                                            ref={ref}
                                            onBlur={onBlur}
                                            setSelectedDate={onChange}
                                        ></DatePicker>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">
                                Fecha de entrega
                            </label>
                            <div className="control">
                                <Controller
                                    control={control}
                                    name="delivery_date"
                                    render={({ field: { onChange, onBlur, ref } }) => (
                                        <DatePicker
                                            ref={ref}
                                            onBlur={onBlur}
                                            setSelectedDate={onChange}
                                        ></DatePicker>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="column is-full p-0 m-0">
                        <Controller
                            control={control}
                            name="items"
                            render={({ field: { onChange, onBlur, ref } }) => (
                                <DeliveryItems
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    ref={ref}
                                    getProductDetails={props.getProductDetails}
                                    getProductList={props.getProductList}
                                ></DeliveryItems>
                            )}
                        />
                    </div>
                </div>
                <div className="field">
                    {
                        (errors) ? (errors.map((e) => {
                            return (<div></div>)
                        })) :
                            null
                    }
                </div>
                <div className="field mt-3 pt-3">
                    <div className="buttons">
                        <button className="button is-fullwidth is-link" value="submit" type="submit">
                            Guardar
                        </button>
                        <button className="button is-fullwidth is-danger" type="button" onClick={props.onReturn}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default DeliveryForm