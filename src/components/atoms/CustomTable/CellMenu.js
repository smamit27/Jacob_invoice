import * as React from 'react';
import { IconButton, MenuItem, Menu } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function CellMenu({ id, onCellMenuItemClick = () => null, cellMenuOptions = [{ id: 'add-row', description: 'Insert row' }] }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (d, e) => {
    onCellMenuItemClick(d.id)
    handleClose(e)
  }

  return (
    <div className="cell-menu-container" >
      <IconButton
        id={`cell-menu-${id}-button`}
        aria-controls={`cell-menu-${id}`}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id={`cell-menu-${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disablePortal
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        MenuListProps={{
          'aria-labelledby': `cell-menu-${id}-button`,
        }}
      >
        {cellMenuOptions.map((d, i) => (<MenuItem key={i} onClick={(e) => handleMenuClick(d, e)}>{d.description}</MenuItem>))}
      </Menu>
    </div>
  );
}
