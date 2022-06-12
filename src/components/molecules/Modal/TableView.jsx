import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Stack, Box, Typography,DialogActions,DialogContent,DialogTitle} from '@mui/material'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Input, Icon } from '../../atoms'
import { colors } from "../../../theme";
import { getEmployeesDetails } from '../../../redux/api/action'
import { projectManagerName } from '../../../redux/common/action'

const DeleteCell = styled('span')`
  float:left;
  margin-right:10px;
`;
const EmployeeCell = styled('span')`
  float:left;
  margin-right:10px;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.transparent,
    color: "#222222"
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Footer = styled("div")`
display: flex;
align-items: flex-end;
justify-content: flex-end;
`;
function TableView(props) {
  const {searchList} = props;
  const handleSearch = (event) => {
    event.preventDefault();
   
  };
  const handleSearchBtn = (props) => {
    //setSearchData(false)
   
  }
  const handleEmployeeList = (emp) => {
    // setEmpList(false);
    // setdisplaySearchList(emp)
    // setSearchData(true)
    // dispatch(projectManagerName(emp))

  }
  const toggleSearchbtn = () => {
   // setToggleSearch(!toggleSearch);

  }
  const deleteEmployee = () => {
    // setSearchData(false)
    // dispatch(projectManagerName(""))

  }

  return (
    <>  
          
    {searchList && searchList.length > 0 && (
            <Grid container item xs={12} mb={3}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableBody>
                    {searchList.map((emp) => (
                      <StyledTableRow key={emp.EMPLOYEE_NUMBER} onClick={() =>handleEmployeeList(emp)}>
                        <StyledTableCell component="th" scope="row">
                          {emp.EMPLOYEE_NAME}
                        </StyledTableCell>
                        <StyledTableCell align="right">{emp.EMPLOYEE_NUMBER}</StyledTableCell>
                        <StyledTableCell align="right">{emp.EMPLOYEE_EMAIL}</StyledTableCell>
                        <StyledTableCell align="right">{emp.EMPLOYEE_LOCATION}</StyledTableCell>

                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
          {searchData && (
            <Grid item x={12} mt={3}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                    <StyledTableCell></StyledTableCell>
                      <StyledTableCell>Project #</StyledTableCell>
                      <StyledTableCell align="right">Project  name</StyledTableCell>
                      <StyledTableCell align="right">Status</StyledTableCell>
                      <StyledTableCell align="right">My role</StyledTableCell>
                      <StyledTableCell align="right">Client</StyledTableCell>
                      <StyledTableCell align="right">Contract type</StyledTableCell>
                      <StyledTableCell align="right">Alliance Code</StyledTableCell>                   


                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {displaySearchList.map((project) => (
                      <StyledTableRow key={project.EMPLOYEE_NAME}>
                      <StyledTableCell component="th" scope="row">
                        <DeleteCell onClick={deleteEmployee}><Icon name="close" /></DeleteCell>
                      </StyledTableCell>
                      <StyledTableCell align="left"> {project.EMPLOYEE_NAME} </StyledTableCell>

                      <StyledTableCell align="right">{project.EMPLOYEE_NUMBER}</StyledTableCell>
                      <StyledTableCell align="right">{project.EMPLOYEE_EMAIL}</StyledTableCell>
                      <StyledTableCell align="right">{project.EMPLOYEE_LOCATION}</StyledTableCell>
                    </StyledTableRow>

                  ))}
                    
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
    </>
  )
}

export default TableView
