import DatePicker from "react-multi-date-picker";

const DatePickerComponent = ({ value, onChange, format, placeholder, inputClass }) => {
  return (
    <DatePicker
      value={value}
      onChange={(dateObject) => {
        onChange(dateObject)
      }}
      format={format}
      placeholder={placeholder}
      inputClass={inputClass}
    />
  )
}

export default DatePickerComponent;