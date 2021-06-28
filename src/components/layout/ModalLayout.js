import { BackButton } from 'components/layout'

function ModalLayout({
    children,
    className = "is-full",
    title = "",
    onReturn = () => { },
    onReload = null,
    options = null,
}) {
    return (
        <>
            <div className="columns">
                <div className={`column ${className}`}>
                    <div className="card px-5">
                        <div className="level  card-header-title py-1 pl-0 pr-0 m-0  mb-0 table-header">
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
                                </div>
                            </div>
                        </div>
                        <div className="card-header px-0">
                            <div className="level card-header-title  px-0 py-0">
                                <div className="level-left">
                                    <BackButton onReturn={onReturn}></BackButton>
                                </div>
                                <div className="level-right">
                                    {
                                        options
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="card-content px-0">
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