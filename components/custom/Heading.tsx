import React from "react";

const Heading = ({ name }: { name: string }) => {
  return (
    <div className="flex w-full relative">
      <h5 className=" capitalize after:w-[80px] after:h-[3px] after:bg-primary-700 pb-2 after:absolute after:left-0 after:bottom-0 ">
        {name}{" "}
      </h5>
    </div>
  );
};

export default Heading;
