import { Table,TableBody,TableContainer,TableHead,
  TableRow,Paper,Checkbox,FormGroup,FormControl,Modal,TableCell,tableCellClasses, Box, styled, Button, Stack, Slider,Grid,FormControlLabel,Radio,RadioGroup } from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useRef } from "react";
import {
  saveQuickTaskMappingTableResetAction,saveQuickTaskMappingAction
} from "./logic";

import { useDispatch, useSelector } from "react-redux";
import useIntialSelector from "../../../hooks/useIntialSelctor";
import {
  backDropLoaderCloseAction,
  backDropLoaderOpenAction,
} from "../BackDropLoader/logic";
import {formSaveDataTaskMapping} from  './constants'
import { Icon } from '../../atoms';


function ByTaskLevel({ open = false, onClose = () => null }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [group, setGroup] = useState({
    MAP_ALL: "Y",
  });
 
  const { error:saveError, data, flag:saveFlag } = useSelector(state=>state.saveQuickTaskMappingTableReducer)
  const collectionId = useSelector((state) => state.getCollectionId);
  const [range, setRange] = useState([1, 13]);
  const [rowsData, setRowsData] = useState([]);
  const [isCheckboxChecked,setIsCheckboxChecked] = useState(false)
  const [showRadioGroup, setShowRadioGroup] = useState(false);
  const [isChecked, setIsChecked] = useState(0);
  const [disabled,setDisabled] = useState(true)
  const [disabledMapTo,setDisabledMapTo] = useState(true)
  const [tableRowGrid,setTableRowGrid] = useState(true)
  const selectedRows = useRef([]);
  const singleRow = useRef([]);
  const getTaskMappingProjectList = useSelector(
    ({ common }) => common.sharedTaskMappingProjectList
  );
  
  useEffect(()=>{
    setRowsData(getTaskMappingProjectList);

  },[])

  useEffect(() => {
    if (saveFlag) {
      dispatch(saveQuickTaskMappingTableResetAction());
      dispatch(backDropLoaderCloseAction());
      onClose();

    }
  }, [saveFlag]);
  useEffect(() => {
    if (saveError) {
      dispatch(backDropLoaderCloseAction());
    }
  }, [saveError]);
  const handeCheckboxChange = (event) =>{
    setDisabledMapTo(true)
    const { name, checked } = event.target;
    if(checked){
      setDisabledMapTo(false)
    }
    setIsCheckboxChecked(checked)
   }
  const handleChange = (event, newValue) => {
    setRange(newValue);
    setDisabledMapTo(false)
  };
  const handlerTable = () => {
    setDisabled(false)
    if (group.MAP_ALL === "Y") {   
        const setProjectList = rowsData.map((item) => {
          item.TASK_NUMBER_OVERRIDE_MAPPED = '';

          const selectedRow = { ...item };
          const taskNumber = selectedRow.TASK_NUMBER;
          const taskNumberOverride = selectedRow.TASK_NUMBER_OVERRIDE
          const getTaskNumberValue = handlerTaskNumberList(taskNumber,taskNumberOverride) 
          selectedRow.TASK_NUMBER_OVERRIDE_MAPPED = isCheckboxChecked ? getTaskNumberValue.replace(/-/g, "."): getTaskNumberValue;
          return selectedRow;
        })
        setRowsData(setProjectList);
        selectedRows.current = setProjectList;
        setTableRowGrid(false)
      }
     else {
      const setProjectList = rowsData.map((item, index) => {
        item.TASK_NUMBER_OVERRIDE_MAPPED = '';

        const selectedRow = { ...item };
        if (isChecked === index ) {
          const taskNumber = selectedRow.TASK_NUMBER;
          const taskNumberOverride = selectedRow.TASK_NUMBER_OVERRIDE
          const getTaskNumberValue = handlerTaskNumberList(taskNumber,taskNumberOverride) 
          selectedRow.TASK_NUMBER_OVERRIDE_MAPPED = isCheckboxChecked ? getTaskNumberValue.replace(/-/g, "."): getTaskNumberValue;
          singleRow.current = selectedRow;
          return selectedRow;
        }
        else {
           return selectedRow;  
        }

      });
      setRowsData(setProjectList);
      selectedRows.current = setProjectList;
      setTableRowGrid(false)
    }
  };
  const handlerTaskNumberList =(taskNumber,taskNumberOverride) =>{
    let firstIndex= 0;
    let lastIndex = 0;
    let from = range["0"]
    let to  = range["1"]
    let count = 0
    for(let i = 0; i< taskNumber.length;i++){
      if(taskNumber[i] === '.' || taskNumber[i] === '-'){
            count++      
            if(count === from){
              let temp = taskNumber.replace(/-/g, ".")
              firstIndex = i-temp.split('.')[from-1].length
            } else if(count < from){  firstIndex = i+1 }
            if(count === to){ lastIndex = i }
            else if(count <= to){lastIndex = taskNumber.length }            
        }      
      }
      const updatedTaskNumber = (firstIndex === 0 && lastIndex === 0) ? taskNumber : taskNumber.substring(firstIndex, lastIndex);
      let getTaskNumberValue;
       if(count+1 < from && count !== 0) {
         getTaskNumberValue = taskNumberOverride
      } else if(count+1 < from && count == 0){
        getTaskNumberValue = taskNumberOverride
      } else {
        getTaskNumberValue = updatedTaskNumber
      }
      return getTaskNumberValue
      
  }
  const handleCollectionChange = (event) => {
    setShowRadioGroup(false);
    event.preventDefault();
    const { name, value } = event.target;
    if (value === "N") {
      setShowRadioGroup(true);
      setRange([1, 13]);
      setIsChecked(0);
      setTableRowGrid(true)
      setIsCheckboxChecked(false)
      setRowsData(rowsData);
      setDisabledMapTo(true)
      setDisabled(true)

    } else if (value === "Y") {
      setRowsData(rowsData);
      setShowRadioGroup(false);
      setRange([1, 13]);
      setTableRowGrid(true)
      setIsCheckboxChecked(false)
      setDisabledMapTo(true)
      setDisabled(true)
    }
    setGroup({ ...group, [name]: value });
  };
  const handleChangeRadio = (index) => {
    setIsChecked(index);
  };
  const onSave = () => {
    dispatch(backDropLoaderOpenAction());
    const request = {
      CollectionID: collectionId,
      StartRange: range["0"],
      EndRange: range["1"],
      OverrideFlag: isCheckboxChecked ?'Y': 'N',
      TaskLevel: 'Y'
    }
    if(group.MAP_ALL === 'Y'){      
    const payload = {
      data: formSaveDataTaskMapping(selectedRows?.current,'Y'),
      params: request
    }
    dispatch(saveQuickTaskMappingAction(payload))
    } else {
      const singleValueSelected = singleRow?.current
      const payload = {
        data: formSaveDataTaskMapping([singleValueSelected],'Y'),
        params: request
      }      
      dispatch(saveQuickTaskMappingAction(payload))
    }  
   
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Box sx={style} className="quickTaskcharModal">
        <Header >
          <HeaderTitle data-testid="quick-task-mapping-level">
            Quick Task Mapping - By Level
          </HeaderTitle>
          <div onClick={onClose}>
              <Icon name="close" />
          </div>
        </Header>
        <Grid container>
          <Grid item xs={12} lg={4} p={2} className={classes.borderListCollection}>
            <Grid item xs={12} className="radioGroupText1">
              <Label>How do you want to quick map tasks?</Label>
              <RadioGroup
                name="MAP_ALL"
                value={group.MAP_ALL}
                onChange={handleCollectionChange}
              >
                <FormControlLabel
                  value="Y"
                  control={<Radio />}
                  label="Map all tasks at once"
                />
                <FormControlLabel
                  value="N"
                  control={<Radio />}
                  label="Map tasks individually"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} mt={3} className="taskLevelBox2">
              <Label class>Slide to choose character count start and end</Label>
              <Grid mt={3}>
                <Box sx={{ width: 250 }} pl={2}>
                <Stack spacing={2} direction="row">
                <Label >{range["0"]}</Label> 
                  <Slider
                    value={range}
                    onChange={handleChange}
                    min={1}
                    max={13}
                    defaultValue={10}
                  />
                  <Label>{range["1"]}</Label>
                </Stack>
                <Stack spacing={2} direction="row" justifyContent="space-between">
                  <Label>Task level start</Label>
                  <Label>Task level end</Label>
                </Stack>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={3}>
              <Label className="overrideCharacterText">Special Character Override</Label>
              <Grid >
                <Box className="quickOverrideDashText">                  
                  <FormControl component="fieldset">
                    <FormGroup>
                    <FormControlLabel
                        control={<Checkbox />}
                        onChange={handeCheckboxChange}
                        checked={isCheckboxChecked}
                        label="Override dash (-) to a period (.)"
                        labelPlacement="end"
                      />
                  </FormGroup>
                </FormControl>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
                <Button onClick={handlerTable} disabled={disabledMapTo} type="submit" variant="contained" className="mapTaskBtn">
                Map Tasks
                </Button>
            </Grid>
          </Grid>
          <Grid item lg={8} p={3}>
            <Grid  xs={12}>
              <Label>Preview mapping of tasks ({rowsData.length})</Label>
              <TableContent>
                <TableContainer className='no-boxshadow' component={Paper}>
                  <Table
                    aria-label="customized table"
                  >
                    <TableHead>
                      <TableRow>
                        {showRadioGroup && (
                          <StyledTableCell>Select</StyledTableCell>
                        )}

                        <StyledTableCell>Task Number</StyledTableCell>
                       <StyledTableCell>Task Number Overrides Current</StyledTableCell>
                        <StyledTableCell align="left">
                        Task Number Overrides Mapped
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowsData.map((row, index) => (
                        <StyledTableRow key={row.TASK_ID}>
                          {showRadioGroup && (
                            <StyledTableCell style={{ padding: '8px 12px' }} component="th" scope="row">
                              <Radio
                                checked={isChecked === index ? true : false}
                                onChange={(event) =>
                                  handleChangeRadio(index, event)
                                }
                                value="a"
                                name="radio-buttons"
                                sx={{ p: 0 }}
                              />
                            </StyledTableCell>
                          )}
                          <StyledTableCell component="th" scope="row">
                            {row.TASK_NUMBER}
                          </StyledTableCell>
                          <StyledTableCell align="left">{row.TASK_NUMBER_OVERRIDE}</StyledTableCell>
                          <StyledTableCell align="left">{tableRowGrid ? '-': row.TASK_NUMBER_OVERRIDE_MAPPED}</StyledTableCell>

                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableContent>
            </Grid>
          </Grid>
        </Grid>

        <Footer className="quickTaskFooter">
          <Stack
            width="100%"
            spacing={2}
            direction="row"
            justifyContent="flex-end"
          >
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSave} disabled={disabled} variant="contained">
              Save
            </Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  );
}

export default ByTaskLevel;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "80%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FDFDFD",
  boxShadow: 24,
  borderRadius: "6px",
};

const Header = styled("div")({
  padding: "1.2em 1.5em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 60,
  borderTopLeftRadius: "6px",
  borderTopRightRadius: "6px",
  borderBottom: "1px solid #EBEBEB",
  width: "100%",
});

const HeaderTitle = styled('div')({
  color: '#222222',
  fontWeight: '800',
  fontSize: '14px',
  lineHeight: '24px',
  fontFamily: " Jacobs Chronos Bold"
})

const Footer = styled("div")({
  padding: "1.2em 1.5em",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  height: 70,
  borderBottomLeftRadius: "6px",
  borderBottomRightRadius: "6px",
  borderTop: "1px solid #E1E1E1",
  width: "100%",
});

const TableContent = styled("div")({
  height: "calc(85vh - 80px - 3em)",
  overflow: "auto",
});

const Label = styled("label")({
  fontSize: "14px",
  lineHeight: "24px",
  marginBottom: "10px",
  fontWeight: 400,
});

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      color: "#777777",
      padding: "8px",
      minHeight: "40",
    },
  },
  borderListCollection: {
    borderRight: "1px solid #EEEEEE !important",
  },
  borderListClient: {},
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    color: "#222222",
    textTransform:"uppercase",
    fontSize:12
  
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize:12,
    padding:12
  },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      height:40,
      backgroundColor: '#F8F8FE'
    },
    "&:nth-of-type(even)": {
      height:40,
      backgroundColor: '#EDEDFC'
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

