import React, { useState, useRef, useEffect, memo } from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuList from '@mui/material/MenuList';
import { MenuItem } from '@mui/material';
import ByAllianceCode from './ByAllianceCode';
import ByProjectNumber from './ByProjectNumber';
import { SearchProjectNumberModal } from '../Modal';
import { getGenerateCollectionCustomAction } from '../../../redux/common/logic'
import { AllianceCode } from '../Steppar';


function AssignProjects({ disabled = false }) {
  const collectionId = useSelector(state => state.getCollectionId)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState('')

  const anchorRef = useRef(null);

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
    dispatch(getGenerateCollectionCustomAction([collectionId]))
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
        disabled={disabled}
      >
        Assign Projects
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        style={{ zIndex: 4, width: 250 }}
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
                  <MenuItem onClick={() => handleAssign('code')}>By Alliance code(s) </MenuItem>
                  <MenuItem onClick={() => handleAssign('project')}>By Project Number(s)</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {openModal === 'code' && <AllianceCode isCollectionExist open={openModal === 'code'} onClose={() => setOpenModal('')} />}
      {/* {openModal === 'code' && <ByAllianceCode open={openModal === 'code'} onClose={() => setOpenModal('')} />} */}
      {openModal === 'project' && <SearchProjectNumberModal isCollectionExist open={openModal === 'project'} onClose={() => setOpenModal('')}/>}
      {/* <ByProjectNumber open={openModal === 'project'} onClose={() => setOpenModal('')} /> */}
    </div>
  );
}

export default memo(AssignProjects)