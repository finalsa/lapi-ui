import t from 'typy';

function getItemData(item, col, index) {
    if (col.cell) {
        return (
            <div onClick={(e) => e.stopPropagation()}>
                {
                    col.cell(item, index)
                }
            </div>
        )
    }
    let result = t(item, col.selector).safeObject
    if (!result) {
        return (col.default) ? col.default : ''
    }
    return result
}

function TableData({
    col,
    data,
    key = "",
    index = 1
}) {
    return (
        <>
            <td key={`tb-data-${key}`} className={`${col.className}`}>
                {getItemData(data, col, index)}
            </td>
        </>
    )
}
export default TableData