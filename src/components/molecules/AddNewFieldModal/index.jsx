import { useTheme } from "@emotion/react";
import { Button, FormGroup, MenuItem, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addModuleAllAction,requiredAllOptions} from "./logic";


const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      color: "#777777",
      padding: "8px",
      minHeight: "40",
    },
  },
  borderListCollection: {
    borderRight: "1px solid #EEEEEE",
  },
  borderListClient: {},
});
const Label = styled.label`
  color: black;
  text-align: left;
  display: flex;
  margin-bottom: 5px;
  font-family: Jacobs Chronos !important;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  color: #222222;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  width: 60%;
  color: '#777777'
  border-radius: 5px;
  height: 40px;
  font-family: Jacobs Chronos !important;
  font-style: normal;
  font-weight: 400;

`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const newFieldType = [
  { id: "1", description: "Free Text" },
  { id: "2", description: "Date" },
  { id: "3", description: "Numeric" },
  { id: "4", description: "Currency" },
  { id: "5", description: "Account Number" },
  { id: "6", description: "Dropdown" },
  { id: "7", description: "Add New Filed Type" },
];
// const requiredOptions = [
//   { id: "41", description: "Yes" },
//   { id: "42", description: "No" },
// ];
const numericFormatType = [
  { id: "11", description: "X" },
  { id: "12", description: "XX" },
  { id: "13", description: "XXX" },
];
const DropdownOption = [
  { id: "21", description: "Existing" },
  { id: "12", description: "New" },
];
// const moduleOptions = ["Project Mapping", "Funding", "Budget"];
const newNameOption = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];



function AddNewFieldModal(props) {
  const [numericShow, setNumericShow] = useState(false);
  const [dropdownTypeShow, setDropdownTypeShow] = useState(false);
  const [newDropdown, setNewDropdown] = useState(false);
  const [newNameDescription, setNewNameDescription] = React.useState([]);
  const [module, setModule] = React.useState([]);

  const theme = useTheme();
  const [addnewField, setAddnewField] = useState([]);
  const [requiredValue, setRequiredValue] = useState([]);

  const [numericFormat, setNumericFormat] = useState([]);
  const [dropdownFormat, setDropdownFormat] = useState([]);

  const [fieldName, setFieldName] = useState();

  const [inputFields, setInputFields] = useState([
    {
      module: "",
      fieldName: "",
      addnewField: "",
      numericFormat: "",
      dropdownFormat: "",
      newNameDescription: "",
      requiredValue: "",
    },
  ]);

  const classes = useStyles();

  const dispatch = useDispatch()
  const { data: moduleOptions } = useSelector(state => state.addModuleAllReducer)
  const { reqdata: requiredOptions } = useSelector(state => state.requiredReducer)

  useEffect(() => {
    dispatch(addModuleAllAction())
    dispatch(requiredAllOptions())
  }, [])


  const onChangeNumeric = (event) => {
    const {
      target: { value },
    } = event;
    setNumericFormat(
      typeof value.description === "string"
        ? value.description.split(",")
        : value.description
    );
  };
  const onChangeDropdown = (event) => {
    const {
      target: { value },
    } = event;
    if (value.description === "New") {
      setNewDropdown(true);
    } else {
      setNewDropdown(false);
    }

    setDropdownFormat(
      typeof value.description === "string"
        ? value.description.split(",")
        : value.description
    );
  };
  const onChangeRequired = (event) => {
    const {
      target: { value },
    } = event;

    setRequiredValue(
      typeof value.description === "string"
        ? value.description.split(",")
        : value.description
    );
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.description === "Numeric") {
      setNumericShow(true);
      setDropdownTypeShow(false);
    } else if (value.description === "Dropdown") {
      setDropdownTypeShow(true);
      setNumericShow(false);
    } else {
      setNumericShow(false);
      setDropdownTypeShow(false);
    }

    setAddnewField(
      typeof value.description === "string"
        ? value.description.split(",")
        : value.description
    );
  };
  const onChangeNewDesc = (event) => {
    const {
      target: { value },
    } = event;
    setNewNameDescription(typeof value === "string" ? value.split(",") : value);
  };
  const onChangeModule = (event) => {
    const {
      target: { value },
    } = event;
    setModule(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({
      module: "",
      fieldName: "",
      addnewField: "",
      numericFormat: "",
      dropdownFormat: "",
      newNameDescription: "",
      requiredValue,
    });
    setInputFields(values);
  };

  return (
    <div>
      <FormGroup row={true}>
        {inputFields.map((inputField, index) => (
          <Fragment key={`${inputField}~${index}`}>
            <FormControl
              sx={{ mb: 1, mt: 1, height: "10%", width: "calc(50% - 5em)" }}
            >
              <Label>Module</Label>
              <Select
                labelId="demo-multiple-label"
                id="multiple-name"
                multiple
                value={module}
                name="module"
                onChange={onChangeModule}
                input={<OutlinedInput />}
                MenuProps={MenuProps}
              >
                {moduleOptions.map((name) => (
                  <MenuItem
                    key={name.MODULE_ID}
                    value={name.MODULE_ID}
                    style={getStyles(name, module, theme)}
                  >
                    {name.MODULE_NAME}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box display="flex" flexDirection="column" mr={2} mt={1} ml={4}>
              <Label>Field Name</Label>
              <TextField
                id="outlined-basic"
                value={fieldName}
                name="fieldName"
                variant="outlined"
                size="Small"
                autoComplete="off"
                style={{ width: "300px" }}
              />
            </Box>

            <FormControl sx={{ mb: 1, width: "calc(50% - 5em)", mt: 1 }}>
              <Label>Field Type</Label>
              <Select
                className={classes.root}
                style={{ padding: "10" }}
                displayEmpty
                value={addnewField}
                name="addnewField"
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return `Please Select`;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {newFieldType.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, addnewField, theme)}
                  >
                    {name.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {numericShow ? (
              <FormControl
                sx={{ mb: 1, width: "calc(50% - 5em)", mt: 1, ml: "32px" }}
              >
                <Label>Numeric FOrmat</Label>
                <Select
                  name="numericFormate"
                  className={classes.root}
                  style={{ padding: "10" }}
                  displayEmpty
                  value={numericFormat}
                  name="numericFormat"
                  onChange={onChangeNumeric}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return `Please Select`;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {numericFormatType.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, numericFormat, theme)}
                    >
                      {name.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}

            {dropdownTypeShow ? (
              <FormControl
                sx={{
                  mb: 1,
                  mt: 1,
                  width: "calc(50% - 5em)",
                  mt: 1,
                  ml: "32px",
                }}
              >
                <Label>Existing/New Dropdown Options</Label>
                <Select
                  className={classes.root}
                  style={{ padding: "10" }}
                  displayEmpty
                  value={dropdownFormat}
                  name="dropdownFormat"
                  onChange={onChangeDropdown}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return `Please Select`;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {DropdownOption.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, dropdownFormat, theme)}
                    >
                      {name.description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}

            {newDropdown ? (
              <FormControl sx={{ mb: 1, width: "calc(50% - 5em)", mt: 1 }}>
                <Label> Dropdown Options</Label>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  value={newNameDescription}
                  name="newNameDescription"
                  onChange={onChangeNewDesc}
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                >
                  {newNameOption.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, newNameDescription, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}

            <FormControl
              sx={{ mb: 1, width: "calc(50% - 5em)", mt: 1, ml: "38px" }}
            >
              <Label>Required</Label>
              <Select
                className={classes.root}
                style={{ padding: "10" }}
                displayEmpty
                value={requiredValue}
                name="requiredValue"
                onChange={onChangeRequired}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return `Please Select`;
                  }

                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                {requiredOptions.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, requiredValue, theme)}
                  >
                    {name.Text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="text"
              className="btn btn-link"
              type="button"
              onClick={() => handleAddFields()}
              style={{ marginTop: "5px" }}
            >
              Add MORE
            </Button>
          </Fragment>
        ))}
      </FormGroup>
    </div>
  );
}

export default AddNewFieldModal;
