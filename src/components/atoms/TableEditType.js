import { Switch } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { memo } from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 16,
  },
  rootSwitch: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 16,
    justifyContent: 'center',
    width: '100%'
  }
});

function TableEditType(props) {
  const { id, value, api, field, colDef = {} } = props;
  const { type } = colDef
  const classes = useStyles();

  const handleChange = (event) => {
    api.setEditCellValue({ id, field, value: event.target.value }, event);
  };

  const handleSwitchChange = (event) => {
    api.setEditCellValue({ id, field, value: event.target.checked }, event);
  };

  const handleRef = (element) => {
    if (element) {
      element.focus()
      // element.querySelector(`input[value="${value}"]`).focus();
    }
  };
  switch (type) {
    case 'switch':
      return (
      <div className={classes.rootSwitch} >
        <Switch inputRef={handleRef} name={field} checked={value} onChange={handleSwitchChange} />
      </div>
    )
    default:
      return null
  }
}

export default memo(TableEditType)
