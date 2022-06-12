import React, { useState, useRef, useEffect, memo } from 'react';
import {  useSelector } from "react-redux";
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuList from '@mui/material/MenuList';
import { MenuItem } from '@mui/material';
import ByTaskNameGroup from './ByTaskNameGroup';
import ByTaskLevelGroup from './ByTaskLevelGroup';
import CollectionTaskGrouping from './CollectionTaskGrouping';


function QuickTaskGrouping({ disabled = false }) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState('')
  const anchorRef = useRef(null);
  const  getTaskMappingProjectList  = useSelector(({ common }) => common.sharedTaskMappingProjectList);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleAssign = (type) => {
    setOpenModal(type)
    setOpen(false)
  }

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


  return (
    <div>
      <Button
        ref={anchorRef}
        id="assign-by-button"
        aria-controls={open ? 'assign-by-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        variant="contained"
        color="secondary"
        endIcon={!open ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        disabled={disabled}>Quick Task Grouping </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 4, width: 300 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="assign-by-menu"
                  aria-labelledby="assign-by-button"
                  onKeyDown={handleListKeyDown}
                  dense
                >
                    <MenuItem disabled={getTaskMappingProjectList.length > 0} onClick={() => handleAssign('collection_task_grouping')}>Collection Task Grouping Configuration</MenuItem>
                    <MenuItem disabled={getTaskMappingProjectList.length < 1} onClick={() => handleAssign('by_task_name_group')}>Override by Task Number / Name by Contains</MenuItem>
                    <MenuItem disabled={getTaskMappingProjectList.length < 1} onClick={() => handleAssign('by_take_level_group')}>Override by Task level</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {openModal === 'collection_task_grouping' && <CollectionTaskGrouping open={openModal === 'collection_task_grouping'} onClose={() => setOpenModal('')} />}
   
      {openModal === 'by_task_name_group' && <ByTaskNameGroup open={openModal === 'by_task_name_group'} onClose={() => setOpenModal('')} />}
      {openModal === 'by_take_level_group' && <ByTaskLevelGroup open={openModal === 'by_take_level_group'} onClose={() => setOpenModal('')} /> }
    </div>
  );
}

export default memo(QuickTaskGrouping)