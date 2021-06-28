import { useState } from "react";
import DatePicker from "react-datepicker";


function DatePickerLayout(
    {
        selectedDate = new Date(),
        setSelectedDate = null,
        disabled = false
    }
) {
    const [selected, setSelected] = useState(selectedDate)
    let onSetSelect = (date) => {
        setSelected(date)
        if (setSelectedDate) {
            setSelectedDate(date)
        }
    }
    if (!selected) {
        return (
            <div className="" onClick={() => { onSetSelect(new Date()) }}>
                Sin seleccion
            </div>
        )
    }
    return (
        <DatePicker
            locale="es"
            className="input"
            dateFormat="P"
            disabled={disabled}
            selected={selected}
            onChange={onSetSelect}
        />
    )
}

export default DatePickerLayout