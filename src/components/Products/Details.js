function ProductDetails(props) {
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
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Referencia
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.reference}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                    <label className="label">
                            Tamaño
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.size}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="column is-half">
                    <div className="field">
                        <label className="label">
                            Tipo
                        </label>
                        <div className="control">
                            <input type="text"
                                className="input"
                                value={data.product_type.description}
                            >
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductDetails