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
import { Icon } from '../../atoms'
import { getEmployeesDetails } from '../../../redux/api/action'
import { projectManagerName } from '../../../redux/common/action'
import Label from '../../atoms/Label';

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle style={{ color: '#222222', fontWeight: 700 }} sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};

function SearchProjectManagerModal(props) {
  const {setOpen} = props;
  const [searchData, setSearchData] = useState(false);
  const [displayEmployee, setDisplayEmployee] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState({
    'EMPLOYEE_EMAIL': "",
    'EMPLOYEE_LOCATION': "",
    'EMPLOYEE_NAME': "",
    'EMPLOYEE_NUMBER': ""
  });

  const [empList, setEmpList] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const dispatch = useDispatch()
  const { employeeList } = useSelector(({ api }) => api);

  const handleSearch = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setSelectedEmployee({
      ...selectedEmployee,
      [name]: value,
    });

  };
  const handleSearchBtn = (props) => {
    setSearchData(false)
    for (let key in selectedEmployee) {
      if (selectedEmployee[key] !== "")
        dispatch(getEmployeesDetails(selectedEmployee,'project'))
        setEmpList(true);  
    }  
    return false; 
  }
  const handleEmployeeList = (emp) => {
    setEmpList(false);
    setDisplayEmployee(emp)
    setSearchData(true)
    dispatch(projectManagerName(emp))

  }
  const toggleSearchbtn = () => {
    setToggleSearch(!toggleSearch);

  }
  const deleteEmployee = () => {
    setSearchData(false)
    dispatch(projectManagerName(""))

  }
  const handleSelect = () =>{
    setOpen(false)
  }
  const handleClose =() =>{
    dispatch(projectManagerName(""));
    setOpen(false)

  } 
  return (
    <>
      <BootstrapDialogTitle id="customized-dialog-title">
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Label  variant="body1" pt={1} pl={1} style={{ color: "#222222",fontSize:"14px",fontWeight: "400",fontFamily: "Jacobs Chronos bold",paddingLeft:'10px' }} data-testid="select-program-manager">Select Program Manager</Label>
          <div onClick={handleClose}>
            <Icon name="close" />
          </div>
        </Box>
      </BootstrapDialogTitle>
      <DialogContent dividers style={{minHeight: '384px',height: 'auto',Width: '676px', maxHeight:'none',maxWidth:'none'}}>

        <Grid item xs={12} className="searchEmployeeField">
          {toggleSearch ? (
            <Grid container item xs={12} >

              <Grid item xs={6} mb={2}>
                <Label variant="subtitle1"> Search employee name</Label>

                <Input name="EMPLOYEE_NAME" value={selectedEmployee.EMPLOYEE_NAME} type="text" onChange={handleSearch} placeholder="Please search" />
              </Grid>
              <Grid item xs={6} mb={2}>
                <Label variant="subtitle1">Search employee number</Label>

                <Input name="EMPLOYEE_NUMBER" value={selectedEmployee.EMPLOYEE_NUMBER} type="text" onChange={handleSearch} placeholder="Please search" />
              </Grid>
              <Grid item xs={6} mb={2}>
                <Label variant="subtitle1"> Search email address</Label>

                <Input name="EMPLOYEE_EMAIL" value={selectedEmployee.EMPLOYEE_EMAIL} type="text" onChange={handleSearch} placeholder="Please search" />
              </Grid>
              <Grid item xs={6} mb={2}>
                <Label variant="subtitle1"> Search HR location</Label>

                <Input name="EMPLOYEE_LOCATION" value={selectedEmployee.EMPLOYEE_LOCATION} type="text" onChange={handleSearch} placeholder="Please search" />
              </Grid>
              <Grid item xs={6} mb={2}>
                  <Button variant="contained"   disabled={selectedEmployee.EMPLOYEE_NAME === '' && selectedEmployee.EMPLOYEE_EMAIL == "" && selectedEmployee.EMPLOYEE_LOCATION == '' && selectedEmployee.EMPLOYEE_NUMBER == '' }  onClick={handleSearchBtn}>Search</Button>
             </Grid>
            </Grid>
          ) : (
            <>
              <Label variant="subtitle1" style={{paddingLeft:'4px'}}> Search employee</Label>
              <Grid container item xs={12} mb={3}>

                <Grid item xs={6}>
                  <Input name="EMPLOYEE_NAME"  value={selectedEmployee.EMPLOYEE_NAME} type="text" onChange={handleSearch} placeholder="Please search" />

                </Grid>
                <Grid item xs={6} style={{paddingLeft:'4px'}}>
                    <Button variant="contained"  disabled={selectedEmployee.EMPLOYEE_NAME === ''} onClick={handleSearchBtn}>Search</Button>
                 </Grid>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <BootstrapButton  onClick={toggleSearchbtn} style={{paddingLeft:'4px'}}>{toggleSearch ? 'Basic Search' : 'Advanced Search'}</BootstrapButton >
          </Grid>
          {empList && employeeList.length > 0 && (
            <Grid container item xs={12} mb={3}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 900 }} aria-label="customized table">
                  <TableBody>
                    {employeeList.map((emp) => (
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
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Employee Number</StyledTableCell>
                      <StyledTableCell align="right">Email Address</StyledTableCell>
                      <StyledTableCell align="right">HR Location</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <StyledTableRow key={displayEmployee.EMPLOYEE_NAME}>
                      <StyledTableCell component="th" scope="row">
                      <DeleteCell onClick={deleteEmployee}><Icon name="close" /></DeleteCell>
                      </StyledTableCell>
                      <StyledTableCell align="left"> {displayEmployee.EMPLOYEE_NAME} </StyledTableCell>

                      <StyledTableCell align="right">{displayEmployee.EMPLOYEE_NUMBER}</StyledTableCell>
                      <StyledTableCell align="right">{displayEmployee.EMPLOYEE_EMAIL}</StyledTableCell>
                      <StyledTableCell align="right">{displayEmployee.EMPLOYEE_LOCATION}</StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
      <Footer>
            <Grid container spacing={3} flexWrap="wrap">
                <Grid item alignSelf="flex-end" >
                    <Stack spacing={2} direction="row" >
                      <Button  onClick={handleClose}>Cancel</Button>
                      <Button variant="contained" disabled={!searchData} pr={1} onClick={handleSelect}>Select</Button>
                    </Stack>
                  </Grid>
            </Grid>
      </Footer>
        </DialogActions>
    </>
  )
}

export default SearchProjectManagerModal

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

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  textDecoration: 'underline',
  fontSize: '14px',
  fontWeight: 400,
  padding: '0px',
  border: 'none',
  lineHeight: 1.5,
  backgroundColor: 'transparent',
  borderColor: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
    textDecoration: 'underline'
  }
});
const Input = styled("input")`
  padding: 10px;
  border: 1px solid #D2D2D2;
  width: 100%;
  border-radius: 5px;
  height: 40px;
`;