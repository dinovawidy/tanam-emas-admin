import { useEffect, useState } from "react";
import { useTranslation } from "react-multi-lang";
import ButtonWhite from "../../../../../components/ButtonWhite/ButtonWhite";
import UploadImage from "../../../../../components/UploadImage/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import Action from "../redux/Action";
import { setAddForm, setLoadingButton } from "../redux/Reducer";
import Select from "react-select";
import ButtonGreen from "../../../../../components/ButtonGreen/ButtonGreen";

const EditModal = ({ onCancel, onSubmit, dataError }) => {
  const t = useTranslation();
  const dispatch = useDispatch();
  // const [error, setError] = useState({ ...dataError });

  const detailMerchant = useSelector((state) => state.reducer.detailMerchant);
  const province = useSelector((state) => state.reducer.province);
  const city = useSelector((state) => state.reducer.city);
  const district = useSelector((state) => state.reducer.district);
  const codephone = useSelector((state) => state.reducer.codephone);
  const addForm = useSelector((state) => state.reducer.addForm);
  const addError = useSelector((state) => state.reducer.addError);
  const loadingButton = useSelector((state) => state.reducer.loadingButton);

  const [error, setError] = useState({ ...dataError });

  useEffect(() => {
    Action.getProvince(dispatch);
    Action.getCodePhone(dispatch);

  }, []);

  useEffect(() => {
    Action.validate(dispatch, addForm, detailMerchant);
  }, [addForm]);

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-tertiary rounded-xl shadow-lg">
            <div className="m-3 text-left">
              <h3 className="text-green-primary font-bold">
                {t("management.edit_merchant")}
              </h3>

              <div className="mt-5 grid grid-cols-2 gap-y-4">
                {/* merchantPhoto */}
                <label className="font-bold">
                  {t("management.merchant_photo")}
                </label>
                <UploadImage
                  img={
                    detailMerchant.merchantPhoto
                      ? detailMerchant.merchantPhoto
                      : ""
                  }
                  aspectRatio={1 / 1}
                  name={"photo"}
                  width={40}
                  height={40}
                  position={"col"}
                  onClick={(photo, name) => {
                    dispatch(
                      setAddForm({
                        ...addForm,
                        merchantPhoto: photo,
                        merchantPhotoname: name,
                      })
                    );
                  }}
                  onDelete={() => {
                    dispatch(
                      setAddForm({
                        ...addForm,
                        merchantPhoto: "",
                        merchantPhotoname: "",
                      })
                    );
                  }}
                />
                {/* merchantName */}
                <label className="font-bold">
                  {t("management.merchant_name")}
                </label>
                <div>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                      Action.handleChange(dispatch, e, addForm);
                    }}
                    placeholder={t("management.merchant_name")}
                    className={`rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                      addError.name ? "border-red-500 border-1" : "border-0"
                    }`}
                    defaultValue={detailMerchant.merchantName}
                  />
                  <p className="text-red-500">{addError.name}</p>
                </div>

                {/* email */}
                <label className="font-bold">{t("management.email")}</label>
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={(e) => {
                      Action.handleChange(dispatch, e, addForm);
                    }}
                    placeholder={t("management.input_email")}
                    className={`rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                      addError.email ? "border-red-500 border-1" : "border-0"
                    }`}
                    defaultValue={detailMerchant.email}
                  />
                  <p className="text-red-500">{addError.email}</p>
                </div>

                {/* phoneNumber */}
                <label className="font-bold">{t("management.phone_no")}</label>
                <div className="flex-1">
                  <div className="flex flex-row items-center gap-x-2">
                  <Select
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        borderColor: error.countryCodeId
                          ? "border-red-500"
                          : "border-gray-primary",
                      }),
                    }}
                    className="text-sm border rounded-xl w-28 bg-white font-medium"
                    options={codephone}
                    defaultValue={{ label: detailMerchant.countryCode.dialCode, value: detailMerchant.countryCode.id }}
                    name="countryCodeId"
                    onChange={(item) => {
                      Action.handleChange(dispatch, {
                        target: { name: "countryCodeId", value: item.value },
                      }, addForm);
                    }}
                    />
                    <div>
                      <input
                        type="text"
                        name="phoneNumber"
                        onChange={(e) => {
                          Action.handleChange(dispatch, e, addForm);
                        }}
                        placeholder={t("management.input_phone_no")}
                        className={`rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                          addError.phoneNumber
                            ? "border-red-500 border-1"
                            : "border-0"
                        }`}
                        defaultValue={detailMerchant.phoneNumber}
                      />
                      <p className="text-red-500">{addError.phoneNumber}</p>
                    </div>
                  </div>
                </div>

                {/* address */}
                <label className="font-bold">{t("management.address")}</label>
                <div>
                  <input
                    type="text"
                    name="address"
                    onChange={(e) => {
                      Action.handleChange(dispatch, e, addForm);
                    }}
                    placeholder={t("management.input_address")}
                    className={`rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                      addError.address ? "border-red-500 border-1" : "border-0"
                    }`}
                    defaultValue={detailMerchant.address}
                  />
                  <p className="text-red-500">{addError.address}</p>
                </div>

                {/* province */}
                <label className="font-bold">{t("management.province")}</label>
                
                <Select
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        borderColor: error.provincesId
                          ? "border-red-500"
                          : "border-gray-primary",
                      }),
                    }}
                    className="text-sm border rounded-xl w-full bg-white font-medium"
                    options={province}
                    defaultValue={{ label: detailMerchant.provinces.name, value: detailMerchant.provinces.id }}
                    name="provincesId"
                    onChange={(item) => {
                      Action.getCity(dispatch, item.value)
                      Action.handleChange(dispatch, {
                        target: { name: "provincesId", value: item.value },
                      }, addForm);
                    }}
                    />

                {/* city */}
                <label className="font-bold">{t("management.city")}</label>

                <Select
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        borderColor: error.citiesId
                          ? "border-red-500"
                          : "border-gray-primary",
                      }),
                    }}
                    className="text-sm border rounded-xl w-full bg-white font-medium"
                    options={city}
                    defaultValue={{ label: detailMerchant.cities.name, value: detailMerchant.cities.id }}
                    // value={city.filter(function(option) {
                    //   return option.value === detailMerchant.cities.id;
                    // })}
                    name="citiesId"
                    onChange={(item) => {
                      Action.getDistrict(dispatch, item.value)
                      Action.handleChange(dispatch, {
                        target: { name: "citiesId", value: item.value },
                      }, addForm);
                    }}
                    />

                {/* district */}
                <label className="font-bold">{t("management.district")}</label>
                <Select
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        borderColor: error.districtsId
                          ? "border-red-500"
                          : "border-gray-primary",
                      }),
                    }}
                    className="text-sm border rounded-xl w-full bg-white font-medium"
                    options={district}
                    defaultValue={{ label: detailMerchant.districts.name, value: detailMerchant.districts.id }}
                    // value={district.filter(function(option) {
                    //   return option.value === detailMerchant.districts.id;
                    // })}
                    name="districtsId"
                    onChange={(item) => {
                      Action.handleChange(dispatch, {
                        target: { name: "districtsId", value: item.value },
                      }, addForm);
                    }}
                    />

                {/* postalcode */}
                <label className="font-bold">
                  {t("management.postalcode")}
                </label>
                <div>
                  <input
                    type="text"
                    name="postalCode"
                    defaultValue={detailMerchant.postalCode}
                    onChange={(e) => {
                      Action.handleChange(dispatch, e, addForm);
                    }}
                    placeholder={t("management.input_postalcode")}
                    className={`rounded-xl w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                      addError.postalCode
                        ? "border-red-500 border-1"
                        : "border-0"
                    }`}
                  />
                  <p className="text-red-500">{addError.postalCode}</p>
                </div>
              </div>
              <div className="items-center gap-2 mt-3 flex justify-end">
                <ButtonWhite
                  title={t("general.cancel")}
                  onClick={() => {
                    Action.changeModal(dispatch, "3", { showModal: false });
                  }}
                />
                <ButtonGreen 
                title={t("general.save").toUpperCase()}
                onClick={(e) => {
                  Action.handleSave(dispatch, e, addForm, detailMerchant, setLoadingButton);
                }}
                disabled={loadingButton}
                />
                {/* <button
                  onClick={(e) => {
                    Action.handleSave(dispatch, e, addForm, detailMerchant);
                  }}
                  className="button md:w-36 hover:bg-gray-primary text-white border-2 hover:text-green-quaternary border-green-secondary text-xs tracking-widest bg-green-secondary font-bold py-2 rounded-xl"
                >
                  {t("general.save").toUpperCase()}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
