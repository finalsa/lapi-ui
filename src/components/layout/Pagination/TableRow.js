import TableData from "./TableData"

function TableRow({
    className = "",
    isSelected = false,
    key = "",
    index = 0,
    data = {},
    cols = [],
    handleSelectedRow = () => { }
}) {
    let items = []
    let dataMapper = (col, i) => {
        items.push(
            <TableData
                key={`tb-row-${index}-${key}-${col}-${i}`}
                col={col}
                data={data}
                index={index}
            ></TableData>
        )
    } 
    cols.map(dataMapper)
    return (
        <>
            <tr key={`tb-row-${key}-${index}`} className={`${className} ${(isSelected) ? 'is-selected' : ''}`}
                onClick={() => handleSelectedRow(data, index)}>
                {
                    items
                }
            </tr>
        </>
    )
}
export default TableRow