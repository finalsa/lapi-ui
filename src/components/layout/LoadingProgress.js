import React, {} from 'react'


function Module({
                    value = -1,
                    style = {}
                }) {

    return (
        <>
            <progress className="progress is-link" max="100"
                      style={style}
                      value={value}
            />
        </>
    )


}

export default (Module)