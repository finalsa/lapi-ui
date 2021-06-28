import { LOGO } from "configuration/manager"

function PrintableLayout(
    {
        children,
        id = "printable",
        height = '25cm',
        className = "box",
        title = "PROCEDIMIENTO ALMACÉN",
        subtitle = "ACUSE DE ENTREGA",
        subsubtitle = "",
        totalPages = 1,
        page = 1,
        revisionDate = '',
        emisiónDate = '',
        version = '',
    }
) {
    return (
        <div className={`container ${className} px-0 pt-0  `} id={id} style={{ width: '19cm', height: height, overflow: "hidden" }}>
            <div className="columns is-multiline mx-0 pt-2 pt-0 ">
                <div className="column is-full  mb-0 px-0 pb-0 mx-0 ">
                    <div className="level">
                        <div className="level-left">
                            <div className="level-item">
                                <figure className="image" style={{ width: '100px' }}>
                                    <img alt='logo_cgc' src=
                                        {LOGO}
                                    ></img>
                                </figure>
                            </div>
                        </div>
                        <div className="level-item mr-0 pl-6 ml-6 has-text-centered p-0 is-size-7">
                                    GRUPO AFYA MEDIK, S.A. DE C.V.<br/>
                                    {title}<br/>
                                    {subtitle}<br/>
                                    {subsubtitle}<br/>
                        </div>
                        <div className="level-right pl-0 ml-0" >
                            <div className="level-item">
                                <p className="content is-size-7">
                                    Fecha de Emisión: {emisiónDate}	<br />
                                    No. De Revisión: {version}	<br />
                                    Fecha de Revisión: {revisionDate}<br />
                                    Página {page} de {totalPages}<br />
                                </p>
                            </div>
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