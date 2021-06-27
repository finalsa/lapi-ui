import TableHeader from './ModuleHeader';

function NoContent({
    className = "",
    title = "",
    onSearch,
    onAdd,
    onReload,
    options,
    message = ""
}
) {

    return (
        <>
            <section className={`${className} hero`}>
                <div className="hero-header">
                    <TableHeader
                        title ={title}
                        onSearch={onSearch}
                        onAdd={onAdd}
                        onReload={onReload}
                        options={options}
                    ></TableHeader>
                </div>
                <div className="hero-body">
                    <div className="columns">
                        <div className="column is-full">
                            <div className="subtitle">
                                {
                                    message
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}
export default NoContent