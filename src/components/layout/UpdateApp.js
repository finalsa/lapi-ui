import React from 'react'
import {LIGTH_COLOR} from 'configuration/manager'

function UpdateApp(
    {
        emptyCacheStorage
    }
) {
    return (
        <section className={`hero is-${LIGTH_COLOR} is-fullheight`}>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-centered box  px-6 is-6">
                            <div className="form">
                                <div className="field">
                                    <div className="columns is-justify-content-center">
                                        <div className="column is-3">
                                            <figure className="image ">
                                                <img
                                                    src="https://www.lifeder.com/wp-content/uploads/2017/09/escudo-de-quintana-roo.jpg"
                                                    alt='logo'/>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                                <div className="field py-3"></div>
                                <div className="field is-grouped is-grouped-centered">
                                    <p className="control">
                                        <button
                                            className="button"
                                            onClick={e => {
                                                e.preventDefault();
                                                emptyCacheStorage();
                                            }}
                                        >
                                            Actualizar aplicación a la última versión
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateApp