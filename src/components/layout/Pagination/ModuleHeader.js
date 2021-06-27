import ButtonHelper from "./ButtonHelper"
function TableHeader(
    {
        title,
        onSearch,
        onAdd,
        onReload,
        options,
    }
) {

    return (
        <>
            <div className="level py-0 px-1 m-0 table-header">
                <div className="level-left">
                    <div className="has-text-weight-bold has-text-black is-size-6">
                        {
                            title
                        }
                    </div>
                </div>
                <div className="level-right">
                    <ButtonHelper
                        onSearch={onSearch}
                        onAdd={onAdd}
                        onReload={onReload}
                        options={options}
                    ></ButtonHelper>
                </div>
            </div>
        </>
    )
}

export default TableHeader