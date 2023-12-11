import React, { useRef, useState, useEffect } from "react";
import ButtonDownload from "../ButtonDownload/ButtonDownload";
import CaptureUtility from "../../utils/capture-utility";

function convertS3UrlToBase64(s3Url) {
  return new Promise((resolve, reject) => {
    fetch(s3Url)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const ModalImage = ({ onCancel, title, img }) => {
  const [zoom, setZoom] = useState(100);
  const [base64Image, setBase64Image] = useState("");
  const exportRef = useRef();

  useEffect(() => {
    // Replace with your S3 image URL
    const s3ImageUrl = img;

    convertS3UrlToBase64(s3ImageUrl)
      .then((base64String) => {
        setBase64Image(base64String);
      })
      .catch((error) => {
        console.error("Error converting S3 URL to base64:", error);
      });
  }, []);
  return (
    <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-green-quinary bg-opacity-90"></div>
        <div className="flex flex-col min-h-screen px-4">
          <div className="relative px-8 pt-4 text-white">
            <div className="flex flex-row gap-x-8 items-center">
              <div className="flex-1">{title}</div>
              <div className="pt-1">
                <ButtonDownload
                  title={"Download"}
                  onClick={() => {
                    CaptureUtility(exportRef.current, title);
                  }}
                />
              </div>

              <div
                className="text-2xl cursor-pointer font-thin"
                onClick={() => {
                  onCancel({ showModal: false });
                }}
              >
                x
              </div>
            </div>
          </div>
          <div
            className="relative w-full max-w-4xl mx-auto my-auto shadow-lg"
            ref={exportRef}
          >
            <div style={{ width: zoom + "%" }}>
              <img
                style={{ width: zoom + "%" }}
                src={
                  img != null
                    ? base64Image
                    : process.env.REACT_APP_ASSETS_IMAGE + "username-icon.svg"
                }
                alt={title}
              />
            </div>
          </div>
          <div className="relative w-fit mx-auto pb-4">
            <div className="flex flex-row items-center justify-center bg-green-secondary text-md text-white rounded-lg">
              <button className="px-3 py-1" onClick={() => setZoom(zoom - 10)}>
                -
              </button>
              <button className="px-2 py-1">zoom</button>
              <button className="px-3 py-1" onClick={() => setZoom(zoom + 10)}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalImage;
