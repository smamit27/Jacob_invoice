import { Table,TableBody,TableCellModal,TableContainer,TableHead,
  TableRow,Paper,Modal,TableCell,tableCellClasses, Box, styled, Button, Stack, Slider,Grid,FormControlLabel,Radio,RadioGroup } from "@mui/material";

import { makeStyles } from "@mui/styles";
import React, { useState, useEffect,useRef } from "react";
import {saveQuickTaskMappingAction,saveQuickTaskMappingTableResetAction } from './logic'
import { Icon } from '../../atoms';
import { useDispatch, useSelector } from "react-redux";
import {
  backDropLoaderCloseAction,
  backDropLoaderOpenAction,
} from "../BackDropLoader/logic";
import {formSaveDataNumberTaskMapping} from  './constants';

function ByNamingOfCharacters({ open = false, onClose = () => null }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [group, setGroup] = useState({
    MAP_ALL: "Y",
  });
  const {  error:saveError,  flag:saveFlag } = useSelector(state=>state.saveQuickTaskMappingTableReducer)
  const collectionId = useSelector((state) => state.getCollectionId);
  const  getTaskMappingProjectList  = useSelector(({ common }) => common.sharedTaskMappingProjectList);
  const [range, setRange] = useState([1, 27]);
  const [rowsData, setRowsData] = useState(getTaskMappingProjectList || [])
  const [showRadioGroup,setShowRadioGroup] = useState(false)
  const [isChecked,setIsChecked] = useState(0)
  const [disabled,setDisabled] = useState(true)
  const [tableRowGrid,setTableRowGrid] = useState(true)
  const selectedRows = useRef([]);
  const singleRow =useRef([]);

    useEffect(() => {
      if (saveFlag ) {
        dispatch(backDropLoaderCloseAction())
        onClose()
    }
    return ()=>{
      dispatch(saveQuickTaskMappingTableResetAction())
    }
    }, [saveFlag])
    useEffect(() => {
      if (saveError) {
        dispatch(backDropLoaderCloseAction())
        onClose()
      }
      return ()=>{
        dispatch(saveQuickTaskMappingTableResetAction())
      }
    }, [saveError])

 
    const handleChange = (event, newValue) => { 
      setRange(newValue);
      setDisabled(false)
      handlerTable(newValue)
      setTableRowGrid(false)
    };
    const handlerTable = (newValue) =>{
      if(group.MAP_ALL === 'Y') {
        const setProjectList =  getTaskMappingProjectList.map(item => {
        const selectedRow = {...item};
        selectedRow.TASK_NUMBER_OVERRIDE= selectedRow.TASK_NUMBER.slice(newValue['0']-1,newValue["1"]);
        return selectedRow;
      });
      setRowsData(setProjectList);  
      selectedRows.current = setProjectList

      } else {       
        const setProjectList=  getTaskMappingProjectList.map((item,index) => {
        const selectedRow = {...item};
        if(isChecked === index){
          selectedRow.TASK_NUMBER_OVERRIDE= selectedRow.TASK_NUMBER?.slice(newValue['0']-1,newValue["1"]);
          singleRow.current = selectedRow
        }            
        return selectedRow;         
      });
      setRowsData(setProjectList); 
      selectedRows.current = setProjectList

      }     
    }
  
  const handleCollectionChange = (event) => {
    setShowRadioGroup(false)
    event.preventDefault();
    const { name, value } = event.target;
    if (value === "N"  ) {
      setShowRadioGroup(true);
      setRange([1,27])
      setIsChecked(0)
      setRowsData(getTaskMappingProjectList)
    } else if(value === "Y") {
      setRowsData(getTaskMappingProjectList)

      setShowRadioGroup(false);
      setRange([1,27])
    }
    setGroup({ ...group, [name]: value });
  };
  const handleChangeRadio = (index) =>{
    setIsChecked(index)
  }
  const onSave = () => {
    dispatch(backDropLoaderOpenAction());
    const request = {
      CollectionID: collectionId,
      StartRange: range["0"],
      EndRange: range["1"],
      OverrideFlag:'N',
      TaskLevel: 'Y'
    }
    if(group.MAP_ALL === 'Y'){      
      const payload = {
        data: formSaveDataNumberTaskMapping(selectedRows?.current,'Y'),
        params: request
      }
      dispatch(saveQuickTaskMappingAction(payload))
    } else {
      const singleValueSelected = singleRow?.current
      const payload = {
        data: formSaveDataNumberTaskMapping([singleValueSelected],'Y'),
        params: request
      }      
      dispatch(saveQuickTaskMappingAction(payload))
    }       
  };
  

  return (
    <Modal onClose={onClose} open={open} >
      <Box sx={style} className="quickTaskcharModal">
        <Header >
          <HeaderTitle data-testid="quick-task-mapping-name">
            Quick Task Mapping - By Number of Characters
          </HeaderTitle>
          <div onClick={onClose}>
              <Icon name="close" />
          </div>
        </Header>
        <Grid container >
          <Grid  xs={12} lg={4} p={3} className={classes.borderListCollection}>
            <Grid item xs={12} className="radioGroupText">
              <Label>How do you want to quick map tasks?</Label>
              <RadioGroup
                column
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
            <Grid item xs={12} mt={2}>
              <Label>Slide to choose character count start and end</Label>
              <Grid mt={1}>
                <Box sx={{ width: 250 }}>
                  <Stack spacing={2} direction="row">
                    <Label >{range["0"]}</Label> 
                      <Slider
                        value={range}
                        onChange={handleChange}
                        min={1}
                        max={27}
                        defaultValue={10}/>
                      <Label>{range["1"]}</Label>
                </Stack>   
                <Stack spacing={2} direction="row" justifyContent="space-between">
                  <Label>Character Count Start</Label>
                  <Label>Character Count End</Label>
                </Stack>            
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={8} p={3}>
            <Grid item xs={12}>
              <Label>
              Preview mapping of tasks ({rowsData.length})

              </Label>
              <TableContent>
    <TableContainer className='no-boxshadow' component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>{ showRadioGroup && (<StyledTableCell>Select</StyledTableCell>)}
         
            <StyledTableCell>Task Number Current</StyledTableCell>
            <StyledTableCell align="left">Task Number Mapped</StyledTableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((row,index) => (
            <StyledTableRow key={row.TASK_ID} className="previewTaskTable">
              {showRadioGroup && (<StyledTableCell style={{ padding: '8px 12px' }} component="th" scope="row">
              <Radio
               checked={isChecked === index? true: false}
                onChange={(event) => handleChangeRadio(index,event)}
                value="a"
                name="radio-buttons"
                sx={{ p: 0 }}
              />
              </StyledTableCell>)}
              <StyledTableCell component="th" scope="row">
                {row.TASK_NUMBER}
              </StyledTableCell>
              <StyledTableCell align="left">{tableRowGrid ? '-': row.TASK_NUMBER_OVERRIDE}</StyledTableCell>
            
             
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

export default ByNamingOfCharacters;

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
  borderListClient: {
  },
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


