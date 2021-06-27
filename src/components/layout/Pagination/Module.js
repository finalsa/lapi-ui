import React from 'react'
import PaginationFooter from './Footer'
import { LoadingBar } from '..';
import NoContent from './NoContent';
import ModuleHeader from './ModuleHeader';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

class PaginationModule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: props.data,
            actualPage: 1,
            selected: null,
            objectPerPage: 10,
            rowSelected: -1,
            selectedItems: [],
        }
        this.setDefaultProperties = this.setDefaultProperties.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.handleSelectedRow = this.handleSelectedRow.bind(this)
        this.setDefaultProperties(props)
    }

    setDefaultProperties({
        horizontal = false,
        automatic = false,
        title = '',
        onSave = false,
        onSearch = false,
        onReload = false,
        className = 'box',
        withoutFooter = false,
        multipleSelection = false,
        noContentMessage = ":( No hay datos suficientes para mostrar.",
        isSelectable = true,
        hasHeader = true,
        key = "",
    }) {
        this.horizontal = horizontal
        this.automatic = automatic
        this.title = title
        this.canAdd = onSave
        this.className = className
        this.canSearch = onSearch
        this.canReload = onReload
        this.withoutFooter = withoutFooter
        this.noContentMessage = noContentMessage
        this.multipleSelection = multipleSelection
        this.isSelectable = isSelectable
        this.hasHeader = hasHeader
        this.key = key
    }

    handleSelectedRow(row, index) {
        if (this.isSelectable) {
            if (!this.multipleSelection) {
                if (this.state.rowSelected === index) {
                    this.setState({ selected: null, rowSelected: -1 })
                    return
                }
                let callback = () => {
                    if (this.props.onSelectedRow) {
                        this.props.onSelectedRow(row, index)
                    }
                }
                this.setState({ selected: row, rowSelected: index }, callback)
            }
            else {
                let items = this.state.selectedItems
                items.push(row)
                let callback = () => {
                    if (this.props.onSelectedRows) {
                        this.props.onSelectedRows(items)
                    }
                }
                this.setState({ selectedItems: items }, callback)
            }
        }
    }

    handleChangePage(pageNumber) {
        if (this.props.handleChangePage) {
            this.props.handleChangePage(pageNumber - 1)
        }
        this.setState({ actualPage: pageNumber, selected: null, rowSelected: -1 },)
    }


    isSelected(index, item) {
        if (!this.multipleSelection) {
            return (this.state.selected && this.state.rowSelected === index)
        } else {
            return this.state.selectedItems.includes(item)
        }
    }

    render() {
        let { cols } = this.props
        let data = []
        let totalPages = 0
        if (this.props.isLoading) {
            return (
                <LoadingBar
                    isFull={false}
                ></LoadingBar>
            )
        }
        if (this.automatic) {
            let start = (this.state.actualPage - 1) * this.state.objectPerPage
            let end = start + this.state.objectPerPage
            data = this.props.data.slice(start, end)
            totalPages = Math.ceil(this.props.data.length / 10)
        } else {
            data = this.props.data
            totalPages = this.props.totalPages
        }

        if (!data || data.length === 0) {
            return (
                <NoContent
                    title={this.title}
                    className={this.className}
                    message={this.noContentMessage}
                    onSearch={this.noContentMessage}
                    onAdd={this.props.onAdd}
                    onReload={this.props.onReload}
                    options={this.props.options}
                >
                </NoContent>
            )
        }
        let headers = []
        let headersMapper = (col, i) => {
            headers.push(
                <TableHeader
                    col={col}
                    index={i}
                    key={`${this.key}-${this.state.actualPage}`}
                ></TableHeader>
            )
        }
        cols.map(headersMapper)
        let rows = []
        let dataMapper = (item, i) => {
            rows.push(
                <TableRow
                    isSelected={this.isSelected(i, item)}
                    key={`${this.key}-${this.state.actualPage}`}
                    index={i}
                    data={item}
                    cols={cols}
                    handleSelectedRow={this.handleSelectedRow}
                ></TableRow>
            )
        }
        data.map(dataMapper)

        return (
            <div className={`${this.className} pt-1 px-0`}>
                <ModuleHeader
                    title={this.props.title}
                    onSearch={this.props.onSearch}
                    onAdd={this.props.onAdd}
                    onReload={this.props.onReload}
                    options={this.props.options}
                ></ModuleHeader>
                <div className={` px-5 mx-0 table-container my-5 ${(false) ? " " : ''}`}>
                    <table className="table is-fullwidth is-striped  is-hoverable   ">
                        <thead>
                            <tr>
                                {
                                    headers
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                rows
                            }
                        </tbody>
                    </table>
                </div>
                <div className={` px-5 mx-0 my-0`}>
                    <PaginationFooter
                        isHidden={this.withoutFooter}
                        count={totalPages}
                        actualPage={this.state.actualPage}
                        onPageChange={this.handleChangePage}
                    ></PaginationFooter>
                </div>
            </div>
        )
    }

}

export default PaginationModule