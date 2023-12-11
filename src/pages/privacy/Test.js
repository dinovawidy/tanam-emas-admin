import React, { useEffect } from "react";

const Test = () => {
  const toasts = (value) => {
    window.postMessage(value, "*");
  };

  useEffect(() => {
    toasts("mas goji bau limbah");
  }, []);
  return (
    <div className="bg-white text-black h-screen w-screen">
      <div className="flex justify-center py-20">
        <button
          type="button"
          onClick={() => {
            toasts("BUTTON1");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          BUTTON1
        </button>
        <button
          type="button"
          onClick={() => {
            toasts("BUTTON2");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          BUTTON2
        </button>
      </div>
    </div>
  );
};

export default Test;
