import { useState } from "react"

function SearchModule() {

    const [val, setVal] = useState('')

    const handleWrite = (val) => {
        setVal(val)
    }   

    return (
        <div className="control has-icons-left pl-0  ml-0 has-text-grey">
            <span className="icon is-right has-text-grey is-small  pr-0 ">
                <i className="fas fa-search"></i>
            </span>
            <input
                className={`input pl-5 has-text-grey`}
                value={val} type="search" placeholder="Buscar"
                onChange={(event) => handleWrite(event.target.value)} />
        </div>
    )
}

export default SearchModule