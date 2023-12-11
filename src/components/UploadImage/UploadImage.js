import React, { useState, useEffect } from "react";
import { useTranslation } from "react-multi-lang";
import Cropper from "react-cropper";
import ButtonWhite from "../ButtonWhite/ButtonWhite";
import PopupUtility from "../../utils/popup-utility";
import "cropperjs/dist/cropper.css";

const UploadImage = ({
  img,
  aspectRatio,
  name,
  position,
  onClick,
  wording,
  onDelete,
}) => {
  const t = useTranslation();
  const baseImg = process.env.REACT_APP_ASSETS_IMAGE;
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState("");
  const [showModal, setShowModal] = useState(false);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      if (e.target.files[0].size < 1000000) {
        let files;
        setShowModal(true);
        setImageName(e.target.files[0].name);
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        PopupUtility.responseValidate(
          "Failed",
          "Your image size must be less than 1 Mb"
        );
      }
    }
  };

  const getCropData = async () => {
    setShowModal(false);
    if (typeof cropper !== "undefined") {
      const file = await fetch(
        cropper
          .getCroppedCanvas({
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high",
            maxWidth: 500,
            maxHeight: 500,
          })
          .toDataURL()
      ).then((res) => {
        setCropData(res.url);
        onClick(res.url, imageName);
      });
      return file;
    }
  };

  const cropImage = async () => {
    await getCropData();
  };

  useEffect(() => {
    setImage(img);
  }, [img]);

  return (
    <>
      {image !== "" ? (
        <div className={`h-25 w-60 uploadimage mb-10`}>
          <div
            className="overlay float-right"
            onClick={() => {
              onDelete();
              setImage("");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2em"
              viewBox="0 0 384 512"
              className="h-5 w-5 mb-2"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
          <label htmlFor={name}>
            <img
              className="h-full w-full rounded-xl overlay-img"
              src={cropData !== "#" ? cropData : image}
              alt="cropped"
            />
          </label>
        </div>
      ) : (
        <label
          htmlFor={name}
          className={`flex flex-col items-center justify-center h-25 w-60 border-2 border-gray-400 rounded-xl border-opacity-20 cursor-pointer bg-gray-primary dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-white dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
        >
          <div
            className={`flex flex-${position} gap-${
              position === "col" ? "y" : "x"
            }-3 items-center justify-center `}
          >
            <img
              className="h-9"
              src={baseImg + "upload-icon.svg"}
              alt="upload"
            />
            {wording ? (
              <p className="mb-2 text-sm font-semibold text-center">
                {wording}
              </p>
            ) : (
              <p className="mb-2 text-sm font-semibold text-center">
                {/* {t("appcustomization.drop_files")} <br />{" "}
                {t("appcustomization.or")} */}
                <span className="underline underline-offset-2 text-green-secondary">
                  {" "}
                  {t("appcustomization.browser_files")}
                </span>
              </p>
            )}
          </div>
        </label>
      )}
      <input
        id={name}
        type="file"
        className="hidden"
        onChange={onChange}
        accept="image/png, image/jpg, image/jpeg"
      />

      {showModal ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-lg shadow-lg">
              <div className="m-3">
                <h3 className="text-green-primary font-bold">Crop Image</h3>
                <div className="mt-5">
                  <Cropper
                    style={{ height: "60vh", width: "100%" }}
                    zoomTo={0.3}
                    aspectRatio={aspectRatio}
                    src={image}
                    background={false}
                    responsive={true}
                    // viewMode={2}
                    // autoCropArea={1}
                    // minCropBoxHeight={100}
                    checkOrientation={false}
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                </div>
                <div className="items-center gap-2 mt-3 flex justify-end">
                  <ButtonWhite
                    title="cancel"
                    onClick={() => {
                      setShowModal(false);
                      if (image === "") {
                        setImage("");
                      }
                    }}
                  />
                  <button
                    className="button md:w-36 hover:bg-gray-primary hover:text-green-secondary text-xs tracking-widest font-bold text-gray-primary border-2 border-green-secondary bg-green-secondary border-opacity-40 rounded-xl py-2"
                    onClick={() => {
                      cropImage();
                    }}
                  >
                    CROP IMAGE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UploadImage;
