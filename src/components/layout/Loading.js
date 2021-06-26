import React, {} from 'react'
import {LIGTH_COLOR} from 'configuration/manager'

class Module extends React.Component {

    render() {

        return (
            <div
                className={`pageloader  is-${LIGTH_COLOR} has-background-${LIGTH_COLOR}  ${(this.props.loaded) ? `is-active ` : ''}`}>
                <span className="title has-text-black ">Cargando</span>
            </div>
        )
    }

}

export default (Module)