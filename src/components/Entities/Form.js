import { useForm } from 'react-hook-form';

function EntityForm(props) {

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
        props.saveEntity(data, callback)
    }
    console.log(errors)
    return (
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="columns is-multiline">
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
                            <label className="label">Nombre de Usuario</label>
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
                                Teléfono
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
                                Correo Electrónico
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
                            <label className="label">Contraseña</label>
                            <div className="control">
                                <input
                                    {...register("password", { required: true })}
                                    type="password"
                                    className="input"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="field">
                            <label className="label">Confirma Contraseña</label>
                            <div className="control">
                                <input
                                    {...register("conpassword", { required: true })}
                                    type="password"
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

export default EntityForm