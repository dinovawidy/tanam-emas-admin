import { useState } from "react";
import { useTranslation } from "react-multi-lang";
import ButtonGreen from "../../components/ButtonGreen/ButtonGreen";
import ButtonWhite from "../../components/ButtonWhite/ButtonWhite";

const ConfirmationModal = ({ onClick, onCancel, title, subtitle }) => {
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
    if (Object.keys(isValid).length === 0) {
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
          <div className="relative w-full max-w-lg p-4 mx-auto bg-gray-primary rounded-xl shadow-lg">
            <div className="m-3 text-left">
              <h3 className="text-green-primary font-bold pb-2">{title}</h3>

              <div className=" text-sm">{subtitle}</div>

              <div className="mt-5">
                <div className="flex flex-row gap-x-4 py-3">
                  <div className="w-32">
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
                      maxLength="255"
                      onChange={handleChange}
                    />
                    <p className=" text-red-500">{formErrors.remarks}</p>
                  </div>
                </div>
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

export default ConfirmationModal;
