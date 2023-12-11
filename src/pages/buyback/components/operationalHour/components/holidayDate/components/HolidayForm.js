import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../../../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../../../components/ButtonWhite/ButtonWhite";
import DatePickerComponent from "../../../../../../../components/DatePickerComponent/DatePickerComponent";
import Action from "../redux/Action";
import { setUpdateHoliday, setEndDate, setEventName, setStartDate } from "../redux/Reducer";
import DateUtility from "../../../../../../../utils/date-utility";
import { useState } from "react";

const HolidayForm = () => {
  const t = useTranslation();
  const dispatch = useDispatch();
  var event = useSelector((state) => state.reducer.updateHoliday);
  var startDate = new Date(event.startDate);
  var endDate = new Date(event.endDate);
  // var startDate = useSelector((state) => state.reducer.startDate)
  // var endDate = useSelector((state) => state.reducer.endDate)
  var eventName = useSelector((state) => state.reducer.eventName);
  var status = useSelector((state) => state.reducer.status);
  // const { eventName } = event;

  // const [eventName, setEventName] = useState('')
  console.log(eventName);
  console.log(startDate);
  console.log(endDate);

 

  return (
    <div className="grid grid-rows-3 gap-y-3">
      <div className="flex items-center">
        <div className="basis-1/12 mr-5 font-semibold text-md">
          {t("holidaydate.event")}
        </div>
        <input
          // inputValue={eventName}
          // value={eventName}
          name="eventName"
          type="text"
          placeholder={t("holidaydate.event_placeholder")}
          className="basis-11/12 block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white placeholder:text-slate-40 "
          onChange={(e) => {
            var data = e.target.value;
            eventName = data
            dispatch(setEventName(data))
          }}

        />
      </div>
      <div className="flex">
        <div className="flex basis-1/2 items-center">
          <div className="basis-1/6 mr-5 font-semibold text-md">
            {t("holidaydate.start_date")}
          </div>
          <DatePickerComponent
            value={startDate}
            format="MMM, DD, YYYY"
            onChange={(dateObject) => {
              var data = {...event};
              let startDate = new Date(dateObject);
              data.startDate = DateUtility.dateFormatApi(startDate);
              dispatch(setUpdateHoliday(data));
            }}
            placeholder={t("holidaydate.select_date_placeholder")}
            inputClass="block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white placeholder:text-slate-40 cursor-pointer"
          />
        </div>
        <div className="flex basis-1/2 items-center">
          <div className="basis-1/6 mr-5 font-semibold text-md">
            {t("holidaydate.end_date")}
          </div>
          <DatePickerComponent
            value={endDate}
            format="MMM, DD, YYYY"
            onChange={(dateObject) => {
              var data = {...event};
              let endDate = new Date(dateObject);
              data.endDate = DateUtility.dateFormatApi(endDate);
              dispatch(setUpdateHoliday(data));
            }}
            placeholder={t("holidaydate.select_date_placeholder")}
            inputClass="block sm:text-sm shadow-sm border border-gray-primary rounded-xl bg-white placeholder:text-slate-40 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex justify-end gap-x-3">
        <ButtonWhite
          title={t("general.cancel")}
          onClick={() => {
            Action.changeShowForm(dispatch, { showForm: false });
          }}
        />
        <ButtonGreen
          title={t("general.save")}
          onClick={() => {
            Action.saveForm(dispatch, {
              eventName: eventName,
              startDate: startDate,
              endDate: endDate,
              status: 1,
            });
          }}
        />
      </div>
    </div>
  );
};

export default HolidayForm;
