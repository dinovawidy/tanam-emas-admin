import { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import UploadImage from "../../../../../components/UploadImage/UploadImage";
import Action from "../redux/Action";

const PopupAddItem = ({ onCancel, addList }) => {
  const t = useTranslation();
  const [form, setForm] = useState({ productPhoto1: "", productPhoto2: "" });
  const [error, setError] = useState({});
  const [weight, setWeight] = useState([]);

  useEffect(() => {
    Action.getWeight(setWeight);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => {
            onCancel(false);
            setForm({ productPhoto1: "", productPhoto2: "" });
          }}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-xl p-4 mx-auto bg-gray-tertiary rounded-xl shadow-lg">
            <div className="m-3 text-left">
              <h3 className="text-green-primary font-bold">
                {t("generateqr.new_qr")}
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-y-5">
                {/* product_photo */}
                <div>
                  <label className="font-bold">
                    {t("generateqr.product_photo")}
                  </label>
                  <div className="text-sm">
                    <p>{t("accountsettings.support_files")}</p>
                    <p>{t("accountsettings.max_size")}</p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-row gap-x-2">
                    <UploadImage
                      img={form.productPhoto1}
                      aspectRatio={1 / 1}
                      name={"productPhoto1"}
                      width={32}
                      height={32}
                      position={"col"}
                      onClick={(photo, name) =>
                        setForm({
                          ...form,
                          productPhoto1: photo,
                          namePhoto1: name,
                        })
                      }
                      onDelete={() =>
                        setForm({
                          ...form,
                          productPhoto1: "",
                          namePhoto1: "",
                        })
                      }
                    />
                    <UploadImage
                      img={form.productPhoto2}
                      aspectRatio={1 / 1}
                      name={"productPhoto2"}
                      width={32}
                      height={32}
                      position={"col"}
                      onClick={(photo, name) =>
                        setForm({
                          ...form,
                          productPhoto2: photo,
                          namePhoto2: name,
                        })
                      }
                      onDelete={() =>
                        setForm({
                          ...form,
                          productPhoto2: "",
                          namePhoto2: "",
                        })
                      }
                    />
                  </div>
                  <p className="text-red-500 p-1">{error.productPhoto}</p>
                </div>

                {/* serialNumber */}
                <label className="font-bold">
                  {t("generateqr.serial_number")}
                </label>
                <div>
                  <div className="flex flex-row gap-x-3 items-center">
                    <input
                      type="text"
                      name="serialNumber"
                      onChange={(e) => {
                        Action.handleChange(e, form, setForm);
                      }}
                      placeholder={t("generateqr.sni_code")}
                      className="rounded-xl w-20 text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium border-0"
                    />
                    <div>-</div>
                    <div className="font-semibold">XXXXX</div>
                  </div>
                  <p className="text-red-500 p-1">{error.serialNumber}</p>
                </div>

                {/* brandName */}
                <label className="font-bold">
                  {t("generateqr.brand_name")}
                </label>
                <div>
                  <input
                    type="text"
                    name="brandName"
                    onChange={(e) => {
                      Action.handleChange(e, form, setForm);
                    }}
                    placeholder={t("generateqr.input_brand")}
                    className="rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium border-0"
                  />
                  <p className="text-red-500 p-1">{error.brandName}</p>
                </div>

                {/* edition */}
                <label className="font-bold">{t("generateqr.edition")}</label>
                <div>
                  <input
                    type="text"
                    name="edition"
                    onChange={(e) => {
                      Action.handleChange(e, form, setForm);
                    }}
                    placeholder={t("generateqr.input_edition")}
                    className="rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium border-0"
                  />
                </div>

                {/* weight */}
                <label className="font-bold">{t("generateqr.weight")}</label>
                <div>
                  <select
                    className="text-sm border rounded-xl w-full bg-white font-medium border-gray-primary"
                    name="gramId"
                    defaultValue="default"
                    onChange={(e) => {
                      Action.handleChange(e, form, setForm);
                    }}
                  >
                    <option value="default" disabled>
                      {t("generateqr.select_weight")}
                    </option>
                    {weight.map((item, index) => (
                      <option value={item.id + " " + item.name} key={index}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-500 p-1">{error.gramId}</p>
                </div>

                {/* quantity */}
                <label className="font-bold">{t("generateqr.quantity")}</label>
                <div>
                  <input
                    type="number"
                    name="quantity"
                    min={0}
                    onChange={(e) => {
                      Action.handleChange(e, form, setForm);
                    }}
                    placeholder={t("generateqr.input_quantity")}
                    className="rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium border-0"
                  />
                  <p className="text-red-500 p-1">{error.quantity}</p>
                </div>

                {/* fineness */}
                <label className="font-bold">{t("generateqr.fineness")}</label>
                <div className="font-bold pl-3">999.9</div>
              </div>
              <div className="items-center gap-2 mt-10 flex justify-end">
                <ButtonWhite
                  title={t("general.cancel")}
                  onClick={() => {
                    onCancel(false);
                    setForm({ productPhoto1: "", productPhoto2: "" });
                  }}
                />
                <ButtonGreen
                  title={t("generateqr.queue_qr")}
                  onClick={() => {
                    Action.onSubmit(form, setForm, setError, onCancel, addList);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupAddItem;
