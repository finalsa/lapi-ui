function PrintableLayout(
    {
        children,
        id = "printable",
        height = '27.9cm',
        className = "box"
    }
) {
    return (
        <div className={`container ${className} px-3 pt-0  `} id={id} style={{ width: '21.6cm', height: height, overflow: "hidden" }}>
            <div className="columns is-multiline mx-0 pt-0 pt-0 ">
                <div className="column is-full  mb-0 px-6 pb-0 mx-0 ">
                    <div className="level ">
                        <div className="level-left">
                            <div className="level-item">
                                <figure className="image" style={{ width: '200px' }}>
                                    <img alt='logo_cgc' src=
                                        {"https://pruebas-finalsa.s3.amazonaws.com/kasaluna/logo-white-chico.png"}
                                    ></img>
                                </figure>

                            </div>
                        </div>
                        <div className="level-right">
                            <label
                                className="menu-label"
                            >
                                Resumen
                            </label>
                        </div>
                    </div>
                </div>
                {
                    children
                }
            </div>
        </div>
    )
}

export default PrintableLayout