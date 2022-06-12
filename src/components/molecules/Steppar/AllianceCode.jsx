import {
    Modal, Box, styled, Button, Stack, Grid, FormGroup, FormControl, Checkbox, FormControlLabel
} from "@mui/material";
import { apiCall } from "../../../services/httpService"

import { SEARCH_COLUMNS, formSaveData } from './constants'
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from "../BackDropLoader/logic";
import DataGrid, { SelectColumn } from 'react-data-grid'
import Label from '../../atoms/Label';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getUniqueIdFromApi } from '../../../services/httpService';
import { Loader, Icon } from '../../atoms'
import {
    getAllianceCodeOneAction,
    getAllianceCodeTwoAction,
    getAllianceCodeThreeAction, saveAllianceProjectAction, getAllianceProjectDetailAction
} from "./logic";
import { projectOrAllianceChangeResetAction, projectOrAllianceChangeSuccessAction } from "../../../redux/common/logic";
import './stepperStyles.css'



function AllianceCode({ open = false, onClose = () => null, active = [], isCollectionExist = false }) {
    const dispatch = useDispatch();
    const { data: generateCollectionId } = useSelector(state => state.getGenerateCollectionId);
    const { loading, error, flag, data = [] } = useSelector(state => state.getAllianceProjectDetailReducer)
    const { flag: saveAlliancProjectFlag } = useSelector(state => state.saveAllianceProjectReducer)
    const { data: allianceCodeOneData } = useSelector((state) => state.getAllianceCodeOneReducer);
    const { data: allianceCodeTwoData } = useSelector((state) => state.getAllianceCodeTwoReducer);
    const { data: allianceCodeThreeData } = useSelector((state) => state.getAllianceCodeThreeReducer);
    const [saveIds, setSaveIds] = useState([])
    useEffect(() => {
        dispatch(getAllianceCodeOneAction(""))
        dispatch(getAllianceCodeTwoAction(""))
        dispatch(getAllianceCodeThreeAction(""))
        if (isCollectionExist) {
            dispatch(getAllianceProjectDetailAction(generateCollectionId, isCollectionExist))
        }
    }, [])
    useEffect(() => {
        if (saveAlliancProjectFlag) {
            dispatch(getAllianceProjectDetailAction(generateCollectionId, isCollectionExist))
        }

    }, [saveAlliancProjectFlag])
    useEffect(() => {
        if (flag) {
            const activeRows = active.filter(d => data.findIndex(z => z.ALLC_PROJ_GROUP_ID === d.ALLC_PROJ_GROUP_ID) !== -1)
            const otherActiveRows = active.filter(d => data.findIndex(z => z.ALLC_PROJ_GROUP_ID === d.ALLC_PROJ_GROUP_ID) === -1)
            setSelectedRows(new Set(activeRows.map(d => d.ALLC_PROJ_GROUP_ID)))
            setOtherSelectedRows(otherActiveRows)
        }

    }, [flag])

    const classes = useStyles();
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
    const [allianceCodeOneValue, setAllianceCodeOneValue] = useState([])
    const [allianceCodeTwoValue, setAllianceCodeTwoValue] = useState([])
    const [allianceCodeThreeValue, setAllianceCodeThreeValue] = useState([])
    const [selectOption, setSelectOption] = useState(false)
    const [selectedRows, setSelectedRows] = useState(new Set())
    const [otherSelectedRows, setOtherSelectedRows] = useState([])
    const allianceCodeOneRef = useRef([])
    const allianceCodeTwoRef = useRef([])
    const allianceCodeThreeRef = useRef([])
    const autoAdd = useRef('N')
    const onSave = () => {
        //dispatch(backDropLoaderOpenAction())
        onClose()
    }
    const handeCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setIsCheckboxChecked(checked)
        autoAdd.current = checked ? 'Y' : 'N'
    }
    const onChangeAllianceCodeOne = (event, value) => {
        setAllianceCodeOneValue(value)
        allianceCodeOneRef.current = value
    }
    const onChangeAllianceCodeTwo = (event, value) => {
        setAllianceCodeTwoValue(value)
        allianceCodeTwoRef.current = value

    }
    const onChangeAllianceCodeThree = (event, value) => {
        setAllianceCodeThreeValue(value)
        allianceCodeThreeRef.current = value
    }
    const onSelectAllianceCode = () => {

        const firstCode = allianceCodeOneRef.current.length
        const secondCode = allianceCodeTwoRef.current.length
        const thirdCode = allianceCodeThreeRef.current.length
        if (firstCode === 0 && secondCode === 0 && thirdCode === 0) {
        } else if ((firstCode >= 2 && secondCode >= 1 && thirdCode >= 1) ||
            (firstCode >= 2 && secondCode === 0 && thirdCode >= 1) ||
            (firstCode >= 2 && secondCode >= 1 && thirdCode >= 0)) {
        }
        else if ((secondCode >= 2 && firstCode >= 1 && thirdCode >= 1) ||
            (secondCode >= 2 && firstCode === 0 && thirdCode >= 1) ||
            (secondCode >= 2 && firstCode >= 1 && thirdCode === 0)) {
        }
        else if ((thirdCode >= 2 && firstCode >= 1 && secondCode >= 1) ||
            (thirdCode >= 2 && firstCode === 0 && secondCode >= 1) ||
            (thirdCode >= 2 && firstCode >= 1 && secondCode === 0)) {
        }
        else {
            AllianceCode()

        }
    }
    const AllianceCode = async () => {
        const allianceCode = {
            "alliancE_CODE1": allianceCodeOneRef.current,
            "alliancE_CODE2": allianceCodeTwoRef.current,
            "alliancE_CODE3": allianceCodeThreeRef.current,
            "autO_ADD_PROJECT_COLLECTION": autoAdd.current
        }
        const groupID = await getUniqueIdFromApi('/GetCollectionIDAllocationProjMapSequence', 'ALLC_PROJ_GROUP_ID')
        setSaveIds([...saveIds, groupID])
        const payload = formSaveData(allianceCode, groupID, isCollectionExist, generateCollectionId[0])
        dispatch(saveAllianceProjectAction(payload, generateCollectionId, isCollectionExist))
        clearInputField()
    }

    const onDelete = () => {
        const temp = Array.from(selectedRows)
        const selectedData = temp.map(d => data.find(m => m.ALLC_PROJ_GROUP_ID === d))
        const request = selectedData.map(d => ({ 'allC_PROJ_GROUP_ID': d.ALLC_PROJ_GROUP_ID, "assigN_TYPE": d.ASSIGN_TYPE, "projecT_ID": 0 }));
        deleteRequest(request)
    }
    const deleteRequest = async (request) => {
        try {
            const response = await apiCall({
                method: 'DELETE',
                url: isCollectionExist ? '/DeleteProjectAllocation' : '/DeleteProjectTempAllocation',
                params: { CollectionID: generateCollectionId[0] },
                data: request
            })
            dispatch(projectOrAllianceChangeSuccessAction())
            dispatch(getAllianceProjectDetailAction(generateCollectionId, isCollectionExist))
            dispatch(projectOrAllianceChangeResetAction())
        } catch (error) {
            /// dispatch(getAllianceProjectDetailAction(generateCollectionId, isCollectionExist))

        }
    }
    const onCancel = () => {
        if (data.length > 0) {
            const request = data.filter(d => saveIds.indexOf(d.ALLC_PROJ_GROUP_ID) !== -1).map(d => ({ 'allC_PROJ_GROUP_ID': d.ALLC_PROJ_GROUP_ID, "assigN_TYPE": d.ASSIGN_TYPE, "projecT_ID": 0 }));
            deleteRequest(request)
        }
        clearInputField()
        onClose()
    }
    const clearInputField = () => {
        setAllianceCodeOneValue([])
        setAllianceCodeTwoValue([])
        setAllianceCodeThreeValue([])
        setIsCheckboxChecked(false)
        allianceCodeOneRef.current = []        
        allianceCodeTwoRef.current = []
        allianceCodeThreeRef.current = []

    }
    const onCloseIcon = () => {
        onClose()
    }
    const disabled = !allianceCodeOneValue.length && !allianceCodeTwoValue.length && !allianceCodeThreeValue.length
    return (
        <Modal open={open} >
            <Box sx={style} className="selectAllianceModal">
                <Header className="selectAllianceModalheader">
                    <HeaderTitle  data-testid="select-alliance-code">
                        Select Alliance Code(s)
                    </HeaderTitle>
                    <div onClick={onCloseIcon}>
                        <Icon name="close" />
                    </div>
                </Header>
                <Grid container className="selectAllianceModal-container">
                    <Grid item xs={12} lg={3} p={1.5} className={classes.borderListCollection}>
                        <Grid item xs={12} mt={1} className="allianceFormContainer">
                            <Label>Alliance code(s) 1</Label>
                            <Autocomplete
                                size="small"
                                multiple
                                options={allianceCodeOneData.map((option) => option.DESCRIPTION)}
                                onChange={(event, value) => { onChangeAllianceCodeOne(event, value) }}
                                value={allianceCodeOneValue}
                                defaultValue={[]}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                freeSolo
                                renderInput={(params) => <TextField size="small" {...params} placeholder="Search" />}

                            />

                        </Grid>
                        <Grid item xs={12} mt={1} className="allianceFormContainer">
                            <Label>Alliance code(s) 2</Label>

                            <Autocomplete
                                size="small"
                                multiple
                                options={allianceCodeTwoData.map((option) => option.DESCRIPTION)}
                                onChange={onChangeAllianceCodeTwo}
                                defaultValue={[]}
                                value={allianceCodeTwoValue}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                freeSolo
                                renderInput={(params) => <TextField size="small" {...params} placeholder="Search" />}

                            />

                        </Grid>
                        <Grid item xs={12} mt={1} className="allianceFormContainer">
                            <Label>Alliance code(s) 3</Label>
                            <Autocomplete
                                size="small"
                                multiple
                                freeSolo
                                options={allianceCodeThreeData.map((option) => option.DESCRIPTION)}
                                onChange={onChangeAllianceCodeThree}
                                defaultValue={[]}
                                value={allianceCodeThreeValue}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => <TextField autoComplete="new-password" size="small" {...params} placeholder="Search" />}

                            />

                        </Grid>
                        <Grid>
                            <Grid mt={3} className="allianceFormContainer">
                                <Box spacing={1}>
                                    <FormControl component="fieldset" style={{fontSize:'14px'}}>
                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox />}
                                                onChange={handeCheckboxChange}
                                                checked={isCheckboxChecked}
                                                label="Auto add projects to collection"
                                                labelPlacement="end"
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} mt={2}>
                            <Button  disabled={disabled} onClick={onSelectAllianceCode} variant="contained" className="selectBtn">
                                Select
                            </Button>
                        </Grid>
                     </Grid>
                    <Grid item xs={12} p={2} lg={9}>
                        {!isCollectionExist && (<Grid container spacing={3} flexWrap="wrap">
                            <Grid item sm lg md xs className="allianceCode-Table">
                                <Stack spacing={2} direction="row" >Alliance Code(s) Assigned In Collection
                                </Stack>
                            </Grid>
                            <Grid item alignSelf="flex-end" >
                                <Stack spacing={2} mr={2} direction="row" flexWrap="wrap" >
                                    <Button disabled={!selectedRows.size} variant="contained" color="secondary" onClick={onDelete} >Delete</Button>
                                </Stack>
                            </Grid>
                        </Grid>)}
                        <Grid item xs={12}>
                            <TableContent>
                                <Box m={3}>
                                    <DataGrid
                                    style={{height: 'calc(80vh*(9/13))' }} 
                                        rowHeight={40}
                                        noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
                                        headerRowHeight={60}
                                        rowKeyGetter={row => row.ALLC_PROJ_GROUP_ID}
                                        columns={[...(isCollectionExist ? [] : [SelectColumn]), ...SEARCH_COLUMNS]}
                                        rows={data}
                                        selectedRows={selectedRows}
                                        onSelectedRowsChange={setSelectedRows}
                                    />
                                </Box>
                            </TableContent>
                        </Grid>
                    </Grid>
                </Grid>

                <Footer style={{height:72}}>
                    <Stack
                        width="100%"
                        spacing={2}
                        direction="row"
                        justifyContent="flex-end">
                        <Button onClick={onCancel}>Cancel</Button>
                        <Button disabled={data.length === 0} onClick={onSave} variant="contained">
                            Done
                        </Button>
                    </Stack>
                </Footer>
            </Box>
        </Modal>
    );
}

export default AllianceCode;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "90%",
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
    height: 70,
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
const TableContent = styled('div')({
    height: 'calc(85vh - 80px - 3em)',
    overflow: 'auto'
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
const useStyles = makeStyles({
    borderListCollection: {
        borderRight: "1px solid #EBEBEB",
    },

});

