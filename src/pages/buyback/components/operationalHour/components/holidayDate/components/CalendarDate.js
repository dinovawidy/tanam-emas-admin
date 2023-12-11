const CalendarDate = ({
  firstDayOfMonth,
  daysInMonth,
  month,
  year,
  events = [],
}) => {
  const dates = [];
  for (let i = 0; i < daysInMonth + firstDayOfMonth; i++) {
    const date = i + 1 - firstDayOfMonth;
    var isHoliday = false;
    if (date > 0) {
      //check if date is holiday or not
      const dateTime = new Date(year, month, date);
      dateTime.setHours(6, 0, 0); //set to 6 so it is between midnight and midday
      for (let j = 0; j < events.length; j++) {
        var startDate = new Date(events[j].startDate);
        var endDate = new Date(events[j].endDate);
        startDate.setHours(0, 0, 0); //set to midnight
        endDate.setHours(12, 0, 0); //set to midday
        if (dateTime >= startDate && dateTime <= endDate) {
          isHoliday = true;
          break;
        }
      }
    }

    const dateObj = {
      date: date,
      isHoliday: isHoliday,
    };
    dates.push(dateObj);
  }

  const DateHeader = () => {
    return (
      <div className="grid grid-cols-7 gap-1 text-center col-span-7">
        <p className="p-1 text-green-quaternary text-lg font-semibold">Su</p>
        <p className="p-1 text-green-quaternary text-lg font-semibold">Mo</p>
        <p className="p-1 text-green-quaternary text-lg font-semibold">Tu</p>
        <p className="p-1 text-green-quaternary text-lg font-semibold">We</p>
        <p className="p-1 text-green-quaternary text-lg font-semibold">Th</p>
        <p className="p-1 text-green-quaternary text-lg font-semibold">Fr</p>
        <p className="p-1 text-green-quaternary text-lg font-semibold">Sa</p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-7 gap-y-1 text-center">
      <DateHeader />
      {dates.map((item, index) => (
        <p
          className={`${
            item.isHoliday && item.date > 0
              ? "bg-[#2B615240] text-[#749188]"
              : ""
          } p-1 text-lg font-semibold`}
          key={index}
        >
          {item.date < 1 ? " " : item.date}
        </p>
      ))}
    </div>
  );
};

export default CalendarDate;
