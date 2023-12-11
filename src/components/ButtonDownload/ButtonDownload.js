import React from "react";

const ButtonDownload = ({ title, onClick }) => {
  return (
    <>
      <button
        className="button md:w-36 hover:bg-green-secondary hover:text-gray-primary text-xs tracking-widest font-bold text-white border-2 border-white border-opacity-40 rounded-xl py-2"
        onClick={() => {
          onClick();
        }}
      >
        {title.toUpperCase()}
      </button>
    </>
  );
};

export default ButtonDownload;
