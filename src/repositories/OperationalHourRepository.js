import CallApi from "../services/request-helper";
import Endpoint from "../services/endpoint";
import OperationalItemModel from "../pages/buyback/components/operationalHour/components/operationalMain/model/OperationalItemModel";
import DateUtility from "../utils/date-utility";

const BASE_API = process.env.REACT_APP_BASE_API;

async function sleep(msec = 1000) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

const getOperationalHours = async () => {
  const url = BASE_API + Endpoint.operationalHour;
  const response = await CallApi({ url, method: "POST" });
  const data = typeof response != "undefined" ? response.data : null;
  const data2 = typeof data != "undefined" && data != null ? data.data : [];

  let array = [];
  for (let i = 0; i < 7; i++) {
    const element = data2[i];
    let item;
    if (element && element.dayOfWeek === i + 1) {
      item = new OperationalItemModel({
        id: element.id,
        dayOfWeek: element.dayOfWeek,
        startTime: DateUtility.operationalHour(element.startTime),
        endTime: DateUtility.operationalHour(element.endTime),
        status: element.status,
      });
    } else {
      item = new OperationalItemModel({
        id: "",
        dayOfWeek: i + 1,
        startTime: "",
        endTime: "",
        status: false,
      });
    }
    array.push(item);
  }

  let operasional = {};
  operasional.error = response.error;
  operasional.message = response.message;
  operasional.data = array;

  return operasional;
};

const updateOperationalHour = async (data) => {
  const url = BASE_API + Endpoint.operationalHourEdit;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const getLiburNasional = async (year) => {
  const url = "https://api-harilibur.vercel.app/api?year=" + year;
  try {
    var data = [];
    await fetch(url)
      .then((res) => res.json())
      .then((json) => {
        data = json;
      });
    return data;
  } catch (err) {
    return [];
  }
};

const getHolidateDates = async (month, year) => {
  const url = BASE_API + Endpoint.holidayDate;
  const response = await CallApi({ url, method: "POST" });
  const datas = typeof response != "undefined" ? response.data : null;
  const datas2 = typeof datas != "undefined" && datas != null ? datas.data : [];

  const liburNasional = await getLiburNasional(year)
  console.log("liburnas", liburNasional)
  var data = []

  for(let i = 0; i < liburNasional.length; i++) {
    const element = liburNasional[i];
    if(element.is_national_holiday){
      const date = new Date(element.holiday_date).toISOString();
      data.push({event:element.holiday_name, start_date: date, end_date: date})
    }
  }

  if(month === 11) {
    const liburNasionalNanti = await getLiburNasional(year+1)
    for(let i = 0; i < liburNasionalNanti.length; i++) {
      const element = liburNasionalNanti[i];
      if(element.is_national_holiday) {
        const date = new Date(element.holiday_date).toISOString();
        data.push({event: element.holiday_name, start_date: date, end_date: date})
      }
    }

  }

  for(let i = 0; i < datas2.length; i++) {
    const element = datas2[i];
    const startDate = new Date(element.startDate).toISOString();
    const endDate = new Date(element.endDate).toISOString();
    data.push({event: element.event, start_date: startDate, end_date: endDate})

  }

  // data = data.concat(datas2)

  console.log("repo", data)

  // let holiday = {};
  // holiday.error = response.error;
  // holiday.message = response.message;
  // holiday.data = datas;
  return {
    data : data
  };
};

const updateHolidayDate = async (data) => {
  const url = BASE_API + Endpoint.holidayDateEdit;
  const response = await CallApi({ url, method: "POST", data });
  return response;
};

const OperationalHourRepository = {
  getOperationalHours,
  updateOperationalHour,
  getHolidateDates,
  updateHolidayDate,
  getLiburNasional,
};

export default OperationalHourRepository;
