import React, {} from 'react';

class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.min = this.props.min ? this.props.min : 0
        this.max = this.props.max ? this.props.max : 100
        let count = this.props.count ? this.props.count : 1
        this.state = {count: count,};
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
        console.log(val)
        if (val >= this.min && val < this.max) {
            if (this.props.onChange) {
                this.props.onChange(val)
            }
            this.setState({count: val})
        }
    }

    handleLess() {
        let val = this.state.count - 1
        if (val >= this.min) {
            if (this.props.onChange) {
                this.props.onChange(val)
            }
            this.setState({count: val})
        } else {
            this.setState({count: this.min})
        }
    }

    handlePlus() {
        let val = this.state.count + 1
        if (val <= this.max) {
            if (this.props.onChange) {
                this.props.onChange(val)
            }
            this.setState({count: val})
        }
    }

    render() {
        return (
            <div className={`level `}>
                <div className="level-left">
                    <input type='button' value="-" className={`counter-button button`} onClick={this.handleLess}/>
                </div>
                <input type='text' className={`counter-input input has-text-right	`} value={this.state.count}
                       onChange={this.handleManualWrite}/>
                <div className="level-right">
                    <input type='button' value="+" className={`counter-button button`} onClick={this.handlePlus}/>
                </div>
            </div>
        )
    }
}

export default Counter;