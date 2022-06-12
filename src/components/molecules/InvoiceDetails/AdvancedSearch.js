import {
    Modal, Box, styled, Button, Stack, Grid, Select, FormControl,
    MenuItem, Checkbox, OutlinedInput,TextField, ListItemText,Switch,Autocomplete, ListItemIcon, IconButton
} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useIntialSelector from '../../../hooks/useIntialSelctor';
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAdvancedInvoiceDetailsAction,advancedSearchInvoiceDetailsIdAction,getProjectInvoiceDetailsAction,searchAdvancedInvoiceDetailsResetAction} from './logic'
import {
    backDropLoaderCloseAction,
    backDropLoaderOpenAction,
} from "../BackDropLoader/logic";
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
    const { data: oracleInvoiceDetailsStatus = [] } = useSelector(state => state.oracleInvoiceDetailsStatusReducer)
    const { data: powerInvoiceDetailsOptions = [] } = useSelector(state => state.powerInvoiceDetailsPeriodReducer)
    const {data: oraclePADraftNumber = []} =  useSelector(state => state.oraclePADraftNumberReducer)
    const {data:clientInvoice = []} = useSelector(state=>state.clientInvoiceNumberReducer)
    const {data:itemNotBilled = []} = useSelector(state=>state.itemNotBilledReducer)
    const {flag: saveAdvanceSearchFlag,error: saveAdvanceSearchError} = useSelector(state=> state.searchAdvancedInvoiceDetailsReducer)
    const [selected, setSelected] = useState([]);
    const [invoiceStatusId, setInvoiceStatusId] = useState('')
    const [projectNumberSelectId,setProjectNumberSelectId] = useState('')
    const [itemNotBilledSelectId,setItemNotBilledSelectId] = useState('')
    const [clientInvoiceNumber,setClientInvoiceNumber] = useState('')
    const [oraclePADraft,setOraclePADraft] = useState('')
    const [itemRequired, setItemRequired] = useState('N')

    useEffect(() => {
        dispatch(advancedSearchInvoiceDetailsIdAction({
            CollectionID:collectionId,
            AdvanceSearchID: 0
        }))      
    }, [])
    useEffect(() => {
        if(saveAdvanceSearchFlag){
            // dispatch(getProjectInvoiceOverviewAction({
            //     collectionID: collectionId,
            //     orderBy: 1,
            //     pageIndex: 0,
            //     pageSize: 20,
            //   }))
              dispatch(backDropLoaderCloseAction())
              dispatch(searchAdvancedInvoiceDetailsResetAction())
              onClose()
        }
       
    }, [saveAdvanceSearchFlag])
    useEffect(() => {
        if(saveAdvanceSearchError){          
              dispatch(backDropLoaderCloseAction())
              dispatch(searchAdvancedInvoiceDetailsResetAction())

        }
       
    }, [saveAdvanceSearchError])

    const onInvoiceStatusChange = (event,value) => {
        const selectedId = value.map(d=>d.ID).join(',')
        setInvoiceStatusId(selectedId)
    }
    const onOraclePADraftChange = (event,value) => {
        const selectedId = value.map(d=>d.ID).join(',')
        setOraclePADraft(selectedId)
    }
    const onItemNotBilledChange = (event,value) => {
        const selectedId = value.map(d=>d.ID).join(',')
        setItemNotBilledSelectId(selectedId)
    }
    const onClientInvoiceNumberChange = (event,value) => {
        const selectedId = value.map(d=>d.ID).join(',')
        setClientInvoiceNumber(selectedId)
    }
    const isAllSelected = powerInvoiceDetailsOptions.length > 0 && selected.length === powerInvoiceDetailsOptions.length;

    const handlePowerInvoiceChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
           setSelected(selected.length === powerInvoiceDetailsOptions.length ? [] : powerInvoiceDetailsOptions.map(d => d.id));
            return;
        }
        setSelected(value);
    };
    const onSave = () => {
        dispatch(backDropLoaderOpenAction())
        const request = [{
            "PROJECT_IDS": projectNumberSelectId ,
            "BILLING_PERIOD_IDS": selected ? selected.join(','): "",
            "CLIENT_INVOICE_NUMBERS_IDS": clientInvoiceNumber,
            "ORACLE_PA_DRAFT_NUMBERS_IDS": oraclePADraft,
            "INVOICE_STATUS_IDS": invoiceStatusId,
            "ITEM_NOT_BILLED_IDS": itemNotBilledSelectId,
             "INCLUDE_NET_ZERO": itemRequired            
        }]
        dispatch(searchAdvancedInvoiceDetailsAction(request,collectionId,searchId)) 
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
                    <LabelComponent title="Project Number(s)" >
                            <ProjectNumberAutoComplete collectionId={collectionId} setProjectNumberSelectId={setProjectNumberSelectId} onClose={onClose} />
                        </LabelComponent>
                        <LabelComponent title="Bill Through Date" >
                            <Select
                                labelId="mutiple-select-label"
                                multiple
                                size="small"
                                displayEmpty
                                value={selected}
                                onChange={handlePowerInvoiceChange}
                                input={<OutlinedInput placeholder="Select " />}
                                renderValue={(selected) => (selected.length === 0 ? (<span>Select </span>) : powerInvoiceDetailsOptions.filter(d => selected.includes(d.id)).map(d => d.description).join(', '))}
                                MenuProps={MenuProps}>
                                <MenuItem  value="all" >
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={isAllSelected}
                                            indeterminate={
                                                selected.length > 0 && selected.length < powerInvoiceDetailsOptions.length
                                            }
                                        />
                                    </ListItemIcon>
                                    <ListItemText

                                        primary="Select All"
                                    />
                                </MenuItem>
                                {powerInvoiceDetailsOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                        <ListItemIcon>
                                            <Checkbox checked={selected.indexOf(option.id) > -1} />
                                        </ListItemIcon>
                                        <ListItemText primary={option.description} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </LabelComponent>
                      
                        <LabelComponent title="Client Invoice Number" >
                        <Autocomplete
                                size="small"
                                multiple
                                limitTags={2}
                                id="multiple-limit-tags"
                                disableCloseOnSelect
                                freeSolo
                                options={clientInvoice}
                                onChange={(event, value) => onClientInvoiceNumberChange(event,value)}
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
                        <LabelComponent title="Oracle PA Draft Number" >
                        <Autocomplete
                                size="small"
                                multiple
                                limitTags={2}
                                id="multiple-limit-tags"
                                disableCloseOnSelect
                                freeSolo
                                options={oraclePADraftNumber}
                                onChange={(event, value) => onOraclePADraftChange(event,value)}
                                getOptionLabel={(option) => String(option.DESCRIPTION)}
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
                        <LabelComponent title="Oracle PA Invoice Status" >
                             <Autocomplete
                                size="small"
                                multiple
                                limitTags={2}
                                id="multiple-limit-tags"
                                disableCloseOnSelect
                                freeSolo
                                options={oracleInvoiceDetailsStatus}
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
                        <LabelComponent title="Include Net Zero" >
                        <Switch checked={itemRequired === 'Y' || false} onChange={event => setItemRequired(event.target.checked ? 'Y' : 'N')} />

                        </LabelComponent>
                        <LabelComponent title="Items Not Billed" >
                        <Autocomplete
                                size="small"
                                multiple
                                limitTags={2}
                                id="multiple-limit-tags"
                                disableCloseOnSelect
                                freeSolo
                                options={itemNotBilled}
                                onChange={(event, value) => onItemNotBilledChange(event,value)}
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

const HeaderTitle = styled("div")({
    fontWeight: "500",
    fontsize: "14px",
    lineHeight: "24px",
});

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
