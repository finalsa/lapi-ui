import { BackButton } from 'components/layout'

function ModalLayout({
    children,
    className = "is-half",
    title = "",
    onReturn = () => { },
    onReload = null,
    options = null,
}) {
    return (
        <>
            <div className="columns">
                <div className={`column ${className}`}>
                    <div className="card">
                        <div className="level  card-header-title py-1 pl-5 pr-4 m-0  mb-0 table-header">
                            <div className="level-left">
                                <div className="has-text-weight-bold is-size-6">
                                    {
                                        title
                                    }
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="buttons">
                                    {
                                        (onReload) ? (
                                            <button className="button card-header-icon is-ghost" aria-label="more options" onClick={onReload}>
                                                <span className="icon">
                                                    <i className="fas fa-sync" aria-hidden="true"></i>
                                                </span>
                                            </button>
                                        ) :
                                            (null)
                                    }
                                    {
                                        options
                                    }
                                </div>

                            </div>
                        </div>
                        <div className="card-header">
                            <div className="card-header-title py-0">
                                <BackButton onReturn={onReturn}></BackButton>
                            </div>
                        </div>
                        <div className="card-content">
                            {
                                children
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalLayout