function DocumentDetails(props) {
    const { data } = props
    return (
        <>
            <div className="columns is-multiline">
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Nombre
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.person.name}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Usuario
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.user_name}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Usuario
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.phone}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Usuario
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.email}
                            >
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DocumentDetails