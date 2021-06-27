import React, { } from 'react';

class Pagination extends React.Component {

    constructor(props) {
        super(props);
        this.state = { actualPage: props.actualPage ? props.actualPage : 1 }
        this.handleNextPage = this.handleNextPage.bind(this)
        this.handlePreviousPage = this.handlePreviousPage.bind(this)
        this.handleClickPage = this.handleClickPage.bind(this)
    }

    handleNextPage() {
        if (this.state.actualPage <= this.props.count) {
            const next = this.state.actualPage + 1
            this.setState({ actualPage: next })
            if (this.props.onPageChange)
                this.props.onPageChange(next)
        }
    }

    handlePreviousPage() {
        if (this.state.actualPage > 1) {
            const previous = this.state.actualPage - 1
            this.setState({ actualPage: previous })
            if (this.props.onPageChange)
                this.props.onPageChange(previous)
        }
    }

    handleClickPage(page) {
        if (this.props.onPageChange)
            this.props.onPageChange(page)
        this.setState({ actualPage: page })

    }


    render() {
        if (this.props.isHidden) {
            return (
                <>
                </>
            )
        }
        let number = this.props.count
        if (!number)
            return (null)
        const numbers = []
        if (number > 10) {
            if (this.state.actualPage < 4) {
                for (let i = 1; i < 4; ++i) {
                    numbers.push(
                        (this.state.actualPage === i) ?
                            (
                                <button
                                    className={`pagination-link is-current button`}
                                    key={`pagination-${i}`}
                                    aria-label={`Page ${i}`}
                                    aria-current="page"
                                    type="button"
                                >{i}</button>
                            )
                            :
                            (
                                <button
                                    className={`pagination-link button`}
                                    key={`pagination-${i}`}
                                    aria-label={`Goto Page ${i}`}
                                    aria-current="page"
                                    type="button"
                                    onClick={() => this.handleClickPage(i)}
                                >{i}</button>
                            )
                    )
                }
            } else {
                numbers.push(
                    <button
                        className={`pagination-link button`}
                        aria-label="Goto page 1"
                        type="button"
                        key={`pagination-1`}
                        onClick={() => this.handleClickPage(1)}>{1}</button>
                )

            }
            numbers.push(
                <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                </li>
            )
            let topLimit = (number - 3);
            if (this.state.actualPage <= (topLimit + 1)) {
                if (this.state.actualPage === 3) {
                    numbers.push(
                        <button
                            className={`pagination-link button`}
                            aria-label="Goto page 4"
                            type="button"
                            key={`pagination-4`}
                            onClick={() => this.handleClickPage(4)}>{4}</button>
                    )
                    numbers.push(
                        <li>
                            <span className="pagination-ellipsis">&hellip;</span>
                        </li>
                    )
                } else if (this.state.actualPage === (topLimit + 1)) {
                    numbers.push(
                        <button
                            className={`pagination-link button `}
                            type="button"
                            aria-label={`Goto Page ${(topLimit)}`}
                            onClick={() => this.handleClickPage((topLimit))}>{(topLimit)}</button>
                    )
                } else if (this.state.actualPage > 3) {
                    let actual = this.state.actualPage
                    let past = actual - 1
                    let next = actual + 1
                    numbers.push(
                        <button
                            className={`pagination-link button`}
                            key={`pagination-${past}`}
                            type="button"
                            aria-label={`Goto Page ${(past)}`}
                            onClick={() => this.handleClickPage((past))}>{(past)}</button>
                    )
                    numbers.push(
                        <button
                            className={`pagination-link button is-current`}
                            aria-label={`Page ${(actual)}`}
                            type="button"
                            key={`pagination-${actual}`}
                        >{actual}</button>
                    )
                    numbers.push(
                        <button
                            className={`pagination-link button`}
                            aria-label={`Goto Page ${(next)}`}
                            key={`pagination-${next}`}
                            type="button"
                            onClick={() => this.handleClickPage((next))}>{(next)}</button>
                    )
                    numbers.push(
                        <li>
                            <span className="pagination-ellipsis">&hellip;</span>
                        </li>
                    )
                }
            }

            if (this.state.actualPage > topLimit) {
                for (let i = (number - 2); i <= number; ++i) {
                    numbers.push(
                        (this.state.actualPage === i) ?
                            (
                                <button
                                    className={`pagination-link is-current button`}
                                    key={`pagination-${i}`}
                                    type="button"
                                    aria-label={`Page ${i}`}
                                    aria-current="page">{i}</button>
                            )
                            :
                            (
                                <button
                                    className={`pagination-link button`}
                                    key={`pagination-${i}`}
                                    aria-label={`Page ${i}`}
                                    type="button"
                                    aria-current="page"
                                    onClick={() => this.handleClickPage(i)}>{i}</button>
                            )
                    )
                }
            } else {
                numbers.push(
                    <button
                        className={`pagination-link button`}
                        aria-label={`Goto page ${number}`}
                        key={`pagination-${number}`}
                        type="button"
                        onClick={() => this.handleClickPage(number)}>{number}
                    </button>
                )
            }
        } else {
            numbers.push((this.state.actualPage === 1) ?
                <button className={`pagination-link is-current button`}
                    type="button"
                    key="pagination-1" aria-label="Page 1"
                    aria-current="page">{1}</button> :
                <button className={`pagination-link button`}
                    type="button"
                    aria-label="Goto page 1"
                    onClick={() => this.handleClickPage(1)}>{1}</button>
            )
            for (let i = 2; i < number; ++i) {
                numbers.push((this.state.actualPage === i) ?
                    <button className={`pagination-link is-current  button`}
                        type="button"
                        key={`pagination-${i}`}
                        aria-label={`Page ${i} `} aria-current="page">{i}</button> :
                    <button className={`pagination-link button`}
                        type="button"
                        key={`pagination-${i}`} aria-label={`Go to page ${i} `}
                        onClick={() => this.handleClickPage(i)}>{i}</button>
                )
            }
            if (number !== 1)
                numbers.push((this.state.actualPage === number) ?
                    <button className={`pagination-link is-current button`}
                        type="button"
                        key={`pagination-${number}`}
                        aria-label={`Page ${number} `} aria-current="page">{number}</button> :
                    <button className={`pagination-link button`}
                        type="button"
                        key={`pagination-${number}`}
                        aria-label={`Go to Page ${number} `}
                        onClick={() => this.handleClickPage(number)}>{number}</button>
                )
        }
        return (
            <div className="pagination is-left" role="navigation" aria-label="pagination">
                <button className="pagination-previous button"
                    type="button"
                    onClick={this.handlePreviousPage}
                    disabled={(this.state.actualPage > 1) ? undefined : true}>Anterior
                </button>
                <button className="pagination-next button"
                    type="button"
                    onClick={this.handleNextPage}
                    disabled={(this.state.actualPage < number) ? undefined : true}>Siguiente
                </button>
                <ul className="pagination-list">
                    {
                        numbers
                    }
                </ul>
            </div>
        )
    }

}

export default Pagination;