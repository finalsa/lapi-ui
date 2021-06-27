function EntityDetails(props) {
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
                                value={data.name}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}
export default EntityDetails