import React from "react";
import { BounceLoader } from "react-spinners";
const Loading = ({
  isLoading,
  color = "#94203b",
  size = 100,
}: {
  isLoading: boolean;
  color?: string;
  size?: number;
}) => {
  return (
    <div className="!z-50 absolute inset-0 flex items-center justify-center h-screen">
      {isLoading && <BounceLoader color={color} size={size} />}
    </div>
  );
};

export default Loading;
