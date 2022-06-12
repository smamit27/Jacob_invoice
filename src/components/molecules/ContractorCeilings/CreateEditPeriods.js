import {
    Modal,
    Box,
    styled,
    Button,
    Stack,
    Grid,
    TextField,
    Select,
    FormControl,
    MenuItem
} from "@mui/material";
import { DesktopDatePicker } from '@mui/lab';
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createEditContractorCeilingFieldAction} from './logic'
import { backDropLoaderOpenAction} from "../BackDropLoader/logic";
import { format,  } from 'date-fns';
import { Icon} from '../../atoms';
import NumberFormat from "react-number-format";
import '../ContractorCeilings/ContractorCeilingsStyles.css';
import { IoIosArrowDown } from "react-icons/io";

function CreateEditPeriods({ open = false, onClose = () => null,mode ,original,isCollectionExist}) {
    const dispatch = useDispatch()
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const collectionId = useSelector(state => state.getCollectionId)
    const {data:generateCollectionId} = useSelector(state => state.getGenerateCollectionId);
    const { data: currencyOptions } = useSelector(state => state.getCurrency)

    const [createPeriod,setCreatePeriod ] = useState({
        PERIOD_NAME: '',
        CEILING_DESCRIPTION:'',       
        CONTRACT_HOURS: null,
        AWARD_AMOUNT: null,
        CURRENCY: ''
    })
    useEffect(()=>{
        if(mode === 'edit'){
            setCreatePeriod(original)
            setStart(original.CONTRACT_START_DATE_DISPLAY)
            setEnd(original.CONTRACT_END_DATE_DISPLAY)
        }

    },[mode])
    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setCreatePeriod({ ...createPeriod, [name]: value });
    }
    const amountChange = (value, name) => {
        setCreatePeriod({ ...createPeriod, [name]: value });
    }
    const onDateChange = (val, type) => {
        try {
            if (type === 'start') {
                setStart(val)
                setEnd(null)
            } else {
                setEnd(val)
            }
        } catch (error) {
            if (type === 'start') {
                setStart(null)
                setEnd(null)
            } else {
                setEnd(null)
            }
        }
    }

    
    const onSave = () => {
        dispatch(backDropLoaderOpenAction())
        const request  = [createPeriod].map((d)=>(
            {
                "contracT_CEILING_ID": mode === 'edit' ? d.CONTRACT_CEILING_ID: 0,
                "collectioN_ID": isCollectionExist ? collectionId: generateCollectionId[0],
                "perioD_NAME": d?.PERIOD_NAME,
                "ceilinG_DESCRIPTION": d?.CEILING_DESCRIPTION,
                "contracT_START_DATE": start === null ? null: format(new Date(start),'dd-MMM-yyyy'),
                "contracT_END_DATE":  end === null ? null: format(new Date(end),'dd-MMM-yyyy'),
                "contracT_HOURS": Number(d?.CONTRACT_HOURS) || 0,
                "awarD_AMOUNT": Number(d?.AWARD_AMOUNT)|| 0,
                "currency": d?.CURRENCY,
                "savE_MODE": mode === 'edit' ? "U" : 'I'
              }
        ))
        dispatch(createEditContractorCeilingFieldAction(...request,isCollectionExist)) 
        onClose()

    }
    return (
        <Modal open={open}>
            <Box sx={style} className="addNewPeriodModal">
                <Header className="addNewPeriodHeader">
                    <HeaderTitle data-testid={mode === 'edit' ? 'edit-new-period': 'add-new-period' }>
                   {mode === 'edit' ? 'Edit New Period': 'Add New Period' }
                </HeaderTitle>
                    <div onClick={onClose}>
                        <Icon name="close" />
                    </div>

                </Header>
                <Grid container spacing={1} p={3}>
                        <LabelComponent title="Period" >
                        <TextField type="text"  
                                        value={createPeriod.PERIOD_NAME}
                                        name="PERIOD_NAME" 
                                        size="small" 
                                        fullWidth 
                                        placeholder="Please enter" 
                                        onChange={onChangeHandler} />
                        </LabelComponent>
                        <LabelComponent title="Description (optional)" lg="12">
                           
                             <TextField type="text"  
                                        multiline
                                        value={createPeriod.CEILING_DESCRIPTION}
                                        name="CEILING_DESCRIPTION" size="small" 
                                        fullWidth 
                                        placeholder="Please enter" 
                                        onChange={onChangeHandler} />
                        </LabelComponent>
                        <LabelComponent title="Start date" >
                            <DesktopDatePicker
                                value={start}
                                inputFormat="dd-MMM-yyyy"
                                onChange={(val) => onDateChange(val, 'start')}
                                renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                            />
                        </LabelComponent>

                        <LabelComponent title="End date" >
                            <DesktopDatePicker
                            
                                minDate={start}
                                inputFormat="dd-MMM-yyyy"
                                value={end}
                                onChange={(val) => onDateChange(val, 'end')}
                                renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                            />
                        </LabelComponent>
                        <LabelComponent title="Hours (optional)" >
                            
                             <TextField type="number"  
                                        value={createPeriod.CONTRACT_HOURS}
                                        name="CONTRACT_HOURS" size="small" 
                                        fullWidth 
                                        placeholder="Please enter" 
                                        onChange={onChangeHandler} />

                        </LabelComponent>
                        <LabelComponent title="Award amount" >
                            <NumberFormat thousandsGroupStyle='thousand' decimalScale={2} fixedDecimalScale thousandSeparator placeholder="Please enter" size="small" fullWidth value={createPeriod.AWARD_AMOUNT}  onValueChange={(val) => amountChange(val?.value, 'AWARD_AMOUNT')} customInput={TextField} />
                        </LabelComponent>
                        <LabelComponent title="Currency" lg="">
                        <Select displayEmpty fullWidth name="CURRENCY" value={createPeriod.CURRENCY} onChange={e => onChangeHandler(e)} size="small" IconComponent={() => <Box mr={2} mt={1}><IoIosArrowDown /></Box> }>
                                    <MenuItem disabled key={-1} value='' >Select Currency</MenuItem>
                                    {currencyOptions.map((d, i) => (
                                        <MenuItem key={i} value={d}>
                                            {d}
                                        </MenuItem>
                                    ))}

                                </Select>
                        </LabelComponent>
                    
                </Grid>


                <Footer>
                    <Stack
                        width="100%"
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={onSave} variant="contained">
                            Save
                        </Button>
                        {/* disabled={disabled}  */}
                    </Stack>
                </Footer>
            </Box>
        </Modal>
    );
}

export default CreateEditPeriods;

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
    // background: '#555555',
    // color: '#fff',
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
    fontWeight: "800",
    fontSize: "14px",
    lineHeight: "24px",
    fontFamily: " Jacobs Chronos Bold"
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
