import React from "react";

const CustomButton = ({ name }: { name: string }) => {
  return (
    <button className="relative flex items-center gap-1 px-9 py-1 border-4 border-transparent text-base font-semibold text-yellow-500 bg-inherit rounded-full shadow-[0_0_0_2px_#eab308] cursor-pointer overflow-hidden transition-[box-shadow,color,border-radius] duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-[0_0_0_12px_transparent] hover:text-[#212121] hover:rounded-xl active:scale-95 active:shadow-[0_0_0_4px_#eab308] group">
      <svg
        viewBox="0 0 24 24"
        className="absolute w-6 fill-black z-[9] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] -left-[25%] group-hover:left-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>
      <span className="relative z-[1] -translate-x-3 transition-all duration-600 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3 text-sm lg:text-lg">
        {name}
      </span>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-yellow-500 rounded-full opacity-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100"></div>
      <svg
        viewBox="0 0 24 24"
        className="absolute w-6 fill-yellow-500 z-[9] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] right-4 group-hover:-right-[25%] group-hover:fill-[#212121]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
      </svg>
    </button>
  );
};

export default CustomButton;
