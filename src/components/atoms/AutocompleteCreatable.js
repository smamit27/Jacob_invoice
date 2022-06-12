import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function AutocompleteCreatable({ value = null, onChange = () => null, valueOptions, ...rest }) {
  return (
    <Autocomplete
      {...rest}
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          if (!valueOptions.some((option) => newValue === option.title)) {
            onChange(newValue)
          }
        } else if (newValue && newValue.inputValue) {
          onChange(newValue.inputValue)
        } else {
          onChange(newValue?.title || '')
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={valueOptions}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      fullWidth
      freeSolo
      renderInput={(params) => (
        <TextField {...params} placeholder="Search" />
      )}
    />
  );
}

