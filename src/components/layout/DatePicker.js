import DatePicker from "react-datepicker";


function DatePickerLayout(
    {
        selectedDate = new Date(),
        setSelectedDate = (date) => {
            console.log(date)
        },
        disabled = false
    }
) {
    return (
        <DatePicker
            locale="es"
            className="input"
            dateFormat="P"
            disabled={disabled}
            selected={selectedDate}
            onChange={setSelectedDate}
        />
    )
}

export default DatePickerLayout