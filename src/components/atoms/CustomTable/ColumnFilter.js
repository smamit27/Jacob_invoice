import React, { useState, useRef, useEffect, memo } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuList from '@mui/material/MenuList';
import { Button, IconButton, OutlinedInput, Stack, styled } from '@mui/material';
import { escapeRegExp } from '../../../helpers';


function ColumnFilter({ searchText ='', onFilter= () => null, filterTitle = 'column', disabled = false }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(searchText)
  const anchorRef = useRef(null);

  const handleToggle = () => {
    if (prevOpen) {
      setInput(searchText)
    }
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const onInput = (e) => {
    setInput(e.target.value)
  }

  const handleFilter = (e) => {
    onFilter(escapeRegExp(input))
    handleClose(e)
  }

  const handleClear = () => {
    setInput('')
    onFilter('')
  }

  return (
    <div className={`custom-table-column-filter-container ${open ? 'open' : ''}`} >
      <IconButton
        ref={anchorRef}
        id="custom-table-column-button"
        aria-controls={open ? 'custom-table-column-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        disabled={disabled}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        style={{ zIndex: 4, width: 350}}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-end' ? 'left bottom' : 'left top',
            }}
            className="custom-table-column-filter"
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="custom-table-column-menu"
                  aria-labelledby="custom-table-column-button"
                  onKeyDown={handleListKeyDown}
                  dense
                  style={{ padding: '1em' }}
                >
                  <MenuHeader>{`Filter by ${filterTitle}`}</MenuHeader>
                  <li><OutlinedInput value={input} onChange={onInput} placeholder={`Search by ${filterTitle}`}size="small" fullWidth /></li>
                  <MenuFooter>
                    <Stack direction="row" justifyContent="space-between" >
                      <Button variant="contained" color="secondary" onClick={handleClear} >Clear</Button>
                      <Button variant="contained" color="secondary" onClick={handleFilter} >Filter</Button>
                    </Stack>
                  </MenuFooter>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const MenuHeader = styled('li')({
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '16px',
  color: '#222222',
  marginBottom: '1.5em'
})

const MenuFooter = styled('li')({
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '16px',
  color: '#222222',
  marginTop: '2em',
})

export default memo(ColumnFilter)