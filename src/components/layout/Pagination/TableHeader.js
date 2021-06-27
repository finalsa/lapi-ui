function TableHeader(
    {
        col = {},
        key="",
        index = 1,
    }
) {
    if (col.abbr)
        return (
            <th key={`th-${col.name}-h-${index}-${key}`} className="has-text-left">
                <abbr title={col.name}>{col.abbr}</abbr>
            </th>
        )
    else
        return (
            <th key={`th-${col.name}-h-${index}-${key}`} className="has-text-left">
                {col.name}
            </th>
        )

}

export default TableHeader