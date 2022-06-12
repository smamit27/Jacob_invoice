import {
  Table, TableBody, TableContainer, TableHead,
  TableRow, Paper, Modal, TableCell, tableCellClasses, Box, styled, Button, Stack, Slider, Grid, FormControlLabel, Radio, RadioGroup
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  backDropLoaderCloseAction,
  backDropLoaderOpenAction,
} from "../BackDropLoader/logic";
import { Icon } from '../../atoms';
import { saveTaskNumberNameAction, saveQuickTaskMappingTableResetAction } from './logic'
import { formSaveDataTaskGrouping } from './constants'

function ByTaskNameGroup({ open = false, onClose = () => null }) {
  const classes = useStyles();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const getTaskMappingProjectList = useSelector(({ common }) => common.sharedTaskMappingProjectList);
  const [rowsData, setRowsData] = useState(getTaskMappingProjectList || []);
  const selectedRows = useRef([]);
  const { loading, error: saveError, data, flag: saveFlag } = useSelector(state => state.saveTaskNumberNameReducer)
  const collectionId = useSelector((state) => state.getCollectionId);
  const [taskNumber, setTaskNumber] = useState('')
  const [taskNameContain, setTaskNameContain] = useState('')
  const [mapTo, setMapTo] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [tableRowGrid,setTableRowGrid] = useState(true)


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
  const onSave = () => {
    dispatch(backDropLoaderOpenAction());
    
    const request = {
      CollectionID: collectionId,
      SearchNameFirst: taskNumber,
      SearchNameEnd: taskNameContain,
      ReplaceName: mapTo,
      OverrideFlag: 'N',
      TaskLevel: 'N'
    }
    const payload = {
      data: formSaveDataTaskGrouping(selectedRows?.current.filter(d => d.IS_OVERRIDE)),
      params: request
    }
    dispatch(saveTaskNumberNameAction(payload));
  };

  const onSubmit = (task) => {
    setDisabled(false)
    setTaskNumber(task.TASK_NUMBER)
    setTaskNameContain(task.LONG_TASK_NAME)
    setMapTo(task.TASK_MAP_TO)
    setTableRowGrid(false)
    const setProjectList = getTaskMappingProjectList.map(item => {
      const selectedRow = { ...item };
      selectedRow.IS_OVERRIDE = false
      if (task.TASK_NUMBER === "" && (item.LONG_TASK_NAME?.toLowerCase()?.includes(task.LONG_TASK_NAME?.toLowerCase()) && task.LONG_TASK_NAME !== "")) {
        selectedRow.CLIENT_TASK_GROUP_NAME = task.TASK_MAP_TO;
        selectedRow.IS_OVERRIDE = true
      }
      else if ((item.TASK_NUMBER?.toLowerCase()?.includes(task.TASK_NUMBER?.toLowerCase()) && task.TASK_NUMBER !== "") && task.LONG_TASK_NAME === "") {
        selectedRow.CLIENT_TASK_GROUP_NAME = task.TASK_MAP_TO;
        selectedRow.IS_OVERRIDE = true
      }
      else if ((item.TASK_NUMBER?.toLowerCase()?.includes(task.TASK_NUMBER?.toLowerCase()) && task.TASK_NUMBER !== "") || (item.LONG_TASK_NAME?.toLowerCase()?.includes(task.LONG_TASK_NAME?.toLowerCase()) && task.LONG_TASK_NAME !== "")) {
        selectedRow.CLIENT_TASK_GROUP_NAME = task.TASK_MAP_TO;
        selectedRow.IS_OVERRIDE = true
      }
      return selectedRow;

    });
    selectedRows.current = setProjectList
    setRowsData(setProjectList);
  };
  const clearAll = () => {
    reset({
      TASK_NUMBER: "",
      LONG_TASK_NAME: "",
      TASK_MAP_TO: ""
    })
    setDisabled(true)
    setTaskNumber('')
    setTaskNameContain('')
    setMapTo('')
    setTableRowGrid(true)

  }
  const dissabledMapTo = (!taskNumber && !taskNameContain) || !mapTo

  return (
    <Modal onClose={onClose} open={open}>
      <Box sx={style} className="quickTaskcharModal">
        <Header >
        <HeaderTitle data-testid="quick-task-grouping-number-name">
            Quick Task Grouping - By Number/Name Contains
          </HeaderTitle>
          <div onClick={onClose}>
            <Icon name="close" />
          </div>
        </Header>
        <Grid container>
          <Grid item xs={12} lg={4} p={3} className={classes.borderListCollection}>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} mt={2}>
                <Label>Task Number Contains</Label>
                <Input {...register("TASK_NUMBER", { 
                        onChange: (e) =>setTaskNumber(e.target.value) 
                      })} placeholder="Enter here"/>
              </Grid>
              <Grid item xs={12} mt={2}>
                <Label>Task Name Contains</Label>
                <Input {...register("LONG_TASK_NAME", {
                  onChange: (e) => setTaskNameContain(e.target.value)
                })} placeholder="Enter here" />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Label>Map to</Label>
                <Input {...register("TASK_MAP_TO", { 
                        onChange: (e) =>setMapTo(e.target.value) 
                      })} placeholder="Enter here" />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Button type="submit" variant="contained" disabled={dissabledMapTo}>Group Tasks</Button>
                <Button style={{ textDecoration: "underline" }} onClick={clearAll}>Clear All</Button>

              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} lg={8} p={3}>
            <Grid item xs={12} className="groupingTaskContainer">
              <Label>Grouping of Tasks ({rowsData.length})</Label>
              {rowsData.length > 0 && (
                <TableContent>
                  <TableContainer className='no-boxshadow' component={Paper}>
                    <Table
                      aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Task Number Current</StyledTableCell>
                          <StyledTableCell>
                            LONG TASK NAME CURRENT
                          </StyledTableCell>
                          {/* <StyledTableCell>Task group Current</StyledTableCell> */}
                          <StyledTableCell>Task Group Mapped</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowsData.map((row) => (
                          <StyledTableRow key={row.TASK_ID}>
                            <StyledTableCell component="th" scope="row">
                              {row.TASK_NUMBER}
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              {row.LONG_TASK_NAME}
                            </StyledTableCell>
                            {/* <StyledTableCell align="left">{row.TASK_NUMBER_OVERRIDE}</StyledTableCell> */}
                            <StyledTableCell align="left">{tableRowGrid ? '-': row.CLIENT_TASK_GROUP_NAME}</StyledTableCell>

                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableContent>
              )}
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

export default ByTaskNameGroup;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "80%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FDFDFD",
  boxShadow: 24,
  borderRadius: "6px",
  height: '98vh'
};

const Header = styled("div")({
  padding: "1.2em 1.5em",
  // background: '#555555',
  // color: '#fff',
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
  height: "calc(85vh - 112px - 3em)",
  overflow: "auto",
});

const Label = styled("label")({
  fontSize: "14px",
  lineHeight: "24px",
  marginBottom: "10px",
  fontWeight: 400,
});
const Input = styled("input")({
  marginTop: 5,
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  height: "40px",
  width: "100%",
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
    borderRight: "1px solid #EEEEEE",
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