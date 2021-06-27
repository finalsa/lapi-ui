import React from 'react'
import PaginationFooter from './Footer'
import t from 'typy';
import { LoadingBar } from '..';
import ButtonHelper from './ButtonHelper';

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

    getItemData(item, col, index) {
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
                <section className={`${this.className} hero`}>
                    <div className="hero-header">
                        <div className="level py-1 px-5 m-0  mb-3 table-header">
                            <div className="level-left">
                                <div className="has-text-weight-bold is-size-6">
                                    {
                                        this.title
                                    }
                                </div>
                            </div>
                            <div className="level-right">
                                <ButtonHelper
                                    onSearch={this.props.onSearch}
                                    onAdd={this.props.onAdd}
                                    onReload={this.props.onReload}
                                ></ButtonHelper>
                            </div>
                        </div>
                    </div>
                    <div className="hero-body">
                        <div className="columns">
                            <div className="column is-full">
                                <div className="subtitle">
                                    {
                                        this.noContentMessage
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
        let headers = []
        let headersMapper = (item, i) => {
            if (item.abbr)
                headers.push(
                    <th key={`th-${this.state.actualPage}-h-${i}`} className="has-text-left">
                        <abbr title={item.name}>{item.abbr}</abbr>
                    </th>
                )
            else
                headers.push(
                    <th key={`th-${this.state.actualPage}-h-${i}`} className="has-text-left">
                        {item.name}
                    </th>
                )

        }
        cols.map(headersMapper)
        let rows = []
        let dataMapper = (item, i) => {
            let items = []
            let colMapper = (col, j) => {
                items.push(
                    <td key={`td-${this.state.actualPage}-${j}-${i}`}>{this.getItemData(item, col, i)}</td>
                )
            }
            cols.map(colMapper)
            rows.push(
                <tr key={`tr-${this.state.actualPage}-${i}`} className={` ${(this.isSelected(i, item)) ? 'is-selected' : ''}`}
                    onClick={() => this.handleSelectedRow(item, i)}>
                    {
                        items
                    }
                </tr>
            )
        }
        data.map(dataMapper)

        return (
            <div className={`${this.className} pt-1 px-0`}>
                {
                    (this.title) ? (
                        <div className="level py-1 px-5 m-0  mb-3 table-header">
                            <div className="level-left">
                                <div className="has-text-weight-bold is-size-6">
                                    {
                                        this.title
                                    }
                                </div>
                            </div>
                            <div className="level-right">
                                <ButtonHelper
                                    onSearch={this.props.onSearch}
                                    onAdd={this.props.onAdd}
                                    onReload={this.props.onReload}
                                    options={this.props.options}
                                ></ButtonHelper>
                            </div>
                        </div>
                    )
                        :
                        (
                            null
                        )

                }

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
                    {
                        (this.withoutFooter) ?
                            (
                                null
                            )
                            :
                            (
                                <PaginationFooter
                                    count={totalPages}
                                    actualPage={this.state.actualPage}
                                    onPageChange={this.handleChangePage}
                                ></PaginationFooter>
                            )
                    }
                </div>
            </div>
        )
    }

}

export default PaginationModule