import { useForm, Controller } from 'react-hook-form';
import { SelectLayout, Pagination, DatePicker } from 'components/layout'

function DeliveryItems(props) {
    let deleteAction = () => { }
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
            default: "Sin correo"
        },
        {
            name: "Caducidad",

        }
    ]
    return (
        <>
            <Pagination
                title="Productos"
                className=""
                onAdd={() => { }}
                cols={cols}
            ></Pagination>
        </>
    )
}


function DeliveryForm(props) {
    const { handleSubmit, register, errors, control } = useForm();
    let onSubmit = (event) => {
        console.log(event)
        let callback = (res) => {
            if (res.ok) {
                props.onReturn()
            }
        }
        let data = {
            name: event.name,
            user_name: event.userName,
            phone: event.phone,
            email: event.email,
            user_type: 1,
            password: event.password,
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
                                    name="product_type"
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
                                    name="product_type"
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
                                    name="product_type"
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
                                    name="product_type"
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
                    <div className="column is-full">
                        <Controller
                            control={control}
                            name="product_type"
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