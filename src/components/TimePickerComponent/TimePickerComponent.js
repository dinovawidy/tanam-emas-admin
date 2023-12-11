import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const TimePickerComponent = ({
  disabled,
  value,
  format,
  placeholder,
  onChange,
  inputClass,
}) => {
  return (
    <DatePicker
      disabled={disabled}
      value={value}
      disableDayPicker
      format={format}
      placeholder={placeholder}
      onChange={(dateObject) => {
        onChange(dateObject);
      }}
      plugins={[<TimePicker hideSeconds className="time-picker-fix" />]}
      inputClass={inputClass}
    />
  );
};

export default TimePickerComponent;
