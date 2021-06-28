import React, { } from 'react';

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.min = this.props.min ? this.props.min : 0
        this.max = this.props.max ? this.props.max : 10000000
        let count = this.props.count ? this.props.count : this.min
        this.state = { count: count, };
        this.handleLess = this.handleLess.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleManualWrite = this.handleManualWrite.bind(this);
    }

    componentDidUpdate() {
        if (this.props.count && this.state.count !== this.props.count) {
            this.setState({
                count: this.props.count
            })
        }
    }

    handleManualWrite(event) {
        let val = event.target.value
        const reg = /[0-9]?[0-9]?(\.[0-9][0-9]?)?/
        if (reg.test(val)) {
            val = parseFloat(val)
            if (val >= this.min && val < this.max) {
                if (this.props.onChange) {
                    this.props.onChange(val)
                }
                this.setState({ count: val })
            }
        }

    }

    handleLess() {
        let val = this.state.count - 1
        if (val >= this.min) {
            if (this.props.onChange) {
                this.props.onChange(val)
            }
            this.setState({ count: val })
        } else {
            this.setState({ count: this.min })
        }
    }

    handlePlus() {
        let val = this.state.count + 1
        if (val <= this.max) {
            if (this.props.onChange) {
                this.props.onChange(val)
            }
            this.setState({ count: val })
        }
    }

    render() {
        return (
            <div className="field has-addons has-addons-right">
                <p className="control has-icons-left has-icons-right">
                    <input className="input counter-input" 
                    
                    style={{width: "150px"}}
                    type="number" placeholder="numero" value={this.state.count} onChange={this.handleManualWrite} />

                    <span className="icon is-small is-left" onClick={this.handleLess}>
                        <input type='button' value="-" className={`counter-button button is-ghost`} />
                    </span>
                    <span className="icon is-small is-right" onClick={this.handlePlus}>
                        <input type='button' value="+" className={`counter-button button is-ghost`} />
                    </span>
                </p>
            </div>
        )
    }
}

export default Counter;