import React from "react";

const ButtonWhite = ({ title, onClick }) => {
  return (
    <>
      <button
        className="button md:w-36 hover:bg-green-secondary hover:text-gray-primary text-xs tracking-widest font-bold text-green-secondary border-2 border-green-secondary border-opacity-40 rounded-xl py-2"
        onClick={() => {
          onClick();
        }}
      >
        {title.toUpperCase()}
      </button>
    </>
  );
};

export default ButtonWhite;
