import React from "react";

const ButtonGenExcel = ({ title, onClick }) => {
  return (
    <>
      <button
        className="button min-w-fit hover:bg-slate-50 text-sm font-bold py-2 px-6"
        style={{ border: "3px solid #CCD4CF", borderRadius: "16px" }}
        onClick={() => {
          onClick();
        }}
      >
        {title.toUpperCase()}
      </button>
    </>
  );
};

export default ButtonGenExcel;
