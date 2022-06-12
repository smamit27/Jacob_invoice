import React from 'react'
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../../theme"
import { Icon } from '../../atoms';
import { editableCollection } from '../../../redux/common/action'
function Confirm() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { setCollectionData, searchAllianceCode, similarCode,searchContractAdministrator,searchProjectManagerName } = useSelector(({ common }) => common);
    const handlerSimilarCode = similarCode.map((item) => item.Description).join(",");
    const {loading,error,flag,data:selectedAllianceCode} =  useSelector(state => state.getAllianceProjectDetailReducer)
    const { data: selectedProjectNumber } = useSelector((state) => state.selectedProjectNumberReducer);
    const { searchClientCode,searchContractNumber} = useSelector(({ common }) => common);

    const editBasicSetup = () => {
        dispatch(editableCollection('basic_setup'))
    }
    const editAdditionalFeatures = () => {
        dispatch(editableCollection('additional_feature'))

    }

    return (
        <Collection>
            <Grid container>
                <Grid item xs={12} lg={6} p={3} className={classes.borderListCollection}>
                    <Grid container item xs={12} mb={3}>
                        <Grid item xs={6}>
                            <LabelLeftContainer> Basic Setup </LabelLeftContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelRightContainer onClick={editBasicSetup}> Edit </LabelRightContainer>
                        </Grid>
                        {setCollectionData?.COLLECTION_NAME !== "" && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft>Collection name</LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{setCollectionData?.COLLECTION_NAME}</LabelRight>
                                </Grid>
                            </>
                        )}
                        <Grid item xs={6}>
                            <LabelLeft> Group of projects or individual project </LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight> {setCollectionData?.IS_GROUP_OF_PROJECT === 'Y' ? 'Group of projects' : 'Individual Project'} </LabelRight>
                        </Grid>
                        
                        {selectedAllianceCode.length > 0 && (
                        <>
                            <Grid item xs={6} >
                                <LabelLeft>Alliance Code(s)</LabelLeft>
                            </Grid>
                            <Grid item xs={6} >
                                {selectedAllianceCode.map((code, index) => (
                                    <LabelRight key={index}>
                                         AC1: {code.ALLIANCE_CODE1}, AC2:{code.ALLIANCE_CODE2}, AC3: {code.ALLIANCE_CODE3}
                                    </LabelRight>
                                ))}                               
                            </Grid>
                        </>)}
                        {selectedProjectNumber.length > 0 && (
                        <>
                            <Grid item xs={6} >
                                <LabelLeft>Project Number</LabelLeft>
                            </Grid>
                            <Grid item xs={6} >
                                {selectedProjectNumber.map((code, index) => (
                                    <LabelRight key={code.PROJECT_ID}>PN:{code.PROJECT_NUMBER}</LabelRight>
                                ))}                               
                            </Grid>
                        </>)}
                        
                        {/* {setCollectionData?.IS_SIMILAR !== "" && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft>Duplicate features or Template</LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{setCollectionData?.IS_SIMILAR ? 'Similar' : 'Template'}</LabelRight>
                                </Grid>
                            </>
                        )} */}

                        {/* {similarCode.length > 0 && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft>Collection to duplicate</LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{handlerSimilarCode}</LabelRight>

                                </Grid>
                            </>
                        )} */}
                        
                        {searchContractNumber && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft>Contract Number</LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{searchContractNumber.DESCRIPTION}</LabelRight>
                                </Grid>
                            </>
                        )}

                        {searchClientCode && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft>Client Code</LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{searchClientCode.Description}</LabelRight>
                                </Grid>
                            </>
                        )}
                        {setCollectionData?.COLLECTION_DESCRIPTION !== '' && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft>Collection Description</LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{setCollectionData?.COLLECTION_DESCRIPTION}</LabelRight>
                                </Grid>
                            </>
                        )}

                        {setCollectionData?.CLIENT_CONTRACTING_OFFICER !== '' && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft> Client Contracting Officer</LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{setCollectionData?.CLIENT_CONTRACTING_OFFICER}</LabelRight>
                                </Grid>
                            </>
                        )}
                         {searchProjectManagerName !== '' && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft>Project Manager</LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{searchProjectManagerName?.EMPLOYEE_NAME}</LabelRight>
                                </Grid>
                            </>
                        )}
                         {searchContractAdministrator !== '' && (
                            <>
                                <Grid item xs={6} >
                                    <LabelLeft>Contract Adminstrator </LabelLeft>
                                </Grid>
                                <Grid item xs={6} >
                                    <LabelRight>{searchContractAdministrator?.EMPLOYEE_NAME}</LabelRight>
                                </Grid>
                            </>
                        )}
                    </Grid>


                    <Grid container item xs={12} mb={3}>
                        <Grid item xs={6}>
                            <LabelLeftContainer> Financial Tracking </LabelLeftContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelRightContainer onClick={editAdditionalFeatures}> Edit </LabelRightContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelLeft> Track Funds Authorized by the Client</LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight> Enabled </LabelRight>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelLeft>
                                Allocate Funds to Specific Tasks</LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight>Enabled</LabelRight>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelLeft>Track Expenditure Level Budgets</LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight>Enabled</LabelRight>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} mb={3}>
                        <Grid item xs={6}>
                            <LabelLeftContainer>Client Billing Setup</LabelLeftContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelRightContainer onClick={editAdditionalFeatures}> Edit </LabelRightContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelLeft>No selections</LabelLeft>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} lg={6} p={3} className={classes.borderListClient}>
                    <Grid container item xs={12} mb={3}>
                        <Grid item xs={6}>
                            <LabelLeftContainer>Travel Details</LabelLeftContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelRightContainer onClick={editAdditionalFeatures}> Edit </LabelRightContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelLeft>No selections</LabelLeft>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} mb={3}>
                        <Grid item xs={6}>
                            <LabelLeftContainer> Invoicing & Reporting Presentation </LabelLeftContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelRightContainer onClick={editAdditionalFeatures}> Edit </LabelRightContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelLeft> Teaming Subcontractor Summary</LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight> Enabled </LabelRight>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelLeft>
                                First Charge Report by Collection</LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight>Enabled</LabelRight>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} mb={3}>
                        <Grid item xs={6}>
                            <LabelLeftContainer> Indirect Rates </LabelLeftContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelRightContainer onClick={editAdditionalFeatures}> Edit </LabelRightContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelLeft>See overhead components (Raw, Fringe, G&A, Overhead)</LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight> Enabled </LabelRight>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <LabelLeftContainer> Notification Setup</LabelLeftContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelRightContainer onClick={editAdditionalFeatures}> Edit </LabelRightContainer>
                        </Grid>
                        <Grid item xs={6}>
                            <LabelLeft> Receive Notification when 85% Funds Used</LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight> Enabled </LabelRight>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelLeft>Receive Notification 7 days before contract or period end date</LabelLeft>
                        </Grid>
                        <Grid item xs={6} >
                            <LabelRight>Enabled</LabelRight>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        </Collection>

    )
}

export default Confirm

const LabelLeft = styled.label`
    text-align: left;
    display: flex;
    margin-bottom: 5px;
    font-family: Jacobs Chronos regular;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: #222222;
  `;
const LabelRight = styled(LabelLeft)`
    align-items: flex-end;
    justify-content: flex-end;
  `;


const LabelLeftContainer = styled(LabelLeft)`
  font-weight: 700;
  `;

const LabelRightContainer = styled(LabelRight)`
  font-weight: 700;
  color:${colors.blue}
  `;
const Collection = styled.div`
    // border: 1px solid #EEEEEE
  `;

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-input": {
            color: "#777777",
            padding: '8px',
            minHeight: '40'
        },
    },
    borderListCollection: {
        borderRight: '1px solid #EEEEEE',
    }
});

