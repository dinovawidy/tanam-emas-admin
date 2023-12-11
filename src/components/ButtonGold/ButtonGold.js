import React from "react";

const ButtonGold = ({ title, onClick, span }) => {
  return (
    <>
      <button
        className="button md:w-40 hover:bg-gray-primary text-white border-2 hover:text-green-quaternary border-gold-secondary text-sm tracking-wider bg-gold-secondary font-semibold py-3 rounded-xl"
        onClick={() => {
          onClick();
        }}
      >
        {title.toUpperCase()}{" "}
        {span ? (
          <span className="text-xs align-top bg-red-600 p-0.5 rounded-md">
            {span}
          </span>
        ) : (
          ""
        )}
      </button>
    </>
  );
};

export default ButtonGold;
