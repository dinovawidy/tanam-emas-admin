import moment from "moment";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTH_NUMBER = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

const formatDate = (date, type) => {
  if (date) {
    const event = new Date(date);
    const day = event.getDate();
    const month = MONTH_NAMES[event.getMonth()];
    const year = event.getFullYear();
    const hour = event.getHours();
    const minute = event.getMinutes();
    if (type === "full") {
      return (
        day +
        " " +
        month +
        " " +
        year +
        ", " +
        (hour < 10 ? "0" : "") +
        hour +
        ":" +
        (minute < 10 ? "0" : "") +
        minute +
        " WIB"
      );
    } else if (type === "half") {
      return month + " " + day + ", " + year;
    } else if (type === "short") {
      return day + " " + month;
    }
  }
};

const timeDate = (date, wib) => {
  if (date) {
    const event = new Date(date);
    const hour = event.getHours();
    const minute = event.getMinutes();
    if (wib) {
      return (
        (hour < 10 ? "0" : "") +
        hour +
        ":" +
        (minute < 10 ? "0" : "") +
        minute +
        " WIB"
      );
    } else {
      return (
        (hour < 10 ? "0" : "") + hour + ":" + (minute < 10 ? "0" : "") + minute
      );
    }
  }
};

const changeFormat = (date, value) => {
  if (date) {
    const now = new Date(date);
    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - value);
  }
};

const dateFormatApi = (value) => {
  const date = new Date(value);
  let newDate =
    date.getFullYear() +
    "-" +
    MONTH_NUMBER[date.getMonth()] +
    "-" +
    (date.getDate() < 10 ? "0" : "") +
    date.getDate();
  return newDate;
};

const dateFormatISO = (value) => {
  if (value) {
    const date = new Date(value);
    let newDate = date.toISOString();
    return newDate;
  }
};

const operationalHour = (value) => {
  const date = new Date("1999-08-02 " + value);
  let newDate = date.toISOString();
  return newDate;
};

const dropdownDashboard = async (value) => {
  const now = new Date();
  if (value === 0) {
    const thisPeriod = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7
    );
    const lastPeriodStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 15
    );
    const lastPeriodEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 8
    );
    return {
      thisPeriod: {
        startDate: dateFormatApi(thisPeriod),
        endDate: dateFormatApi(now),
      },
      lastPeriod: {
        startDate: dateFormatApi(lastPeriodStart),
        endDate: dateFormatApi(lastPeriodEnd),
      },
    };
  } else if (value === 1) {
    const thisPeriod = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 30
    );
    const lastPeriodStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 61
    );
    const lastPeriodEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 31
    );
    return {
      thisPeriod: {
        startDate: dateFormatApi(thisPeriod),
        endDate: dateFormatApi(now),
      },
      lastPeriod: {
        startDate: dateFormatApi(lastPeriodStart),
        endDate: dateFormatApi(lastPeriodEnd),
      },
    };
  } else if (value === 2) {
    const thisPeriod = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 365
    );
    const lastPeriodStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 731
    );
    const lastPeriodEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 366
    );
    return {
      thisPeriod: {
        startDate: dateFormatApi(thisPeriod),
        endDate: dateFormatApi(now),
      },
      lastPeriod: {
        startDate: dateFormatApi(lastPeriodStart),
        endDate: dateFormatApi(lastPeriodEnd),
      },
    };
  }
};

const timeAgo = (value) => {
  if (value) {
    return moment(value).fromNow();
  }
};

const DateUtility = {
  timeDate,
  changeFormat,
  formatDate,
  dateFormatApi,
  dateFormatISO,
  operationalHour,
  dropdownDashboard,
  timeAgo,
};

export default DateUtility;
