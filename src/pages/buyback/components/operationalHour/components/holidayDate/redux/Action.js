import OperationalHourRepository from "../../../../../../../repositories/OperationalHourRepository";
import PopupUtility from "../../../../../../../utils/popup-utility";
import EventModel from "../model/EventModel";
import {
  setEventsFirst,
  setEventsSecond,
  setLoadingData,
  setMonth,
  setShowForm,
  setYear,
  setUpdateHoliday,
} from "./Reducer";

const getHolidateData = async (dispatch, { month, year }) => {
  dispatch(setLoadingData(true));
  dispatch(setEventsFirst([]));
  dispatch(setEventsSecond([]));
  let response = await OperationalHourRepository.getHolidateDates(month, year);
  let data = response.data;
  console.log("dataku", data);
  var data1 = [];
  var data2 = [];
  if (!response.error) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      var dat = EventModel({
        id: element.id,
        eventName: element.event,
        startDate: element.start_date,
        endDate: element.end_date,
      });
      var startDate = new Date(dat.startDate);
      var endDate = new Date(dat.endDate);
      var startDateMonth = startDate.getMonth();
      var startDateYear = startDate.getFullYear();
      var endDateMonth = endDate.getMonth();
      var endDateYear = endDate.getFullYear();
      if (
        month >= startDateMonth &&
        month <= endDateMonth &&
        year >= startDateYear &&
        year <= endDateYear
      ) {
        data1.push(dat);
      }
      if (month === 11) {
        if (
          0 >= startDateMonth &&
          0 <= endDateMonth &&
          year + 1 >= startDateYear &&
          year + 1 <= endDateYear
        ) {
          data2.push(dat);
        }
      } else {
        if (
          month + 1 >= startDateMonth &&
          month + 1 <= endDateMonth &&
          year >= startDateYear &&
          year <= endDateYear
        ) {
          data2.push(dat);
        }
      }
    }
    dispatch(setEventsFirst(data1));
    dispatch(setEventsSecond(data2));
    dispatch(setLoadingData(false));
    // dispatch(setEventsFirst(data));
    // dispatch(setUpdateHoliday(data));
  } else {
    dispatch(setEventsFirst([]));
    dispatch(setEventsSecond([]));
    dispatch(setLoadingData(false));
  }
  // dispatch(setUpdateHoliday(data));
  // var data1 = [];
  // var data2 = [];
  // for (let i = 0; i < data.length; i++) {
  //   const element = data[i];
  //   var dat = EventModel({ eventName: element.event, startDate: element.start_date, endDate: element.end_date });
  //   var startDate = new Date(dat.startDate);
  //   var endDate = new Date(dat.endDate);
  //   var startDateMonth = startDate.getMonth();
  //   var startDateYear = startDate.getFullYear();
  //   var endDateMonth = endDate.getMonth();
  //   var endDateYear = endDate.getFullYear();
  //   if (month >= startDateMonth && month <= endDateMonth && year >= startDateYear && year <= endDateYear) {
  //     data1.push(dat);
  //   }
  //   if(month === 11){
  //     if (0 >= startDateMonth && 0 <= endDateMonth && year+1 >= startDateYear && year+1 <= endDateYear) {
  //       data2.push(dat);
  //     }
  //   } else {
  //     if (month + 1 >= startDateMonth && month + 1 <= endDateMonth && year >= startDateYear && year <= endDateYear) {
  //       data2.push(dat);
  //     }
  //   }
  // }
  // dispatch(setEventsFirst(data1));
  // dispatch(setEventsSecond(data2));
  // dispatch(setUpdateHoliday(data))
  dispatch(setLoadingData(false));
};

const saveForm = async (dispatch, { eventName, startDate, endDate, status }) => {
  //save data
  // let data = { ...event };
  let data = {
    event: eventName,
    startDate: startDate,
    endDate: endDate,
    status: status,
  }
  let response;
  // data.status = 1;
  response = await OperationalHourRepository.updateHolidayDate(data);
  if(!response.error) {
    PopupUtility.success(response.message)
  } else {
    PopupUtility.responseValidate(response.message)
  }
  // if(response.id) {
  //   let data = {
  //     id: response.id,
  //     event: eventName,
  //     startDate: startDate,
  //     endDate: endDate,
  //     status: status,
  //   }
  //   response = await OperationalHourRepository.updateHolidayDate(data);

  // } else {
  // }


  // if (response.id) {
  // } else {
  //   data.status = 1;
  //   response = await OperationalHourRepository.updateHolidayDate(data);
  // }
  //fetch data again
  dispatch(setShowForm(false));
};

const changeShowForm = async (dispatch, { showForm }) => {
  dispatch(setShowForm(showForm));
};

const changeMonth = async (dispatch, { month }) => {
  dispatch(setMonth(month));
};

const changeYear = async (dispatch, { year }) => {
  dispatch(setYear(year));
};

const Action = {
  getHolidateData,
  saveForm,
  changeShowForm,
  changeMonth,
  changeYear,
};

export default Action;
