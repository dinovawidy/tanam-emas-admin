const ButtonSort = ({ title, isAsc, isDesc, sortAsc, sortDesc, color }) => {
  return (
    <div className="flex flex-row gap-x-1 items-center">
      <p>{title}</p>
      <div className="flex flex-col">
        <button onClick={sortDesc}>
          <div
            className={`rotate-180 cursor-pointer ${isDesc === true ? "h-2 w-2" : "h-1.5 w-2 opacity-30"
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="7"
              height="7"
              strokeWidth="10"
              stroke={`${color === "white" ? "white" : "black"}`}
              viewBox="0 0 256 256"
              fill={`${color === "white" ? "white" : "black"}`}
            >
              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                  d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </button>
        <button onClick={sortAsc}>
          <div
            className={`cursor-pointer ${isAsc === true ? "h-2 w-2" : "h-1.5 w-2 opacity-30"
              } `}
            style={{ paddingLeft: "0.8px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="7"
              height="7"
              viewBox="0 0 256 256"
              fill={`${color === "white" ? "white" : "black"}`}
              strokeWidth="10"
              stroke={`${color === "white" ? "white" : "black"}`}
            >
              <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                <path
                  d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                  transform=" matrix(1 0 0 1 0 0) "
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ButtonSort;
