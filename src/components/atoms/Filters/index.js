import React, { useState } from 'react';
import { Button, MenuList, Paper, Stack, Popover, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import './index.css'

export default function ColumnFilter({ filteredConfig }) {
  const { column = {}, handleClose = () => null, anchorEl = null, handleFilterClick = () => null, filtersData = [] } = filteredConfig
  const [filters, setFilters] = useState(filtersData)
  const open = Boolean(anchorEl);
  const onFilter = () => {
    handleFilterClick([...filters])
  }
  const onChange = (val) => {
    setFilters([...val])
  }
  const onClear = () => {
    setFilters(filters.filter(d => d.key !== column?.key))
  }
  return (
    <>
    <Popover
      id={column?.key}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      transitionDuration={0}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Paper style={{ width: 350 }} >
        <div
          style={{ padding: '8px 16px 16px' }}
        >
          <MenuHeader tabIndex={-1} >
            <MenuTitle className='bold' >{`Filter by ${column?.name}`}</MenuTitle>
            <IconButton onClick={handleClose} ><i className="lar la-times-circle" /></IconButton>
          </MenuHeader>
            {column?.filterEditor && <column.filterEditor column={column} onChange={onChange} filters={filters} />}
          <MenuFooter>
            <Stack direction="row" justifyContent="space-between" >
              <Button variant="contained" color="secondary" onClick={onClear} >Clear</Button>
              <Button variant="contained" color="primary" onClick={onFilter} >Filter</Button>
            </Stack>
          </MenuFooter>
        </div>
      </Paper>
    </Popover>
    </>
  );
}

const MenuHeader = styled('div')({
  marginBottom: '1em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})
const MenuTitle = styled('div')({
  fontSize: '14px',
  lineHeight: '16px',
  color: '#222222',
})

const MenuFooter = styled('div')({
  fontWeight: 'bold',
  fontSize: '14px',
  lineHeight: '16px',
  color: '#222222',
  marginTop: '15px',
})