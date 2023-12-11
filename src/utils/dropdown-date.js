import moment from "moment";
import "moment-timezone";

const dropdownDate = () => {
  const end = moment().format("YYYY-MM-DD");
  const start7 = moment().subtract(7, "d").format("YYYY-MM-DD");
  const start30 = moment().subtract(30, "d").format("YYYY-MM-DD");
  const start365 = moment().subtract(365, "d").format("YYYY-MM-DD");
  const lastWeek = moment().subtract(14, "d").format("YYYY-MM-DD");
  const lastMonth = moment().subtract(60, "d").format("YYYY-MM-DD");
  const lastYears = moment().subtract(730, "d").format("YYYY-MM-DD");

  return [
    {
      name: "Week",
      value: {
        start_date: start7,
        end_date: end,
        last_period_start: lastWeek,
        last_period_end: start7,
      },
    },
    {
      name: "Month",
      value: {
        start_date: start30,
        end_date: end,
        last_period_start: lastMonth,
        last_period_end: start30,
      },
    },
    // {
    //   name: "Years",
    //   value: {
    //     start_date: start365,
    //     end_date: end,
    //     last_period_start: lastYears,
    //     last_period_end: start365,
    //   },
    // },
    // {
    //   name: "Last Week",
    //   value: {
    //     start_date: lastWeek,
    //     end_date: start7,
    //   },
    // },
  ];
};

export default dropdownDate;
