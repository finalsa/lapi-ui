import { SelectLayout } from 'components/layout';
import { useForm, Controller } from 'react-hook-form';

function ProductForm(props) {

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
            product_type : event.product_type,
            reference : event.reference,
            size : event.size,
        }
        console.log(data)
        props.saveProduct(data, callback)
    }
    console.log(errors)
    return (
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="columns is-multiline">
                    <div className="column is-half">
                    <div className="field">
                            <label className="label">Tipo</label>
                            <div className="control">
                                <Controller
                                    control={control}
                                    name="product_type"
                                    render={({ field: { onChange, onBlur, ref } }) => (
                                        <SelectLayout
                                            onSelect={(val) => onChange(val)}
                                            ref={ref}
                                            onBlur={onBlur}
                                            placeholder="Selecciona el tipo de producto"
                                            options={props.productTypes}
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
                            <label className="label">Nombre</label>
                            <div className="control">
                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    className="input"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Referencia</label>
                            <div className="control">
                                <input
                                    {...register("reference", { required: true })}
                                    type="text"
                                    className="input"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">
                                Tamaño
                            </label>
                            <div className="control">
                                <input
                                    {...register("size", { required: true })}
                                    type="text"
                                    className="input"
                                ></input>
                            </div>
                        </div>
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

export default ProductForm