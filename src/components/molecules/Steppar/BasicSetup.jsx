import React, { useEffect,memo, useState,useRef } from "react";
import { apiCall } from "../../../services/httpService"
import { useDispatch, useSelector } from "react-redux";
import { FormControlLabel, RadioGroup, Tooltip,Typography,Grid,TextField,Radio } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import styled from "styled-components";
import {setCreateCollectionData,
  showSearchModal,similarCodeSearch,showSearchCollectionInBasic,
  contractAdministrator, projectManagerName,searchClientCodeDetails,searchContractNumberDetails
} from "../../../redux/common/action";

import { getCollectionNameDetails } from '../../../redux/api/action'
import { colors } from "../../../theme";
import { Button, Icon, TextArea } from "../../atoms";
import { SearchModal } from "../Modal";
import {getContractNumberAction,getContractNumberResetAction} from '../Modal/logic'
import {getAllianceProjectDetailAction,getClientCodeAction,getClientCodeResetAction} from './logic'
import {selectedProjectNumberAction,selectedProjectNumberResetAction} from '../Modal/logic'
import {getAllianceProjectDetailResetAction} from '../Steppar/logic'
import {getContractCeilingSummaryTotalAction,getAllContractorCeilingAction} from '../ContractorCeilings/logic'
import ContractNumberAutoComplete from './ContractNumberAutoComplete'
import CustomerNameAutoComplete from './CustomerNameAutoComplete'
import './stepperStyles.css'

const BasicSetup = (props) => {
  const { activeStep, createCollection, setCreateCollection, setCollectionNameError, collectionNameError } = props;
  const classes = useStyles();
  const dispatch = useDispatch()
  const [allianceCodeShow, setAllianceCodeShow] = useState(true);
  const [projectNumberShow, setProjectNumberShow] = useState(true);
  const [searchModal, setSearchModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState('')
  const [similarCollection, setSimilarCollection] = useState(false)
  const [collectionErrorMessage,setCollectionErrorMessage] = useState(false)
  const [contractNumberSelectedId,setContractNumberSelectedId] = useState('')
  const [customerNameSelectedId,setCustomerNameSelectedId] = useState('')
  const {data:selectedAllianceCode} =  useSelector(state => state.getAllianceProjectDetailReducer)
  const {data:generateCollectionId} = useSelector(state => state.getGenerateCollectionId);
  const { data  : getAllContractorCeiling , getAllContractorCeilingFlag } = useSelector(state =>state.getAllContractorCeilingReducer)
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteContractorCeilingFieldsReducer)
  const {data: selectedProjectNumber } = useSelector((state) => state.selectedProjectNumberReducer);
  const { searchContractAdministrator,similarCode,searchProjectManagerName } = useSelector(({ common }) => common);
  const { getCollectionName } = useSelector(({ api }) => api);
  const collectionNameLabel = getCollectionName.map((code, index) => code?.FINAL_STATUS === "SUCCESS")

  const selectAllianceCode = (type) => {
    setSearchModal(true);
    setOpen(true);
    setOpenModal(type)
  };
  const deleteSelectAllianceCode = async(code,selected) => {
    const request = selected === 'ALL' ? code.map(d => ({ 'allC_PROJ_GROUP_ID': d.ALLC_PROJ_GROUP_ID, "assigN_TYPE": d.ASSIGN_TYPE, "projecT_ID": 0 })) : [{'allC_PROJ_GROUP_ID': code.ALLC_PROJ_GROUP_ID,"assigN_TYPE": code.ASSIGN_TYPE, "projecT_ID": 0}]
    const response = await apiCall({
      method: 'DELETE',
      url: '/DeleteProjectTempAllocation',
      params:{CollectionID:generateCollectionId[0] },
      data:  request})
    dispatch(getAllianceProjectDetailAction(generateCollectionId)) 

  }
  const deleteSelectProjectNumber = async(project,selected) => {
    const request = selected === 'ALL' ? project.map(d => ({ 'allC_PROJ_GROUP_ID': 0, "assigN_TYPE": 'P', "projecT_ID": d.PROJECT_ID })) : [{ 'allC_PROJ_GROUP_ID': 0, "assigN_TYPE": "P", "projecT_ID": project.PROJECT_ID }]
    const response = await apiCall({
        method: 'DELETE',
        url: '/DeleteProjectTempAllocation',
        params: { CollectionID: generateCollectionId[0] },
        data: request 
      })
      dispatch(selectedProjectNumberAction({ CollectionId: generateCollectionId[0] }))
  }
  const deleteSelectContractCeilingCode = async(code) => {
    const response = await apiCall({
      method: 'DELETE',
      url: '/DeleteContractCeilingTempData',
      params:{ contractCeilingId: Number(code.CONTRACT_CEILING_ID)},
    })
    dispatch(getContractCeilingSummaryTotalAction({
      collectionID: generateCollectionId[0],
      pageIndex: 0,
      pageSize: 10,
      orderBy: 1
      }),false)
      dispatch(getAllContractorCeilingAction({
      Collection_ID: generateCollectionId[0],
      pageIndex: 0,
      pageSize: 10,
      orderBy: 1
      }),false) 
  }

  const selectContractCode = () => {
    dispatch(showSearchModal('contractor'))
    setSearchModal(true)
    setOpen(true)
  };
  const selectProjectNumberCode = () => {
    setSearchModal(true);
    setOpen(true);
    setOpenModal("projectnumber")
  };
  const selectContractCeiling = () => {
    setSearchModal(true);
    setOpen(true);
    setOpenModal("contractor_ceiling")
  };
  const selectSimilarCode = () => {
    dispatch(showSearchModal("similar"));
    setSearchModal(true);
    setOpen(true);
    dispatch(showSearchCollectionInBasic(false));

  };
  const deleteSelectSimilarCode = (id) => {
    const newList = similarCode.filter((item) => item.ID !== id);
    dispatch(similarCodeSearch(newList));

  }
  const selectProjectManagerCode = () => {
    dispatch(showSearchModal("projectmanager"));
    setSearchModal(true);
    setOpen(true);
  };
  const handleCollectionChange = (event) => {
    event.preventDefault();
    setAllianceCodeShow(true)
    const { name, value } = event.target;
    if (value === 'N') {
      if(selectedAllianceCode.length > 0){
        deleteSelectAllianceCode(selectedAllianceCode,'ALL');
      } 
      if (selectedProjectNumber.length > 0) {
        deleteSelectProjectNumber(selectedProjectNumber,'ALL');
      }
      setAllianceCodeShow(false)
      
   
    } else if(value === 'Y'){
      if (selectedProjectNumber.length > 0) {
        deleteSelectProjectNumber(selectedProjectNumber,'ALL');
      }

    }
    setCreateCollection((createCollection) => ({
      ...createCollection,
      ['IS_GROUP_OF_PROJECT']: value,
    }));
    dispatch(setCreateCollectionData(createCollection))
    console.log(createCollection)
    console.log(createCollection)


  };
  const handleInputChange = (event) => {
    event.preventDefault();
    setCollectionErrorMessage(false)
    const { name, value } = event.target;
    setCreateCollection({ ...createCollection, [name]: value });

  };
  const handleCollectionName = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (value.length > 0) {
      if (value.match(/[^a-zA-Z0-9 ]/g)) {
        setCollectionNameError({ hasError: true });
      } else {
        dispatch(getCollectionNameDetails(value))
        setCollectionNameError({ hasError: false });
      }
    }
    setCollectionErrorMessage(true)
  }
  const handleTemplateChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setCreateCollection({ ...createCollection, [name]: value });
    setSimilarCollection(true);
  };
  const deleteContractAdministrator = () => {
    dispatch(contractAdministrator(''))
  }
  const deleteProjectManager = () => {
    dispatch(projectManagerName(''))
  }
  const onCustomerNameSelectedId = (option) => {
    if(option?.ID){
      setCreateCollection({ ...createCollection, ['CLIENT_CODE']: option.ID });
      dispatch(searchClientCodeDetails(option))
    }  

  }
  const onContractNumberSelectedId = (option) => {
    if(option?.ID){
      setCreateCollection({ ...createCollection, ['CONTRACT_NUMBER']: option.ID });
      dispatch(searchContractNumberDetails(option))    }  

  }
  
  return (
    <>
      <Collection>
        <Grid container>
          <Grid item xs={12} lg={6} pt={1} pl={3} className={classes.borderListCollection} >
            <Grid item xs={12} mt={1} mb={2}>
              <Label>Collection Name</Label>
              <Input
                type="text"
                name="COLLECTION_NAME"
                placeholder="Please name the collection"
                value={createCollection.COLLECTION_NAME}
                onBlur={handleCollectionName}
                onChange={handleInputChange}
                className={` ${collectionNameError.hasError ? 'errorCollection' : ''}`}
              />
              {collectionErrorMessage && (
                <>
                {collectionNameError.hasError ? (<Error>The field must not contain special characters</Error>) : (
                  <>
                    {!collectionNameLabel[0] && createCollection.COLLECTION_NAME.length > 0 && (<p style={{ color: 'red' }}>{createCollection.COLLECTION_NAME} is Not Available </p>)}
                  </>
                )}
                </>
              )}
            </Grid>
            <Grid item xs={12}>
              <Label>
                Are you grouping projects for invoicing or working on an
                individual projects invoice ?
              </Label>
              <RadioGroup className="radioGroup-collections"
                row
                name="IS_GROUP_OF_PROJECT"
                value={createCollection.IS_GROUP_OF_PROJECT}
                onChange={handleCollectionChange}
              >
                <FormControlLabel
                  value="Y"
                  control={<Radio />}
                  label={<Typography style={{fontSize: 14}}>Group of Projects</Typography>}

                />
                <FormControlLabel
                  value="N"
                  control={<Radio />}
                  label={<Typography style={{fontSize: 14}}>Individual Project</Typography>}

                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} mt={1}>
              <Label>
                How do you want to assign projects to the collection ?
                <Tooltip title="Assign Project">
                  <IconBase>
                    <Icon name="info" />
                  </IconBase>
                </Tooltip>
              </Label>
            </Grid>

            {allianceCodeShow && (
              <Grid item xs={12} mb={2}>
                <Label>Alliance Code(s)</Label>
                <Grid container item xs={12}>
                  <Grid item xs={4}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      align-items="center">
                      <div onClick={() => selectAllianceCode('alliance_code')}>
                        <Button
                          text="Select"
                          bg={colors.transparent}
                          color={colors.blue}
                          weight="bold"
                          padding="0px"
                        />
                      </div>
                    </Box>
                  </Grid>
                  {
                     selectedAllianceCode.length > 0 && (
                      <Grid item xs={12} mt={1}>
                        {selectedAllianceCode.map((code, index) => (
                          <ManagerName key={index}>
                          {code.ALLIANCE_CODE1 !== null ? (<>AC1:{code?.ALLIANCE_CODE1} {(code.ALLIANCE_CODE2 !== null || code.ALLIANCE_CODE3 !== null )? ',' : ''}</>) : null}
                          {code.ALLIANCE_CODE2 !== null ? (<>AC2:{code?.ALLIANCE_CODE2}{(code.ALLIANCE_CODE3 !== null )? ',' : ''}</>) : ''}
                          {code.ALLIANCE_CODE3 !== null ? (<>AC3:{code?.ALLIANCE_CODE3}</>) : ''}
                          <CloseIcon onClick={() => deleteSelectAllianceCode(code,'SINGLE')}><Icon name="cross" color="white" /></CloseIcon></ManagerName>
                        ))}
                      </Grid>
                    )}
                </Grid>
              </Grid>
            )}
            {projectNumberShow ? (
              <Grid item xs={12}>
                <Label>Project Number(s)</Label>
                <Grid container item xs={12}>
                  <Grid item xs={4}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      align-items="center"
                    >
                      <div onClick={() => selectProjectNumberCode()}>
                        <Button
                          text="Select"
                          bg={colors.transparent}
                          color={colors.blue}
                          weight="bold"
                          padding="0px"
                        />
                      </div>
                    </Box>
                  </Grid>
                  {selectedProjectNumber.length > 0 && (
                    <Grid item xs={12}  mt={1}>
                      {selectedProjectNumber.map((code, index) => (
                        <ManagerName key={code.PROJECT_ID}>PN:{code.PROJECT_NUMBER}<CloseIcon onClick={() => deleteSelectProjectNumber(code,'SINGLE')}><Icon name="cross" color="white" /></CloseIcon></ManagerName>
                      ))}
                    </Grid>
                  )}

                </Grid>
              </Grid>
            ) : null}

            {/* <Grid item xs={12} mt={1}>
              <Label>
                Do you want to setup similar to another collection or from a
                template ?
                <Tooltip title="Similar">
                  <IconBase>
                    <Icon name="info" />
                  </IconBase>
                </Tooltip>
              </Label>
              <RadioGroup
                row
                name="IS_SIMILAR"
                value={createCollection.IS_SIMILAR}
                aria-label="template"
                onChange={handleTemplateChange}
              >
                <FormControlLabel
                  value="similar"
                  control={<Radio />}
                  label="Similar Collection"
                />
                <FormControlLabel
                  value="template"
                  control={<Radio />}
                  label="Template"
                />
              </RadioGroup>
            </Grid>
            {similarCollection ? (
              <Grid item xs={12}>
                <Label>
                  Select the collection/s you want to duplicate from
                </Label>
                <Grid item xs={4}>
                  <div onClick={() => selectSimilarCode()}>
                    <Button
                      text="Select"
                      bg={colors.transparent}
                      color={colors.blue}
                      weight="bold"
                      padding="0px"
                    />
                  </div>
                </Grid>
              </Grid>
            ) : null}
            {showSearchCollection && similarCode.length > 0 && (
              <Grid item xs={12} mt={1}>
                {similarCode.map((code, index) => (
                  <ManagerName key={code.ID}>{code.Description}<CloseIcon onClick={() => deleteSelectSimilarCode(code.ID)}><Icon name="cross" color="white" /></CloseIcon></ManagerName>
                ))}
              </Grid>
            )} */}
          <Grid item xs={12} mt={1} lg={7}>
              <Label>Contract Number (optional)</Label>
              <ContractNumberAutoComplete onContractNumberSelectedId = {onContractNumberSelectedId} contractNumberSelectedId={contractNumberSelectedId} />
          </Grid>

          </Grid>
          <Grid item xs={12} lg={6} pt={1} pl={3} className={classes.borderListClient}>
            <Grid item xs={12} mt={1} lg={7}>
              <Label>Customer Name (optional)</Label>
              <CustomerNameAutoComplete customerNameSelectedId={customerNameSelectedId} onCustomerNameSelectedId={onCustomerNameSelectedId} />
       
            </Grid>
            <Grid item xs={12} mt={2}>
              <Label>Collection Description (optional) </Label>
              <TextArea
                type="text"
                name="COLLECTION_DESCRIPTION"
                placeholder="Please enter description"
                style={{ width: 200 }}
                value={createCollection.COLLECTION_DESCRIPTION}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <Label>Client Contracting Officer (optional)</Label>
              <Input
                type="text"
                name="CLIENT_CONTRACTING_OFFICER"
                placeholder="Please enter"
                value={createCollection.CLIENT_CONTRACTING_OFFICER}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <Label>Program Manager (optional)</Label>
              <Grid container item xs={12}>
                <Grid item xs={4}>
                  <div onClick={() => selectProjectManagerCode()}>
                    <Button
                      text="Select"
                      bg={colors.transparent}
                      color={colors.blue}
                      weight="bold"
                      padding="0px"
                    />
                  </div>
                </Grid>
                {searchProjectManagerName !== '' && (
                  <Grid item xs={12} mt={1}>
                    <ManagerName>{searchProjectManagerName?.EMPLOYEE_NAME}<CloseIcon onClick={() => deleteProjectManager()}><Icon name="cross" color="white" /></CloseIcon></ManagerName>
                  </Grid>
                )}
              </Grid>
            </Grid>

            <Grid item xs={12} mt={2}>
              <Label>Contract Administrator (optional)</Label>
              <Grid container item xs={12}>
                <Grid item xs={4}>
                  <div onClick={() => selectContractCode()}>
                    <Button
                      text="Select"
                      bg={colors.transparent}
                      color={colors.blue}
                      weight="bold"
                      padding="0px"
                    />
                  </div>
                </Grid>
                <Grid item xs={12} >
                  {searchContractAdministrator !== '' && (
                    <Grid item xs={8}>
                      <ManagerName>{searchContractAdministrator?.EMPLOYEE_NAME}<CloseIcon onClick={() => deleteContractAdministrator()}><Icon name="cross" color="white" /></CloseIcon></ManagerName>
                    </Grid>
                  )}

                </Grid>
              </Grid>
            </Grid>
                 
              <Grid item xs={12} mt={2}>
                <Label>Contract Ceilings and Periods (optional)</Label>
                <Grid container item xs={12}>
                  <Grid item xs={4}>
                    <Box
                      display="flex"
                      flexDirection="row"
                      align-items="center">
                  <div onClick={() => selectContractCeiling()}>
                        <Button
                          text="Select"
                          bg={colors.transparent}
                          color={colors.blue}
                          weight="bold"
                          padding="0px"
                        />
                      </div>
                    </Box>
                  </Grid>
                  {
                     getAllContractorCeiling.length > 0 && (
                      <Grid item xs={12} >
                        {getAllContractorCeiling.map((code, index) => (
                          <ManagerName key={index}>
                            {code.PERIOD_NAME}
                          <CloseIcon onClick={() => deleteSelectContractCeilingCode(code)}><Icon name="cross" color="white" /></CloseIcon></ManagerName>
                        ))}
                      </Grid>
                    )}
                </Grid>
              </Grid>

          </Grid>
        </Grid>
      </Collection>
      {searchModal && <SearchModal openModal={openModal} setOpenModal={setOpenModal} open={open} setOpen={setOpen} />}
    </>
  );
};

export default memo(BasicSetup);


const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }
  }

  & li[aria-selected='true'] {
    background-color: "#fafafa";
    font-weight: 600;
  }
  & li[data-focus='true'] {
    background-color: #e6f7ff};
    cursor: pointer;

  
  }
`
);


const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      color: "#777777",
      padding: "8px",
      minHeight: "40",
    },
  },
  borderListCollection: {
    borderRight: "1px solid #EBEBEB",
  },
  borderListClient: {
  },
});
const Label = styled.label`
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
const Error = styled.div`
  color: #D72850;
;`
const Input = styled.input`
  padding: 10px;
  border: 1px solid #EEEEEE;
  width: 58%;
  border-radius: 5px;
  height: 40px;
  opacity: 0.75;
`;
const Collection = styled.div``;
const ManagerName = styled.span`
    background: #333333;
    padding:1px 1px 1px 5px;
    height: 26px;
    color: ${colors.white};
    font-family: Jacobs Chronos !important;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    border-radius: 20px;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 5px;`;

const CloseIcon = styled.span`
    display: inline-block;
    vertical-align: bottom;
    margin-left: 5px;
`
const IconBase = styled.div`
    margin-left: 5px;
  `;

  
const Description = styled("span")`   
font-size:12px;
    text-overflow: ellipsis;
    padding-left: 12px;
    padding-right: 12px;
    white-space: nowrap;
`;


const StyledTag = styled("div")`
  padding: 0px 5px;
  position: absolute;
  top: 35px;
  left: 10px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  height:25px;
  white-space: nowrap;
  color: #222222;
`;

const List = styled("div")`
  position: relative;
`;



