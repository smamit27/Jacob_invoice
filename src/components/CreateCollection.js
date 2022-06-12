import { Button, Grid, Stack, Box, Typography,Modal} from '@mui/material'
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import styled from "styled-components";
import { colors } from "./../theme";
import { ExitModal } from "./molecules/Modal";
import { AdditionalFeature, BasicSetup, Confirm, Steppar } from "./molecules/Steppar";
import {insertCollectionDetails} from '../redux/api/action'
import { editableCollection,setCreateCollectionData} from "../redux/common/action";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function CreateCollection(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [modalStyle] = React.useState(getModalStyle);
  const [activeStep, setActiveStep] = useState(0);
  const [exitModal, setExitModal] = useState(false);
  const [open, setOpen] = useState(true);
  const [collection] = useState(true);  
  const [collectionNameError,setCollectionNameError] =useState({hasError: false})
  const [createCollection, setCreateCollection] = useState({
    IS_GROUP_OF_PROJECT: "Y",
    COLLECTION_NAME: "",
    CONTRACT_NUMBER: "",
    CLIENT_CODE: "",
    COLLECTION_DESCRIPTION: "",
    CLIENT_CONTRACTING_OFFICER: "",
    PROJECT_ASSIGN_TYPE: "A",
    ACTIVE: "Y"
  });
  const { editable ,collectionModal,searchContractAdministrator,searchProjectManagerName,searchClientCode,searchContractNumber} = useSelector(({ common }) => common);
  const { getCollectionName } = useSelector(({ api }) => api);
  const collectionNameLabel = getCollectionName.map((code, index) => code?.FINAL_STATUS === "SUCCESS")
    const {data:generateCollectionId} = useSelector(state => state.getGenerateCollectionId);
  const {data:selectedAllianceCode} =  useSelector(state => state.getAllianceProjectDetailReducer)
  const {
    flag: selectedProjectNumberFlag,
    error: selectedProjectNumberError,
    data: selectedProjectNumber,
  } = useSelector((state) => state.selectedProjectNumberReducer);
  useEffect(() => {
    if(editable === "basic_setup"){ setActiveStep(0) }
    if(editable === "additional_feature") { setActiveStep(1)}
  }, [editable])
  useEffect(() => {
    if(collectionModal){
      setCreateCollection(createCollection);

    }
    return () => {
    };
  }, [collectionModal]);
  
  const handleNext = () => {

    dispatch(setCreateCollectionData(createCollection))
    
    if (activeStep === 2) {
        const programManager = searchProjectManagerName?.EMPLOYEE_ID || 0;
        const contractAdmin = searchContractAdministrator?.EMPLOYEE_ID || 0;
        const collectionHandler = [createCollection].map(item => ({
          collectioN_NAME: item.COLLECTION_NAME,
          contracT_NUMBER: searchContractNumber === '' ?  0 : searchContractNumber.ID,
          clienT_ID:searchClientCode === '' ?  0 : searchClientCode.ID,
          collectioN_DESCRIPTION: item.COLLECTION_DESCRIPTION,
          clienT_CONTRACTING_OFFICER:item.CLIENT_CONTRACTING_OFFICER,
          contracT_ADMINISTRATOR: contractAdmin,
          prograM_MANAGER: programManager,
          active: item.ACTIVE
        }))       
        const collectionData = {
            "collectioN_ID": generateCollectionId[0],
            "collection": collectionHandler,                              
            "option": [
              {
                "allocatE_FUNDS_TO_TASKS": "N",
                "utilizE_TIME_PHASE_BUDGET": "N",
                "tracK_FUNDS_AUTH_BY_CLIENT": "N",
                "holdbacK_OF_FUNDING": "N",
                "tracK_EXPEND_LVL_BUDGET": "N",
                "allocatE_FUNDING_PERCENT": "N",
                "enforcE_CONTRACT_CELLING": "N",
                "setuP_CONTRACT_PERIOD": "N",
                "teaM_SUBCONTR_MARKUP_LABOUR": "N",
                "structurE_TASK_CLIENT_REQ": "N",
                "awarD_PERFORMANCE_FEE": "N",
                "changE_PROJ_ATTR_CLIENT_REQ": "N",
                "changE_EXPEND_ATTR_CLIENT_REQ": "N",
                "invoicE_JACOB_COST_JV": "N",
                "changE_TASK_ATTR_CLIENT_REQ": "N",
                "bilL_AND_IWA": "N",
                "setuP_TEAM_SUBCONTR_INVOICE": "N",
                "caL_TRACK_TRAVEL_PER_DIAM": "N",
                "locaL_TAX_EXEMPTION": "N",
                "reportS_TRIPS_CLIENT_DT": "N",
                "uS_FED_TRAVEL_THRES_VALID": "N",
                "teaM_SUBCONTRACTOR_SUMMARY": "N",
                "firsT_CHRG_RPT_COLLECTION": "N",
                "smalL_BUSINESS_REPORTS": "N",
                "teaM_SUBCONTR_SMALLBUSI_DESIG": "N",
                "reporT_LINE_ITEM_SORTING": "N",
                "subcontracT_DETAILS": "N",
                "multI_PROJECT_INVOICE_SUMMR": "N",
                "evenT_RECONCILIATION": "N",
                "assigN_CAPPED_RATES": "N",
                "assigN_MINIMUM_RATES": "N",
                "seE_OVERHEAD_COMPONENT": "N",
                "recE_NOTI_XDAYS_BEFOR_CTEND": "N",
                "knoW_PO_FUNDS_X_PRECENT": "N",
                "recE_NOTI_XFUNDS_USED": "N",
                "percentagE_FUNDS_USED": 0
              }           
            ],
            "features": [],
            "savE_MODE": "I"
          }
      dispatch(insertCollectionDetails(collectionData))
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    dispatch(editableCollection(''))
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleCancel = () => {
    setExitModal(true);
    setOpen(true);
  };
  const disabledValue = (createCollection.COLLECTION_NAME == '' || !collectionNameLabel[0] || collectionNameError.hasError) || (selectedProjectNumber.length === 0 && selectedAllianceCode.length === 0)

return (
    <div>
      {collection ? (
        <Box mt={10} ml={10}>
          <Modal      
            open={props.openModal}
          >
            <div style={modalStyle} className={classes.paper}>
              <Header style={{height:"72px",borderBottom: "1px solid #EEEEEE"}}>
                <Grid container>
                  <Grid item xs={12} lg={6}>

                    <Typography
                      variant="body1"
                      pt={3}
                      pl={3}
                      data-testid="create-new-collection"
                      style={{ color: "#222222",fontSize: "14px",fontFamily: "Jacobs Chronos bold" }}
                    >
                      Create New Collection
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6} pt={2} pb={2}>
                    <Steppar activeStep={activeStep} />
                  </Grid>
                </Grid>
              </Header>
              <Content>
              <Grid>{activeStep === 0 && <BasicSetup setCollectionNameError={setCollectionNameError} collectionNameError={collectionNameError}createCollection={createCollection} setCreateCollection={setCreateCollection}/>}</Grid>
              <Grid>{activeStep === 1 && <AdditionalFeature />}</Grid>
              <Grid>{activeStep === 2 && <Confirm />}</Grid>
              </Content>
                <Footer style={{height:72}}>
                  <Grid container spacing={3} flexWrap="wrap">
                    <Grid item  sm lg md xs ml={3}>
                      {activeStep !== 0 && (
                        <Stack spacing={2} direction="row" >
                          <Button variant="contained" color="secondary" onClick={handleBack} >Back</Button>
                        </Stack>
                        )}
                      </Grid>
                      <Grid item alignSelf="flex-end" mr={3}>
                        <Stack spacing={2} direction="row" >
                          <Button onClick={handleCancel}>Cancel</Button>
                          <Button variant="contained" disabled={disabledValue} pr={1} onClick={handleNext}>{activeStep === 2 ? "Create" : "Next"}</Button>
                        </Stack>
                      </Grid>
                  </Grid>
                </Footer>            
            </div>
          </Modal>
          {exitModal && <ExitModal open={open} setOpen={setOpen} />}
        </Box>
      ) : null}
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "90%",
    backgroundColor:"#FDFDFD",
    boxShadow: 
  '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)',
    borderRadius: "5px",
  },
}));
const Header = styled.div`
  border-bottom: 1px solid #EBEBEB;
  height: 72px;`;
const Footer = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding:5px;
  border-top: 1px solid #EBEBEB;
`;
const Content = styled.div`
    height: 465px;
    overflow: auto;
`;


const HeaderTitle = styled.div`
  fontWeight: "500",
  fontSize: "14px",
  lineHeight: "24px",
  fontFamily: " Jacobs Chronos Bold"
  `;
