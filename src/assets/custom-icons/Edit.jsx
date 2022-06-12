import React from 'react';

export const Edit = ({ color }) => {
  return (
    <svg style={{marginTop: "6px",marginLeft: "5px"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" fill="none">
        <path d="M12 20H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.5 3.5C16.8978 3.10218 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04016C19.0692 3.14676 19.303 3.30302 19.5 3.5C19.697 3.69698 19.8532 3.93084 19.9598 4.18821C20.0665 4.44558 20.1213 4.72143 20.1213 5C20.1213 5.27858 20.0665 5.55443 19.9598 5.8118C19.8532 6.06917 19.697 6.30302 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
     </svg>
  );
};

Edit.defaultProps = {
  color: '#231EDC'
};