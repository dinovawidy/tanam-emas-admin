import OperationalHourRepository from "../../../../../../../repositories/OperationalHourRepository";
import DateUtility from "../../../../../../../utils/date-utility";
//import OperationalItemModel from "../model/OperationalItemModel";
import OperationalItemModel from "../model/OperationalItemModel";
import PopupUtility from "../../../../../../../utils/popup-utility";
import {
  setList,
  setLoadingData,
  setDataSunday,
  setDataMonday,
  setDataTuesday,
  setDataWednesday,
  setDataThursday,
  setDataFriday,
  setDataSaturday,
  setInitialData,
  setEdit,
} from "./Reducer";

const getOperationalHours = async (dispatch) => {
  dispatch(setLoadingData(true));

  let response = await OperationalHourRepository.getOperationalHours();

  if (!response.error) {
    let data = response.data;
    dispatch(setInitialData(data));
    dispatch(setDataMonday(data[0]));
    dispatch(setDataTuesday(data[1]));
    dispatch(setDataWednesday(data[2]));
    dispatch(setDataThursday(data[3]));
    dispatch(setDataFriday(data[4]));
    dispatch(setDataSaturday(data[5]));
    dispatch(setDataSunday(data[6]));
  }

  dispatch(setLoadingData(false));
};

const updateOperationalHour = async (
  dispatch,
  { monday, tuesday, wednesday, thursday, friday, saturday, sunday }
) => {
  let array = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];

  let response;

  for (let i = 0; i < array.length; i++) {
    let data = {};
    if (array[i].id !== "") {
      data.id = array[i].id;
      data.dayOfWeek = array[i].dayOfWeek;
      data.startTime = DateUtility.timeDate(array[i].startTime, false);
      data.endTime = DateUtility.timeDate(array[i].endTime);
      data.status = array[i].status;
    } else {
      data.dayOfWeek = array[i].dayOfWeek;
      data.startTime = "09:00:00";
      data.endTime = "17:00:00";
      data.status = array[i].status;
    }

    response = await OperationalHourRepository.updateOperationalHour(data);
  }

  if (!response.error) {
    PopupUtility.success("Saved Successfully");
  } else {
    PopupUtility.responseValidate(response.message);
  }
  getOperationalHours(dispatch);
  dispatch(setEdit(false));
};

const Action = {
  getOperationalHours,
  updateOperationalHour,
};

export default Action;
