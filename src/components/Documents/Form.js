import { useForm } from 'react-hook-form';

function DocumentForm(props) {

    const { handleSubmit, register, errors } = useForm();
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
        props.saveDocument(data, callback)
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
                                <input
                                    {...register("userName", { required: true })}
                                    type="text"
                                    className="input"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">
                                Fecha de emisión
                            </label>
                            <div className="control">
                                <input
                                    {...register("phone", { required: true })}
                                    type="text"
                                    className="input"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">
                            Fecha de revisión
                            </label>
                            <div className="control">
                                <input
                                    {...register("email", { required: true })}
                                    type="text"
                                    className="input"
                                ></input>
                            </div>
                        </div>
                    </div>

                    <div className="column is-half">
                        <div className="field">
                            <label className="label">
                            Fecha de revisión
                            </label>
                            <div className="control">
                                <input
                                    {...register("email", { required: true })}
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

export default DocumentForm