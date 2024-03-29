import React from 'react'
import PaginationFooter from './Footer'
import { LoadingBar } from '..';
import ModuleHeader from './ModuleHeader';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import ModuleSearch from './ModuleSearch';

class PaginationModule extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: props.data,
            actualPage: 1,
            selected: null,
            objectPerPage: 100,
            rowSelected: -1,
            selectedItems: [],
            searchVisible: false
        }
        this.setDefaultProperties = this.setDefaultProperties.bind(this)
        this.handleChangePage = this.handleChangePage.bind(this)
        this.isSelected = this.isSelected.bind(this)
        this.setSearch = this.setSearch.bind(this)
        this.handleSelectedRow = this.handleSelectedRow.bind(this)
        this.setDefaultProperties(props)
    }

    setDefaultProperties({
        horizontal = false,
        automatic = false,
        title = '',
        className = 'box px-5',
        onSearch = false,
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
        this.onSearch = (onSearch) ? this.setSearch : null
        this.className = className
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

    setSearch() {
        this.setState({
            searchVisible: !this.state.searchVisible
        })
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
        let { cols, isLoading } = this.props
        let data = []
        let totalPages = 0
        if (this.automatic) {
            let start = (this.state.actualPage - 1) * this.state.objectPerPage
            let end = start + this.state.objectPerPage
            data = (this.props.data) ? this.props.data.slice(start, end) : []
            totalPages = Math.ceil(this.props.data.length / 10)
        } else {
            data = this.props.data
            totalPages = this.props.totalPages
        }

        if (!data || data.length === 0) {
            data = []
        }

        let headers = []
        let headersMapper = (col, i) => {
            headers.push(
                <TableHeader
                    col={col}
                    index={i}
                    key={`th-${i}-${this.key}-${this.state.actualPage}`}
                ></TableHeader>
            )
        }
        cols.map(headersMapper)
        let rows = []
        let dataMapper = (item, i) => {
            rows.push(
                <TableRow
                    isSelected={this.isSelected(i, item)}
                    key={`${this.key}-tb-${i}-${this.state.actualPage}`}
                    index={i}
                    data={item}
                    cols={cols}
                    handleSelectedRow={this.handleSelectedRow}
                ></TableRow>
            )
        }
        data.map(dataMapper)

        return (
            <div className={`${this.className} pt-1 `}>
                <div className={`p-0 mx-0 my-0 mt-2 table-container ${(false) ? " " : ''}`}>
                    <ModuleHeader
                        title={this.props.title}
                        onSearch={this.onSearch}
                        onAdd={this.props.onAdd}
                        onReload={this.props.onReload}
                        options={this.props.options}
                    ></ModuleHeader>
                    <ModuleSearch
                        isVisible={this.state.searchVisible}
                        onSearch={this.props.onSearch}
                    ></ModuleSearch>
                    {
                        (isLoading) ? (
                            <div className="table">
                                <LoadingBar
                                    className="container mt-3"
                                    isSmall={true}
                                    reload={this.onReload}
                                ></LoadingBar>
                            </div>

                        ) :
                            (
                                (rows.length > 0) ?
                                    (
                                        <table className="table is-fullwidth  is-striped is-narrow  is-hoverable">
                                            <thead className="py-6 my-6">
                                                <tr >
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
                                    )
                                    :
                                    (
                                        <div className="container mt-4 py-5">
                                            <div className="subtitle has-text-centered">
                                                {
                                                    this.noContentMessage
                                                }
                                            </div>
                                        </div>
                                    )
                            )
                    }

                </div>
                <div className={`p-0 mx-0 my-0 mt-4`}>
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