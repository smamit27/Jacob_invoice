import {
    Modal, Box, styled, Button, Stack, Grid, Select, FormControl,
    MenuItem, Checkbox, OutlinedInput,TextField, ListItemText, InputLabel,Autocomplete, ListItemIcon, IconButton
} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useIntialSelector from '../../../hooks/useIntialSelctor';
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAdvancedAction,advancedSearchIdAction,getProjectInvoiceOverviewAction,searchAdvancedResetAction} from './logic'
import {
    backDropLoaderCloseAction,
    backDropLoaderOpenAction,
} from "../BackDropLoader/logic";
import { format, } from 'date-fns';
import EmployeeNumberAutoComplete from './EmployeeNumberAutoComplete'
import ProjectGroupAutoComplete from "./ProjectGroupAutoComplete";
import ProjectNumberAutoComplete from "./ProjectNumberAutoComplete";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function AdvancedSearch({ open = false, onClose = () => null, mode, original }) {
    const dispatch = useDispatch()
    const collectionId = useSelector(state => state.getCollectionId)
    const {data: searchId=[]} =useSelector(state => state.advancedSearchIdReducer)
    const { data: oracleInvoiceStatus = [] } = useSelector(state => state.oracleInvoiceStatusReducer)
    const { data: powerInvoiceOptions = [] } = useSelector(state => state.powerInvoicePeriodReducer)
    const { data: keyRoleOptions = [] } = useSelector(state => state.getRoleListReducer)
    const {flag: saveAdvanceSearchFlag,error: saveAdvanceSearchError} = useSelector(state=> state.searchAdvancedReducer)
    const [selected, setSelected] = useState([]);
    const [invoiceStatusId, setInvoiceStatusId] = useState('')
    const [roleId, setRoleId] = useState('')
    const [projectNumberSelectId,setProjectNumberSelectId] = useState('')
    const [projectGroupSelectId,setProjectGroupSelectId] = useState('')
    const [empId,setEmpId] = useState(null)
    useEffect(() => {
        dispatch(advancedSearchIdAction({
            collectionId:collectionId,
            advanceSearchId: 0
        }))      
    }, [])
    useEffect(() => {
        if(saveAdvanceSearchFlag){
            dispatch(getProjectInvoiceOverviewAction({
                collectionID: collectionId,
                orderBy: 1,
                pageIndex: 0,
                pageSize: 20,
              }))
              dispatch(backDropLoaderCloseAction())
              dispatch(searchAdvancedResetAction())
              onClose()
        }
       
    }, [saveAdvanceSearchFlag])
    useEffect(() => {
        if(saveAdvanceSearchError){          
              dispatch(backDropLoaderCloseAction())
              dispatch(searchAdvancedResetAction())

        }
       
    }, [saveAdvanceSearchError])
    const onSave = () => {
        dispatch(backDropLoaderOpenAction())
        const request = [{
            "billinG_PERIOD_IDS": selected ? selected.join(','): "",
            "projecT_IDS": projectNumberSelectId,
            "projecT_GROUP_IDS": projectGroupSelectId,
            "invoicE_STATUS_ID": invoiceStatusId,
            "rolE_ID": Number(roleId) || null,
            "employeE_ID": Number(empId) || null,
        }]
        dispatch(searchAdvancedAction(request,collectionId,searchId)) 
    }
    const onInvoiceStatusChange = (event,value) => {
        const selectedId = value.map(d=>d.ID).join(',')
        setInvoiceStatusId(selectedId)
    }
    const isAllSelected =
        powerInvoiceOptions.length > 0 && selected.length === powerInvoiceOptions.length;

    const handlePowerInvoiceChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
           setSelected(selected.length === powerInvoiceOptions.length ? [] : powerInvoiceOptions.map(d => d.id));
            return;
        }
        setSelected(value);
    };
    const onKeyRoleStatus = (e) => {
        setRoleId(e.target.value)
    }
   
    return (
        <Modal open={open} >
            <Box sx={style}>
                <Header>
                    <HeaderTitle>
                        Advanced Search
                    </HeaderTitle>
                    <div onClick={onClose}>
                        <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
                    </div>

                </Header>
                <Box m={3}>
                    <Grid container spacing={3}>
                        <LabelComponent title="Power Invoice Billing Period" >
                            <Select
                                labelId="mutiple-select-label"
                                multiple
                                size="small"
                                displayEmpty
                                value={selected}
                                onChange={handlePowerInvoiceChange}
                                input={<OutlinedInput placeholder="Select " />}
                                renderValue={(selected) => (selected.length === 0 ? (<span>Select </span>) : powerInvoiceOptions.filter(d => selected.includes(d.id)).map(d => d.description).join(', '))}
                                MenuProps={MenuProps}>
                                <MenuItem  value="all" >
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={isAllSelected}
                                            indeterminate={
                                                selected.length > 0 && selected.length < powerInvoiceOptions.length
                                            }
                                        />
                                    </ListItemIcon>
                                    <ListItemText

                                        primary="Select All"
                                    />
                                </MenuItem>
                                {powerInvoiceOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        <ListItemIcon>
                                            <Checkbox checked={selected.indexOf(option.id) > -1} />
                                        </ListItemIcon>
                                        <ListItemText primary={option.description} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </LabelComponent>
                        <LabelComponent title="Project Number(s)" >
                            <ProjectNumberAutoComplete collectionId={collectionId} setProjectNumberSelectId={setProjectNumberSelectId} onClose={onClose} />
                        </LabelComponent>
                        <LabelComponent title="Project Group(s)" >
                            <ProjectGroupAutoComplete collectionId={collectionId} setProjectGroupSelectId={setProjectGroupSelectId} onClose={onClose} />
                        </LabelComponent>
                        <LabelComponent title="Oracle PA Invoice Status" >
                             <Autocomplete
                                size="small"
                                multiple
                                limitTags={2}
                                id="multiple-limit-tags"
                                disableCloseOnSelect
                                freeSolo
                                options={oracleInvoiceStatus}
                                onChange={(event, value) => onInvoiceStatusChange(event,value)}
                                getOptionLabel={(option) => option.DESCRIPTION}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.DESCRIPTION}
                                    </li>
                                )}
                                defaultValue={[]}
                                renderInput={(params) => (
                                    <TextField fullWidth {...params} size="small" placeholder="Please search"/>
                                    )}
                                />
                        </LabelComponent>
                        <LabelComponent title="Key Member details" lg={12}></LabelComponent>
                        <LabelComponent title="Role" >
                            <Select displayEmpty fullWidth value={roleId} onChange={e => onKeyRoleStatus(e)} size="small">
                                <MenuItem disabled key={-1} value="">Please Select</MenuItem>
                                {keyRoleOptions.map((d, i) => (
                                    <MenuItem key={i} value={d.ID}>
                                        {d.DESCRIPTION}
                                    </MenuItem>
                                ))}
                            </Select>
                        </LabelComponent>
                        <LabelComponent title="Employee Name" >
                            <EmployeeNumberAutoComplete roleId={roleId} setEmpId={setEmpId}  />
                        </LabelComponent>
                    </Grid>
                </Box>

                <Footer>
                    <Stack
                        width="100%"
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSave} variant="contained">
                            Search
                        </Button>
                        {/* disabled={disabled}  */}
                    </Stack>
                </Footer>
            </Box>
        </Modal>
    );
}

export default AdvancedSearch;

const LabelComponent = ({ children, title, xs = 12, sm = 12, md = 6, lg = 6 }) => (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} >
        <FormControl fullWidth >
            <Label>{title}</Label>
            {children}
        </FormControl>
    </Grid>
)
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
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
    borderBottom: "1px solid #E1E1E1",
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
const Label = styled("label")({
    fontSize: "14px",
    lineHeight: "24px",
    marginBottom: "10px",
    fontWeight: 400,
});
