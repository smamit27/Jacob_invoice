import React from 'react';

export const Arrow = ({ color }) => {
  return (
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <g clipPath="url(#clip0)" stroke={color} strokeWidth="2">
        <path d="M0 12h22.132M11.18 23.11l11.327-11.327-10.76-10.761" />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill={color} d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

Arrow.defaultProps = {
  color: 'black',
};
