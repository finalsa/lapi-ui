import { PrintableLayout, Pagination } from "components/layout"
import moment from "moment"
import { useCallback, useEffect, useState } from "react"
import { createPdf } from 'utils/index'
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function PrintableDetailsEntitty(props) {
    const [entity, setEntity] = useState(null)
    const { data, getEntityDetails, children } = props
    let loadData = useCallback(() => {
        let callback = (res) => {
            console.log(res)
            if (res.ok) {
                setEntity(res.body)
            }
        }
        console.log(data)
        getEntityDetails(data.entity.id, null, callback)
    }, [getEntityDetails, data])

    useEffect(() => {
        loadData()
    }, [loadData])

    console.log(entity)

    if (!entity) {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <div className="column is-full is-size-7 py-0">
                EN EL {entity.state} EL DÍA {new Date(data.delivery_date).toLocaleDateString('es-MX', options).toUpperCase()}, REUNIDOS EN LAS  INSTALACIONES QUE OCUPA EL {
                    entity.name
                }, {entity.direction}; DIRECTOR , {entity.director?.name},  ADMINISTRADOR , {entity.admin?.name} , JEFE DE LABORATORIO {entity.lab_chief?.name} ;
                AFYA MEDIK, S. A. DE C. V. ING. ALEXIS CORTES BENITEZ  REPRESENTANTE, HACEN CONSTAR LOS SIGUIENTES:
            </div>
            {
                children
            }
            <div className="column is-full is-size-7">
                <div className="columns is-multiline p-0 m-0 has-text-centered">
                    <div className="column is-full">
                        SERVICIOS DE SALUD DE VERACRUZ<br />
                        {entity.name}
                    </div>
                    <div className="column is-full py-1">
                        {entity.lab_chief?.name}<br />
                        JEFE DE LABORATORIO
                    </div>
                    <div className="column is-full">
                        AFYA MEDIK, S. A. DE C. V.
                    </div>
                    <div className="column is-full  py-1">
                        ING. ALEXIS CORTES BENITEZ<br />
                        PRESENTE
                    </div>
                    <div className="column is-full  py-1">
                        ING. ALEXIS CORTES BENITEZ<br />
                        LOGISTICA
                    </div>
                </div>
            </div>
        </>
    )
}

function PrintableDetails(props) {
    const [items, setItems] = useState(null)
    const { getItemList, data, selectedType } = props

    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setItems(res.body)
            }
        }
        getItemList({ delivery: data.id, product_type: selectedType }, callback)
    }, [getItemList, data, selectedType])

    useEffect(() => {
        loadData()
    }, [loadData])

    return (
        <>
            <PrintableLayout 
                className="has-text-justified"
                expiration_date={moment(data.expiration_date).format("DD/MM/YYYY")}
                subsubtitle={data.number}
                version={data.version}
                emisiónDate={moment(data.created_date).format("DD/MM/YYYY")}
                revisionDate={moment(data.created_date).format("DD/MM/YYYY")}
            >
                <div className="column is-full py-0 mb-0 mt-2  has-background-black has-text-white has-text-centered is-size-7">
                    ENTREGA - RECEPCIÓN DE INSUMOS  Y REACTIVOS
                </div>
                <PrintableDetailsEntitty
                    data={data}
                    getEntityDetails={props.getEntityDetails}
                >
                    <div className="column is-full is-size-7 py-0 my-0">
                        <Pagination
                            title="Productos"
                            data={items}
                            className="p-0 m-0"
                            cols={[
                                {
                                    selector: 'package_number',
                                    name: "Paquete",
                                    default: "-"
                                },
                                {
                                    "name": "Nombre",
                                    "selector": "product_name"
                                },
                                {
                                    selector: 'size',
                                    name: "Tamaño"
                                },
                                {
                                    selector: 'reference',
                                    name: "Referencia"
                                },
                                {
                                    selector: 'product_type',
                                    name: "Tipo",
                                    default: "Sin correo"
                                },
                                {
                                    cell: (row) => (
                                        <div className="mr-4 ml-1">

                                            {(row.expiration_date) ? moment(row.expiration_date).format('DD/MM/YYYY') : 'NA'}
                                        </div>),
                                    name: "Caducidad",
                                    default: "NA"
                                },
                                {
                                    selector: 'lote',
                                    name: "Lote",
                                    default: "NA"
                                },

                                {
                                    selector: 'quantity',
                                    name: "Cantidad",
                                    default: "0"
                                },
                            ]}
                        ></Pagination>
                    </div>
                    <div className="column is-full is-size-7 py-0">
                        REALIZANDO LA REVISIÓN FÍSICA Y DOCUMENTAL CORRESPONDIENTE AL CONTRATO ANUAL 2021-2021 NÚMERO LPN-103T000000-007-2021, SUMINISTRO DE PRUEBAS CENTRO DE ALTA ESPECIALIDAD  DR. RAFAEL LUCIO  A SERVICIOS DE SALUD DE VERACRUZ , PARA LO CUAL SE LEVANTA LA PRESENTE ACTA.
                        LO ANTERIOR SE ASIENTA PARA DAR SEGUIMIENTO AL CUMPLIMIENTO DEL CONTRATO ANUAL EN MENCIÓN. NO HABIENDO OTRO ASUNTO QUE TRATAR, SE DA POR TERMINADA LA PRESENTE ACTA, FIRMANDO AL MARGEN Y AL CALCE LOS QUE EN ELLA INTERVIENEN, PARA DEBIDA CONSTANCIA, EL MISMO DÍA EN QUE SE ACTÚA.
                    </div>
                </PrintableDetailsEntitty>
                <div className="column is-full is-size-7 py-0">
                    SE FORMALIZA LA ENTREGA CORRESPONDIENTE A LA ENTREGA DE INSUMOS Y REACTIVOS POR PARTE DE LA EMPRESA AFYA MEDIK, S. A. DE C. V. AL {data.entity.name} , EN EL SIGUIENTE LISTADO:
                </div>
                <div className="column is-full is-size-7 py-0">
                    Comentarios:
                    <textarea className="textarea"></textarea>
                </div>
            </PrintableLayout>
        </>
    )
}

function PrintableModal(props) {
    const [templates, setTemplates] = useState([0])
    const { selectedType, onClose, getTemplateList, data } = props
    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setTemplates(res.body)
            }
        }
        if (selectedType) {
            getTemplateList({ entity: data.entity.id, template_type: selectedType }, callback)
        }
    }, [getTemplateList, selectedType, data])

    useEffect(() => {
        loadData()
    }, [loadData])

    if (!data || !selectedType) {
        return (
            <>

            </>
        )
    }
    let download = () => {
        createPdf(window, document, 'printable', `orden-${data.id}-${selectedType}`,)
    }
    return (
        <>
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card is-max">
                    <header className="modal-card-head">
                        <p className="modal-card-title">
                            Vista de impresión
                        </p>
                        <button className="delete" aria-label="close" type="button" onClick={onClose}></button>
                    </header>
                    <section className="modal-card-body">
                        <PrintableDetails
                            data={data}
                            getItemDetails={props.getItemDetails}
                            getItemPagination={props.getItemPagination}
                            getItemList={props.getItemList}
                            selectedType={selectedType}
                            getEntityDetails={props.getEntityDetails}
                        ></PrintableDetails>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" type="button" onClick={download}>Aceptar</button>
                        <button className="button is-danger" type="button" onClick={onClose}>Cancelar</button>
                    </footer>
                </div>
            </div>
        </>
    )
}

function PrintableOptions(props) {
    const [templateTypes, setTemplateTypes] = useState([])
    const [selectedType, setSelectedType] = useState(0)
    const { getTemplateTypeList, data } = props
    let loadData = useCallback(() => {
        let callback = (res) => {
            if (res.ok) {
                setTemplateTypes(res.body)
            }
        }
        getTemplateTypeList({}, callback)
    }, [getTemplateTypeList])

    useEffect(() => {
        loadData()
    }, [loadData])


    let buttons = []
    let mapper = (item, i) => {
        buttons.push(
            <button className="button is-ghost mr-0 pr-0" key={`button-printable-${i}-${item.id}`} type="button"
                onClick={() => {
                    setSelectedType(item.id)
                }}
            >
                <span className="icon is-left">
                    <i className="fas fa-print"></i>
                </span>
                <span>
                    {
                        item.description
                    }
                </span>


            </button>
        )
    }
    templateTypes.map(mapper)

    return (
        <>
            <PrintableModal
                onClose={() => { setSelectedType(0) }}
                selectedType={selectedType}
                data={data}
                getTemplateList={props.getTemplateList}
                getTemplateDetails={props.getTemplateDetails}
                getItemDetails={props.getItemDetails}
                getItemPagination={props.getItemPagination}
                getItemList={props.getItemList}
                getEntityDetails={props.getEntityDetails}
            ></PrintableModal>
            <div className="buttons">
                {
                    buttons
                }
            </div>
        </>
    )
}
export default PrintableOptions