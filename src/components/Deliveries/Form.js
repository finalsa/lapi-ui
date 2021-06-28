import { useForm, Controller } from 'react-hook-form';
import { SelectLayout, DatePicker } from 'components/layout'
import DeliveryItems from './DeliveryItems';

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