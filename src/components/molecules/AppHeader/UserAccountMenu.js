import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export default function UserAccountMenu({handleDropdown}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSignout = () => {
    setAnchorEl(null);
    handleDropdown(true)
  };
//   const handleDropdown = (flag) => {
//     if (flag) {
//       deleteCookie("auth");
//       history.replace("/");
//     }
//     setAnchorEl(null);
//   };

  return (
    <div>
        
      <Button style={{color:'white', marginTop:'2px'}}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={open?<i className="las la-angle-up" style={{fontSize:'10px'}}></i>:<i className="las la-angle-down" style={{fontSize:'10px'}}></i>}
      >
        John Smith
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleCloseSignout}>Sign out</MenuItem>
      </Menu>
    </div>
  );
}
