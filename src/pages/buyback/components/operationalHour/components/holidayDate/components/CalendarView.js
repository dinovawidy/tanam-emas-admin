import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../../../components/ButtonGreen/ButtonGreen";
import Action from "../redux/Action";
import CalendarDate from "./CalendarDate";

const CalendarView = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const loadingData = useSelector((state) => state.reducer.loadingData);
  const month = useSelector((state) => state.reducer.month);
  const year = useSelector((state) => state.reducer.year);
  const eventsFirst = useSelector((state) => state.reducer.eventsFirst);
  const eventsSecond = useSelector((state) => state.reducer.eventsSecond);
  const dataHoliday = useSelector((state) => state.reducer.updateHoliday);
  console.log("event", eventsFirst)

  useEffect(() => {
    let currentDate = new Date();
    Action.changeMonth(dispatch, { month: currentDate.getMonth() });
    Action.changeYear(dispatch, { year: currentDate.getFullYear() });
    Action.getHolidateData(dispatch, {
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
    });
  }, []);

  const getMonthName = (month, year) => {
    return new Date(year, month, 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };
  const formatEvent = (item) => {
    var startDate = new Date(item.startDate).toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });
    var endDate = new Date(item.endDate).toLocaleString("default", {
      month: "short",
      day: "2-digit",
    });
    if (startDate === endDate) {
      return item.eventName + " (" + endDate + ")";
    }
    return item.eventName + " (" + startDate + " - " + endDate + ")";
  };
  const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };
  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <ButtonGreen
          title={t("holidaydate.set_holiday_date")}
          onClick={() => {
            Action.changeShowForm(dispatch, { showForm: true });
          }}
        />
      </div>
      <div className="flex justify-end">
        <div className="p-5 section-white">
          <div className="text-lg font-bold">{t("holidaydate.title")}</div>
          <div className="pt-5 mb-5 border-b" />
          {/* Month and Buttons */}
          <div className="relative flex mb-5 justify-around">
            <button
              className="absolute left-0"
              onClick={() => {
                const date = new Date(year, month - 1);
                Action.changeMonth(dispatch, { month: date.getMonth() });
                Action.changeYear(dispatch, { year: date.getFullYear() });
                Action.getHolidateData(dispatch, {
                  month: date.getMonth(),
                  year: date.getFullYear(),
                });
              }}
            >
              <img
                className="h-7 w-7 rotate-180"
                src={process.env.REACT_APP_ASSETS_IMAGE + "arrow-active.svg"}
                alt="arrow-active"
              />
            </button>
            <span className="text-lg font-bold">
              {getMonthName(month, year)}
            </span>
            <span className="text-lg font-bold">
              {getMonthName(month + 1, year)}
            </span>
            <button
              className="absolute right-0"
              onClick={() => {
                const date = new Date(year, month + 1);
                Action.changeMonth(dispatch, { month: date.getMonth() });
                Action.changeYear(dispatch, { year: date.getFullYear() });
                Action.getHolidateData(dispatch, {
                  month: date.getMonth(),
                  year: date.getFullYear(),
                });
              }}
            >
              <img
                className="h-7 w-7"
                src={process.env.REACT_APP_ASSETS_IMAGE + "arrow-active.svg"}
                alt="arrow-active"
              />
            </button>
          </div>
          {/* Date Table */}
          <div className="flex items-start gap-x-8">
            <CalendarDate
              daysInMonth={daysInMonth(month, year)}
              firstDayOfMonth={firstDayOfMonth(month, year)}
              month={month}
              year={year}
              events={eventsFirst}
            />
            <CalendarDate
              daysInMonth={daysInMonth(month + 1, year)}
              firstDayOfMonth={firstDayOfMonth(month + 1, year)}
              month={month + 1}
              year={year}
              events={eventsSecond}
            />
          </div>
          <div className="pt-5 mb-5 border-b" />
          <div className="grid grid-cols-2 gap-x-5">
            {loadingData ? (
              <>
                <Skeleton count={3} height="20px" />
                <Skeleton count={3} height="20px" />
              </>
            ) : (
              <>
                <div>
                  {eventsFirst.map((item, index) => (
                    <div key={index}>{formatEvent(item)}</div>
                  ))}
                </div>
                <div>
                  {eventsSecond.map((item, index) => (
                    <div key={index}>{formatEvent(item)}</div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
