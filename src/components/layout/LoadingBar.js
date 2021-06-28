import { LOGO } from 'configuration/manager'
import React, { } from 'react'

class Module extends React.Component {

    constructor(props) {
        super(props)
        this.time = (this.props.time) ? this.props.time : 15000
        this.state = {
            isReload: false,
            loaded: this.props.loaded
        }
        this.loadError = this.loadError.bind(this)
        this.reload = this.reload.bind(this)

    }

    interval = null

    componentDidMount() {
        this.interval = setInterval(this.loadError, this.time);
    }

    componentDidUpdate() {
        if (this.props.loaded !== this.state.loaded) {
            let callback = () => {
                if (this.props.loaded) {
                    clearInterval(this.interval);
                }
            }
            this.setState({
                loaded: this.props.loaded
            }, callback)
        }
    }

    loadError() {
        if (!this.props.loaded) {
            this.setState({
                isReload: true
            })
        }
        clearInterval(this.interval);
    }

    reload() {
        if (this.props.reload) {
            this.props.reload()
        }
        this.interval = setInterval(this.loadError, this.time);
        this.setState({
            isReload: false
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }



    render() {

        if (!this.state.loaded) {
            let isFull = true
            if (this.props.isSmall) {
                isFull = false
            }
            let content = (
                this.state.isReload ? (
                    <>
                        <div className={`barloader  is-vcentered ${this.props.className}`}>
                            <div className="container">
                                <div className="columns is-centered">
                                    <div className="column is-centered box  px-6 is-full">
                                        <div className="form">
                                            <div className="field">
                                                <div className="columns is-justify-content-center">
                                                    <div className="column is-3">
                                                        <figure className="image ">
                                                            <img src={LOGO}
                                                                alt='logo' />
                                                        </figure>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="field py-3"></div>
                                            <div className="field is-grouped is-grouped-centered">
                                                <p className="control">
                                                    <button
                                                        className="button"
                                                        type="button"
                                                        onClick={this.reload}
                                                    >
                                                        <span>
                                                            <i className="fas fa-sync"></i>
                                                        </span>
                                                        <span className="pl-3">
                                                            Reintentar

                                                        </span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                ) :
                    (
                        <div className="barloader  is-vcentered">
                            <div className="container">
                                <progress className="progress is-small is-link" max="100">%</progress>
                            </div>
                        </div>
                    )
            )
            return (
                <div className={` ${(isFull) ? 'hero is-fullheight' : ''} `}>
                    {
                        content
                    }
                </div>
            )
        } else {
            return (
                <>
                </>
            )
        }

    }

}

export default (Module)