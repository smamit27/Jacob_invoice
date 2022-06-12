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

function TableViewType(props) {
  const { value, colDef = {} } = props;
  const { type } = colDef
  const classes = useStyles();

  switch (type) {
    case 'switch':
      return (
      <div className={classes.rootSwitch} >
        <Switch disabled checked={value} />
      </div>
    )
    default:
      return (
        <div className={classes.root} >
          {value}
        </div>
      )
  }
}

export default memo(TableViewType)
