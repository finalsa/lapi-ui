import { useState } from "react"

function Notification({
    text = "Para agregar dale click en el botón +",
    
}) {
    const[isActive, setIsActive] = useState(true)
    if(!isActive){
        return(
            <>
            </>
        )
    }
    return (
        <div className="notification is-link">
            <button className="delete" onClick={() => {setIsActive(false)}}></button>
            {
                text
            }
        </div>
    )
}

export default Notification