import React, { useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import { Provider, useDispatch, useSelector } from "react-redux";
import StoreHelper from "../../../../services/store-helper";
import reducerSlice, {
  setEditProfile,
  setEdit,
  setPopuppassword,
  setCookie,
} from "./redux/Reducer";
import Action from "./redux/Action";
import UploadImage from "../../../../components/UploadImage/UploadImage";
import PopupPassword from "../../../../components/PopupPassword/PopupPassword";
import Select from "react-select"

const EditProfile = () => {
  const store = StoreHelper.generateStoreState(reducerSlice);
  store.getState();

  const MainComponent = () => {
    const t = useTranslation();
    const dispatch = useDispatch();

    const editProfile = useSelector((state) => state.reducer.editProfile);
    const codephone = useSelector((state) => state.reducer.codephone);
    const validateStatus = useSelector((state) => state.reducer.validateStatus);
    const validatePass = useSelector((state) => state.reducer.validatePass);
    const popuppassword = useSelector((state) => state.reducer.popuppassword);
    const cookie = useSelector((state) => state.reducer.cookie);
    const data = useSelector((state) => state.reducer.data);
    const edit = useSelector((state) => state.reducer.edit);
    const password = useSelector((state) => state.reducer.pass);
    const errorEditProfile = useSelector(
      (state) => state.reducer.errorEditProfile
    );

    const handleSave = (pass) => {

      //check name
      if(editProfile.name !== data.name) {
        //check validation pass
        if(validatePass === true) {
          dispatch(setCookie(true));
          dispatch(setPopuppassword(true))
        } else if(editProfile.name !== data.name && editProfile.phoneNumber !== data.phoneNumber) {
          dispatch(setCookie(false));
          dispatch(setPopuppassword(true));
        } else if(editProfile.name !== data.name && editProfile.email !== data.email) {
          dispatch(setCookie(true));
          dispatch(setPopuppassword(true));
        } else {
          dispatch(setCookie(false))
          Action.handleSubmit(dispatch, pass, editProfile, data, validatePass, cookie, password)
        }
      } 
      // else if(editProfile.name !== data.name && editProfile.email !== data.email) {
      //   dispatch(setCookie(true));
      //   dispatch(setPopuppassword(true));
      // } 
      // else if(editProfile.name !== data.name && editProfile.phoneNumber !== data.phoneNumber) {
      //   dispatch(setCookie(false));
      //   dispatch(setPopuppassword(true));
      // }

       else if(editProfile.email !== data.email) {
        dispatch(setCookie(true));
        dispatch(setPopuppassword(true));
      }else if(editProfile.phoneNumber !== data.phoneNumber || editProfile.countryCodeId !== data.countryCode_id) {
        dispatch(setCookie(false));
        dispatch(setPopuppassword(true));
      } 
      else {
        // Jika tidak ada perubahan pada name, langsung memanggil handleSubmit
        dispatch(setCookie(false));
        dispatch(setPopuppassword(true))
      }
    }

    useEffect(() => {
      if (validateStatus === true) {
        Action.validate(dispatch, editProfile);
      } else {
        Action.getCodePhone(dispatch);
        Action.getData(dispatch);
      }
    }, [editProfile]);

    return (
      <form>
        <div className="flex flex-col gap-y-4 md:h-[41em] px-3 overflow-y-auto font-medium">
          <div className="opacity-60 font-bold text-md">
            {t("accountsettings.edit_profile").toUpperCase()}
          </div>

          {/* Admin Photo */}
          <div className="flex flex-row gap-x-3">
            <div className="w-60">
              <div className="text-md font-bold">
                {t("accountsettings.admin_photo")}
                <span className=" text-gold-secondary">*</span>
              </div>
              <div className="opacity-40">
                {t("accountsettings.support_files")} jpg, jpeg, png
              </div>
              <div className="opacity-40">{t("accountsettings.max_size")}</div>
            </div>
            <div className="w-40">
              <UploadImage
                img={data.photo}
                aspectRatio={1 / 1}
                name={"photo"}
                width={40}
                height={40}
                position={"col"}
                onClick={(photo, name) => {
                  dispatch(
                    setEditProfile({
                      ...editProfile,
                      photo: photo,
                      namePhoto: name,
                    })
                  );
                }}
                onDelete={() =>
                  dispatch(
                    setEditProfile({
                      ...editProfile,
                      photo: "",
                      namePhoto: "",
                    })
                  )
                }
              />
              <p className="text-red-500">{errorEditProfile.photo}</p>
            </div>
          </div>
          <hr />

          {/* //merchant name */}
          {edit.name === false ? (
            <div className="flex flex-row items-center gap-x-3">
              <div className="w-60">
                <div className="text-md font-bold">
                  {t("accountsettings.name")}
                </div>
              </div>
              <div className="flex text-md">{data.name}</div>
              <div className="flex-1 text-md text-right font-bold">
                <div
                  className="cursor-pointer underline underline-offset-2 hover:text-black"
                  onClick={() => {
                    dispatch(setEdit({ ...edit, name: true }));
                  }}
                >
                  Edit
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-3">
              <div className="w-44">
                <div
                  className={`text-md font-bold ${
                    errorEditProfile.name ? "pb-4" : " "
                  }`}
                >
                  {t("accountsettings.name")}
                  <span className="text-gold-secondary">*</span>
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="name"
                  onChange={(e) => {
                    Action.handleChange(dispatch, e, editProfile);
                  }}
                  placeholder={t("accountsettings.name")}
                  className={`rounded-xl border-0 w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                    errorEditProfile.name
                      ? "border-red-500 border-1"
                      : "border-0"
                  }`}
                  defaultValue={data.name}
                />
                <p className="text-red-500">{errorEditProfile.name}</p>
              </div>
            </div>
          )}

          <hr />

          <div className="flex flex-row items-center gap-x-3">
            <div className="w-60">
              <div className="text-md font-bold">
                {t("accountsettings.admin_id")}
              </div>
            </div>
            <div className="flex-1">
              <div className="opacity-50">{data.id}</div>
            </div>
          </div>

          <hr />

          <div className="flex flex-row items-center gap-x-3">
            <div className="w-60">
              <div className="text-md font-bold">
                {t("accountsettings.role")}
              </div>
            </div>
            <div className="flex-1">
              <div className="opacity-50">{data.role + " - " + data.level}</div>
            </div>
          </div>

          <hr />

          {edit.email === false ? (
            <div className="flex flex-row items-center gap-x-3">
              <div className="w-60">
                <div className="text-md font-bold">
                  {t("accountsettings.email")}
                </div>
              </div>
              <div className="flex text-md">{data.email}</div>
              <div className="flex-1 text-md text-right font-bold">
                <div
                  className="cursor-pointer underline underline-offset-2 hover:text-black"
                  onClick={() => {
                    dispatch(setEdit({ ...edit, email: true }));
                  }}
                >
                  Edit
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-3">
              <div className="w-44">
                <div
                  className={`text-md font-bold ${
                    errorEditProfile.name ? "pb-4" : " "
                  }`}
                >
                  {t("accountsettings.email")}
                  <span className="text-gold-secondary">*</span>
                </div>
              </div>
              <div className="flex-1">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => {
                    Action.handleChange(dispatch, e, editProfile);
                  }}
                  placeholder={t("accountsettings.email")}
                  className={`rounded-xl border-0 w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                    errorEditProfile.email
                      ? "border-red-500 border-1"
                      : "border-0"
                  }`}
                  defaultValue={data.email}
                />
                <p className="text-red-500">{errorEditProfile.email}</p>
              </div>
            </div>
          )}

          <hr />

          {/* //Phone Number */}

          {edit.phoneNumber === false ? (
            <div className="flex flex-row items-center gap-x-4 py-5">
              <div className="w-60">
                <div className="text-md font-bold">
                  {t("accountsettings.phone_no")}
                </div>
              </div>
              <div className="flex text-md">
                {data.countryCode_dialCode + " " + data.phoneNumber}
              </div>
              <div className="flex-1 text-md text-right font-bold">
                <div
                  className="cursor-pointer underline underline-offset-2 hover:text-black"
                  onClick={() => {
                    dispatch(setEdit({ ...edit, phoneNumber: true }));
                  }}
                >
                  Edit
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-x-3">
              <div className="w-44">
                <div
                  className={`text-md font-bold ${
                    errorEditProfile.phoneNumber ||
                    errorEditProfile.countryCodeId
                      ? "pb-4"
                      : " "
                  }`}
                >
                  {t("accountsettings.phone_no")}
                  <span className="text-gold-secondary">*</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex flex-row items-center gap-x-2">

                <Select
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        borderColor: errorEditProfile.countryCodeId
                          ? "border-red-500"
                          : "border-gray-primary",
                      }),
                    }}
                    className="text-sm border w-36 bg-white font-medium"
                    defaultValue={{ label: data.countryCode_dialCode, value: data.countryCode_id }}
                    options={codephone}
                    name="countryCodeId"
                    onChange={(item) => {
                      Action.handleChange(dispatch, {
                        target: { name: "countryCodeId", value: item.value },
                      }, editProfile);
                    }}
                    />

                  <input
                    type="number"
                    name="phoneNumber"
                    onChange={(e) => {
                      Action.handleChange(dispatch, e, editProfile);
                    }}
                    placeholder={t("accountsettings.phone_no")}
                    className={`rounded-xl border-0 w-full text-sm font-bold bg-white placeholder:text-green-secondary placeholder:font-medium ${
                      errorEditProfile.phoneNumber
                        ? "border-red-500 border-1"
                        : "border-0"
                    }`}
                    defaultValue={data.phoneNumber}
                  />
                </div>
                <p className="text-red-500">{errorEditProfile.phoneNumber}</p>
              </div>
            </div>
          )}

          <div className="flex flex-row-reverse gap-x-2 pt-5">
            
            <button
              onClick={(e, pass) => {
                e.preventDefault();
                handleSave()
              }}
              className="button md:w-36 hover:bg-gray-primary text-white border-2 hover:text-green-quaternary border-green-secondary text-xs tracking-widest bg-green-secondary font-bold py-3 rounded-xl"
            >
              {t("accountsettings.save")}
            </button>
          </div>
        </div>

        {popuppassword === true ? (
          <PopupPassword
          onCancel={() => {
            dispatch(setPopuppassword(false));
          }}
            onSubmit={(pass, e) => {
              e.preventDefault()
              Action.handleSubmit(dispatch, pass, editProfile, data, validatePass, cookie, password )
            }}
            section={t("register.account_details")}
          />
        ) : (
          ""
        )}
        
      </form>
    );
  };
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default EditProfile;
