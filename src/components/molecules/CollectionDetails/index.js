import React, { useState } from 'react';
import AsyncTable from '../../atoms/CustomTable/RefactorTable';
import { columns, formData } from './constants';
import { Button, Checkbox, TextField, Select, FormControl, InputLabel, MenuItem, ListItemText, InputBase } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
function CollectionDetails() {
  const [personName, setPersonName] = React.useState([]);

  const elements = ['Selection 1', 'Selection 2', 'Selection 3', 'Selection 4', 'Selection 5', 'Selection 6'];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <Button variant="contained">Primary Button</Button>
      <Button variant="contained" color="secondary">Secondary Button</Button>
      <Button variant="contained" color="success">Tertiray Button</Button>
      <Button variant="text" color="info">Quaternary Button</Button>
      <br />
      <br />
      *Checkboxes -white background
      <br />
      <br />
      Checkbox: <Checkbox color='info' /><br />
      Unchecked disabled checkbox :<Checkbox color='info' disabled /><br />
      Checked disabled checkbox :<Checkbox color='info' disabled checked />
      <br />
      <br />
      *Checkboxes -color background
      <br />
      <br />
      Checkbox: <Checkbox color='success' /><br />
      Unchecked disabled checkbox :<Checkbox color='success' disabled /><br />
      Checked disabled checkbox :<Checkbox color='success' disabled checked /><br />
      <br />
      <TextField placeholder="Text Field Label" color='primary' /> <br /> <br />
      <TextField placeholder="Text Field Label" color='secondary'  /> <br /> <br />
      <TextField placeholder="Text Field Label" color='primary'  disabled /><br />< br />
      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-label">Dropdown Field Label</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={''}
          
        >
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-simple-select-label">Dropdown Field Label</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={''}
        >
          {elements.map((value, index) => {
            return <MenuItem key={index}>{value}</MenuItem>
          })}

        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 220 }}>
        <InputLabel id="demo-multiple-checkbox-label">Dropdown Field Label</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {elements.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, minWidth: 220 }} disabled>
        <InputLabel id="demo-simple-select-disabled-label">Dropdown Field Label</InputLabel>
        <Select
          labelId="demo-simple-select-disabled-label"
          id="demo-simple-select-disabled"
          value={''}
        >
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="DD/MMM/YYYY"
        // inputFormat="dd/MMM/yyyy"
        // value={value}
        // onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
      </LocalizationProvider>
      < br/>

      <DesktopDatePicker
        disabled
        label="DD/MMM/YYYY"
        inputFormat="dd/MMM/yyyy"
        // value={value}
        // onChange={handleChange}
        renderInput={(params) => <TextField {...params} />}
      />
    </div>
  )
}

export default CollectionDetails