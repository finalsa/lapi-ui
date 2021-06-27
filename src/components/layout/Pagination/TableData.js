import t from 'typy';
function TableData({
    col,
    data,
    index = 1
}) {
    if (col.cell) {
        return (
            <td
                key={`tb-data-${index}-${col.name}-`}
                style={{ width: '1%', whiteSpace: "nowrap"}}
                className={`${col.className} m-0 px-0`}
            >
                {
                    col.cell(data, index)
                }
            </td>
        )
    }
    let result = t(data, col.selector).safeObject
    if (!result) {
        result = (col.default) ? col.default : ''
    }
    return (
        <>
            <td
                key={`tb-data-${index}-${col.name}-`}
                className={`${col.className} m-0`}
            >
                {result}
            </td>
        </>
    )
}
export default TableData