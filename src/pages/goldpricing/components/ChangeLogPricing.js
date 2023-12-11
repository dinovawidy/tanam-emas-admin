import Skeleton from "react-loading-skeleton";
import { useTranslation } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination/Pagination";
import GeneralUtility from "../../../utils/general-utility";
import Action from "../redux/Action";

const ChangeLogPricing = () => {
  const t = useTranslation();
  const dispatch = useDispatch();

  const loadingChangeLog = useSelector(
    (state) => state.reducer.loadingChangeLog
  );
  const changeLogList = useSelector((state) => state.reducer.changeLogList);
  const currentPage = useSelector((state) => state.reducer.currentPage);
  const totalPage = useSelector((state) => state.reducer.totalPage);
  const totalData = useSelector((state) => state.reducer.totalData);
  const startDate = useSelector((state) => state.reducer.startDate);
  const endDate = useSelector((state) => state.reducer.endDate);
  return (
    <div className="section-grey p-2">
      <h2 className="text-sm p-2 font-medium text-[#A7ADA9]">
        {t("goldpricing.change_log").toUpperCase()}
      </h2>
      {loadingChangeLog ? (
        <Skeleton count={6} height="40px" />
      ) : (
        <>
          <table className="flex-auto w-full table-auto border-separate border-spacing-y-1">
            <thead>
              <tr>
                <th className="text-left p-2">
                  {t("goldpricing.date_and_time")}
                </th>
                <th className="text-left p-2">
                  {t("goldpricing.buyback_price")}
                </th>
                <th className="text-left p-2">{t("management.admin")}</th>
              </tr>
            </thead>
            <tbody>
              {changeLogList.map((item, index) => (
                <tr className="bg-white" key={index}>
                  <td className="p-2">{item.dateTime}</td>
                  <td className="p-2">
                    Rp {GeneralUtility.addSeparator(item.buybackPrice)}
                  </td>
                  <td className="p-2">{item.admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <Pagination
        currentPage={currentPage}
        postsPerPage={5}
        totalPage={totalPage}
        totalPosts={totalData}
        onClick={(page) => {
          Action.getChangeLog(dispatch, {
            page: page,
            startDate: startDate,
            endDate: endDate,
          });
        }}
      />
    </div>
  );
};

export default ChangeLogPricing;
