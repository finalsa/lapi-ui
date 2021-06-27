function TableHeader(
    {
        col = {},
        index = 1,
    }
) {
    if (col.abbr)
        return (
            <th key={`th-h-${index}`} className="has-text-left">
                <abbr title={col.name}>{col.abbr}</abbr>
            </th>
        )
    else
        return (
            <th key={`th-h-${index}`} className="has-text-left">
                {col.name}
            </th>
        )

}

export default TableHeader