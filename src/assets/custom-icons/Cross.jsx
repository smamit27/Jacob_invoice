import React from "react";

export const Cross = ({ color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 32 32" fill={color}>
      <path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z" />
    </svg>
  );
};

Cross.defaultProps = {
  color: "rgba(0, 0, 0, 0.54)",
};
