import { useState } from "react";
import { useTranslation } from "react-multi-lang";
import ButtonGreen from "../ButtonGreen/ButtonGreen";
import ButtonWhite from "../ButtonWhite/ButtonWhite";

const ConfModalWithImage = ({ onClick, onCancel, title, subtitle }) => {
  const t = useTranslation();
  const [formValues, setFormValues] = useState({ remarks: "" });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.remarks) {
      errors.remarks = "Remarks is required!";
    }
    setFormErrors(errors);
    return errors;
  };

  const handleSubmit = async () => {
    const isValid = validate(formValues);
    if (Object.keys(isValid).length == 0) {
      onClick({ remark: formValues.remarks });
      onCancel({ showModal: false });
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => {
            onCancel({ showModal: false });
          }}
        ></div>
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-xl p-4 mx-auto bg-gray-primary rounded-xl shadow-lg">
            <div className="m-3 text-left">
              <h3 className="text-green-primary font-bold pb-2">{title}</h3>

              <div className=" text-sm">{subtitle}</div>

              <div className="mt-5">
                <div className="flex flex-row gap-x-4 py-3">
                  <div className="w-44">
                    <label htmlFor="remark" className="font-bold">
                      {t("management.remarks")}
                    </label>
                  </div>
                  <div className="flex-1">
                    <textarea
                      type="text"
                      id="remarks"
                      name="remarks"
                      placeholder={t("management.input_remarks")}
                      className=" rounded-xl border-0 w-full text-sm bg-white"
                      onChange={handleChange}
                    />
                    <p className=" text-red-500">{formErrors.remarks}</p>
                  </div>
                </div>

                {/* <div className="flex flex-row gap-x-4 py-3">
                  <div className=" w-48">
                    <label htmlFor="remark" className="font-bold">
                      {t("management.upload_attachment")}
                    </label>
                    <div className="opacity-40">
                      {t("appcustomization.support_files")} jpeg,jpg,png
                    </div>
                    <div className="opacity-40">
                      {t("appcustomization.max_file")} 2
                    </div>
                    <div className="opacity-40">
                      {t("appcustomization.max_size")} 2Mb
                    </div>
                  </div>
                  <div className="flex-1">
                    <UploadImage
                      img={""}
                      aspectRatio={16 / 6}
                      name={"Banner_1"}
                    />
                  </div>
                </div> */}
              </div>
              <div className="items-center gap-2 mt-3 flex justify-end">
                <ButtonWhite
                  title={t("general.cancel")}
                  onClick={() => {
                    onCancel({ showModal: false });
                  }}
                />
                <ButtonGreen
                  title={t("general.confirm")}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfModalWithImage;
