import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import TimePickerComponent from "../../../../../../../components/TimePickerComponent/TimePickerComponent";

const OperationalItem = ({ day, item, setData }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.reducer.list);

  return (
    <tr>
      <td className="py-2 pl-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            value={item.status}
            checked={item.status}
            onChange={() => {
              var dat = { ...item };
              dat.status = !dat.status;
              dispatch(setData(dat));
            }}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-secondary"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {day}
          </span>
        </label>
      </td>
      <td className="text-center">
        <TimePickerComponent
          disabled={!item.status}
          value={item.startTime}
          format="HH:mm"
          placeholder={t("operationalhour.select_hour_placeholder")}
          onChange={(dateObject) => {
            var time = dateObject;
            var dat = { ...item };
            dat.startTime = new Date(time).toISOString();
            dispatch(setData(dat));
          }}
          inputClass={`${
            !item.status ? "bg-gray-disable" : "bg-white"
          } block sm:text-sm shadow-sm border border-gray-primary rounded-xl placeholder:text-slate-40 cursor-pointer`}
        />
      </td>
      <td className="text-center">
        <TimePickerComponent
          disabled={!item.status}
          value={item.endTime}
          format="HH:mm"
          placeholder={t("operationalhour.select_hour_placeholder")}
          onChange={(dateObject) => {
            var time = dateObject;
            var dat = { ...item };
            dat.endTime = new Date(time).toISOString();
            dispatch(setData(dat));
          }}
          inputClass={`${
            !item.status ? "bg-gray-disable" : "bg-white"
          } block sm:text-sm shadow-sm border border-gray-primary rounded-xl placeholder:text-slate-40 cursor-pointer`}
        />
      </td>
    </tr>
  );
};

export default OperationalItem;
