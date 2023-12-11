import DatePicker from "react-multi-date-picker";

const DateRangePicker = ({ startDateValue, endDateValue, onOpen, onChange, onClose, format, placeholder, inputClass }) => {
  return (
    <DatePicker
      range
      value={[startDateValue, endDateValue]}
      onOpen={() => {
        onOpen();
      }}
      onChange={dateObject => {
        onChange(dateObject);
      }}
      onClose={() => {
        onClose();
      }}
      format={format}
      placeholder={placeholder}
      inputClass={inputClass}
    />
  );
};

export default DateRangePicker;
