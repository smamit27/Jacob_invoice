import React from 'react';

export const ExpandArrow = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#F0F0F0"><path d="M0 0h24v24H0z" fill="none" />
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
        </svg>
    );
};

ExpandArrow.defaultProps = {
    color: '#F0F0F0',
};
