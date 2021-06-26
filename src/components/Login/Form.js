import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Login({ history, login }) {

    const { handleSubmit, register, errors } = useForm();
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {

    }, [])

    let onLogin = (event) => {
        let email = event.email;
        let password = event.password;
        let callback = res => {
            console.log(res)
            if (res.ok) {
                if (res.body.status) {
                    setErrorMessage('Revisa tus credenciales')
                }
                else {
                    history.replace('/home');
                }
            } else {
                setErrorMessage('Ocurrió un error')
            }
        }
        let errorCallback = (res) => {
            console.log(res)
            setErrorMessage(res.status)
        }
        login(email, password, callback, errorCallback)
    }

    return (
        <>
            <section className="hero is-fullheight is-light">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column box px-6 is-4">
                                <form onSubmit={handleSubmit(onLogin)} className="px-4">
                                    <div className="field">
                                        <div className="columns is-justify-content-center">
                                            <div className="column is-full">
                                                <figure className="image ">
                                                    <img
                                                        src={"https://pruebas-finalsa.s3.amazonaws.com/kasaluna/logo-white.png"}
                                                        alt='logo' />
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="title has-text-centered has-text-black">
                                        Acceso
                                    </div>
                                    <div className="field">
                                        <label className="label">Usuario</label>
                                        <div className="control has-icons-left">
                                            <input type="text" placeholder="bobsmith@gmail.com"
                                                className="input" {...register("email", { required: true })} />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-envelope"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control has-icons-left">
                                            <input type="password" placeholder="*******"
                                                className="input" {...register("password", { required: true })} />
                                            <span className="icon is-small is-left">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="field">
                                        {errors && errors.password && errors.password.type === "required" &&
                                            <p className="has-text-danger">Ingrese la contraseña</p>}
                                        {errorMessage ? <code className="has-text-red">{errorMessage}</code> : null}
                                    </div>
                                    <div className="field">
                                        <div className="field is-grouped is-grouped-centered">
                                            <p className="control">

                                            </p>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="field is-grouped is-grouped-centered">
                                            <p className="control">
                                                <input type="submit" value="Ingresar" className="button is-fullwidth is-link" />
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;