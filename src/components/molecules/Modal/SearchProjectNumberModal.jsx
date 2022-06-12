import { Button, Grid, Stack, Box, TextField, Modal, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import DatePicker from "@mui/lab/DatePicker";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../atoms";
import { apiCall } from "../../../services/httpService"
import DataGrid from 'react-data-grid'
import { ModalHeader } from "../../atoms"
import { ModalFooter } from "../../atoms"

import {
  getProjectNameAction,
  getProjectNameResetAction,
  getProjectNumberAction,
  getProjectNumberResetAction,
  getClientNameAction,
  getClientNameResetAction,
  getKeyMemberAction,
  getKeyMemberResetAction,
  getKeyRoleAction,
  getKeyRoleResetAction,
  getContractTypeAction,
  getContractTypeResetAction,
  getLegalEntityAction,
  getLegalEntityResetAction,
  getPUAction,
  getPUResetAction,
  getAgreementAction,
  getAgreementResetAction,
  getProjectStatusAction,
  getProjectStatusResetAction,
  getUmbrellaCodeAction,
  getUmbrellaCodeResetAction,
  getContractNumberAction,
  getContractNumberResetAction,
  selectedProjectNumberAction
} from "./logic";
import { saveAllianceProjectAction, saveAllianceProjectFlagResetAction } from '../Steppar/logic'
import { SEARCH_PROJECT_COLUMNS } from '../Steppar/constants'
import { format } from "date-fns"
import SearchProject from "../Steppar/SearchProject";
import { projectOrAllianceChangeResetAction, projectOrAllianceChangeSuccessAction } from "../../../redux/common/logic";
const INPUT = {
  ...{
    PROJECT_STATUS: '',
    PROJECT_NUMBER: '',
    CLIENT_NAME: '',
    KEY_MEMBER: '',
    KEY_ROLE: '',
    CREATED_DATE: '',
    CONTRACT_TYPE: '',
    LEGAL_ENTITY: '',
    PU: '',
    AGREEMENT: '',
    PROJECT_NAME: '',
    UMBRELLA_CODE: '',
    CONTRACT_NUMBER: '',

  }
}

function SearchProjectNumberModal({ open = false, onClose = () => null, isCollectionExist = false }) {
  const dispatch = useDispatch();
  const { data: generateCollectionId } = useSelector(state => state.getGenerateCollectionId);
  const [searchProject, setSearchProject] = useState(INPUT);
  const [searchProjectList,setSearchProjectList] = useState(INPUT)
  const { flag: saveAlliancProjectFlag } = useSelector(state => state.saveAllianceProjectReducer)
  const {
    flag: projectSearchFlag,
    error: projectSearchError,
    data: projectSearchList,
  } = useSelector((state) => state.getProjectSearchReducer);

  const {
    flag: getProjectNameFlag,
    error: getProjectNameError,
    data: getProjectName,
  } = useSelector((state) => state.getProjectNameReducer);
  const {
    flag: getProjectNumberFlag,
    error: getProjectNumberError,
    data: getProjectNumber,
  } = useSelector((state) => state.getProjectNumberReducer);
  const {
    flag: getClientNameFlag,
    error: getClientNameError,
    data: getClientName,
  } = useSelector((state) => state.getClientNameReducer);
  const {
    flag: getKeyMemberFlag,
    error: getKeyMemberError,
    data: getKeyMember,
  } = useSelector((state) => state.getKeyMemberReducer);
  const {
    flag: getKeyRoleFlag,
    error: getKeyRoleError,
    data: getKeyRole,
  } = useSelector((state) => state.getKeyRoleReducer);
  const {
    flag: getContractTypeFlag,
    error: getContractTypeError,
    data: getContractType,
  } = useSelector((state) => state.getContractTypeReducer);
  const {
    flag: getLegalEntityFlag,
    error: getLegalEntityError,
    data: getLegalEntity,
  } = useSelector((state) => state.getLegalEntityReducer);
  const {
    flag: getPUFlag,
    error: getPUError,
    data: getPU,
  } = useSelector((state) => state.getPUReducer);
  const {
    flag: getAgreementFlag,
    error: getAgreementError,
    data: getAgreement,
  } = useSelector((state) => state.getAgreementReducer);
  const {
    flag: getProjectStatusFlag,
    error: getProjectStatusError,
    data: getProjectStatus,
  } = useSelector((state) => state.getProjectStatusReducer);
  const {
    flag: getUmbrellaCodeFlag,
    error: getUmbrellaCodeError,
    data: getUmbrellaCode,
  } = useSelector((state) => state.getUmbrellaCodeReducer);
  const {
    flag: selectedProjectNumberFlag,
    error: selectedProjectNumberError,
    data: selectedProjectNumber,
  } = useSelector((state) => state.selectedProjectNumberReducer);
  
  const {
    flag: getContractNumberFlag,
    error: getContractNumberError,
    data: getContractNumber,
  } = useSelector((state) => state.getContractNumberReducer);
  const [advanced, setAdvanced] = useState(false)
  const [projectNumberState, setProjectNumberState] = useState(false);
  const [projectNameState, setProjectNameState] = useState(false);
  const [clientNameState, setClientNameState] = useState(false);
  const [keyMemberState, setKeyMemberState] = useState(false);
  const [keyRoleState, setKeyRoleState] = useState(false);
  const [contractTypeState, setContractTypeState] = useState(false);
  const [legalEntityState, setLegalEntityState] = useState(false);
  const [PUState, setPUState] = useState(false);
  const [agreementState, setAgreementState] = useState(false);
  const [projectStatusState, setProjectStatusState] = useState(false);
  const [umbrellaCodeState, setUmbrellaCodeState] = useState(false);
  const [contractNumberState, setContractNumberState] = useState(false);
  const [projectFind, setProjectFind] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [errorKeyMessage,setErrorKeyMessage] = useState(false)
  const [selectedProjectNum, setSelectedProjectNum] = useState([])
  const projectNumberDetailRef = useRef('')
  const projectNameDetailRef = useRef('')
  const clientNameDetailRef = useRef('');
  const datePickerDetailRef = useRef('');
  const keyMemberDetailRef = useRef('');
  const keyRoleDetailRef = useRef('');
  const contractTypeDetailRef = useRef('');
  const legalEntityDetailRef = useRef('');
  const PUDetailRef = useRef('');
  const agreementDetailRef = useRef('')
  const projectStatusDetailRef = useRef('')
  const umbrellaCodeDetailRef = useRef('')
  const contractNumberDetailRef = useRef('')


  useEffect(() => {
    if (projectSearchFlag) {
      setProjectFind(true)
    }
  }, [projectSearchFlag])

  useEffect(() => {
    if (saveAlliancProjectFlag) {
      dispatch(saveAllianceProjectFlagResetAction())
      dispatch(selectedProjectNumberAction({ CollectionId: generateCollectionId[0] }, isCollectionExist))
    }
  }, [saveAlliancProjectFlag])

  useEffect(() => {
    dispatch(selectedProjectNumberAction({ CollectionId: generateCollectionId[0] }, isCollectionExist))
  }, [])
  useEffect(() => {
    if (selectedProjectNumberFlag) {
      setSelectedProjectNum(selectedProjectNumber)
    }
  }, [selectedProjectNumberFlag])

  const handleInputChange = (searchkey, event) => {
    event.preventDefault()
    const { name, value } = event.target
    setSearchProject({
      ...searchProject,
      [name]: value,
    })
    if (value.length >= 3) {
      switch (searchkey) {
        case "CLIENT_NAME":
          return dispatch(getClientNameAction(value))
        case "PROJECT_NAME":
          return dispatch(getProjectNameAction(value))
        case "PROJECT_NUMBER":
          return dispatch(getProjectNumberAction(value))
        case "KEY_MEMBER":
          return dispatch(getKeyMemberAction(value))
        case "KEY_ROLE":
          return dispatch(getKeyRoleAction(value))
        case "CONTRACT_TYPE":
          return dispatch(getContractTypeAction(value))
        case "LEGAL_ENTITY":
          return dispatch(getLegalEntityAction(value))
        case "PU":
          return dispatch(getPUAction(value))
        case "AGREEMENT":
          return dispatch(getAgreementAction(value))
        case "PROJECT_STATUS":
          return dispatch(getProjectStatusAction(value))
        case "UMBRELLA_CODE":
          return dispatch(getUmbrellaCodeAction(value))
        case "CONTRACT_NUMBER":
          return dispatch(getContractNumberAction(value))
        default:
          break
      }
    } else {
      dispatch(getClientNameResetAction(false))
    }

  }
  const handleDateChange = (searchKey, value) => {
    const formatDate = format(value, "dd-MMM-yyyy")
    const name = searchKey
    setSearchProject({
      ...searchProject,
      [name]: formatDate,
    })
    setSearchProjectList({
      ...searchProjectList,
      [name]: formatDate
    })
    datePickerDetailRef.current = formatDate
  }

  const clearInputField = (name) => {
    setSearchProject({
      ...searchProject,
      [name]: '',
    })
  }
  /* Project Number*/
  const getProjectNumberHandler = (name, option)=> {
    dispatch(getProjectNumberResetAction())
    setProjectNumberState(true)
    projectNumberDetailRef.current = option.DESCRIPTION
    clearInputField(name)
  }
  const closeProjectNumberList = (event) => {
    const {name,value} = event.target
    if( projectNumberDetailRef.current !== '') {
      projectNumberDetailRef.current = projectNumberDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: projectNumberDetailRef.current,
      })
    }else {
      projectNumberDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }  
    dispatch(getProjectNumberResetAction())
  } 
  const handleClearProjectNumber = () => {
    setProjectNumberState(false)
    projectNumberDetailRef.current = ''
    dispatch(getProjectNumberResetAction())

  }
  /* Project*/
  const getProjectNameHandler = (name, option) => {
    dispatch(getProjectNameResetAction())
    setProjectNameState(true)
    projectNameDetailRef.current = option.DESCRIPTION
    clearInputField(name)

  }
  const closeProjectNameList = (event) => {
    const {name,value} = event.target
    if( projectNameDetailRef.current !== '') {
      projectNameDetailRef.current = projectNameDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: projectNameDetailRef.current,
      })
    }else {
      projectNameDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }  
    dispatch(getProjectNameResetAction())
  
  }
  const handleClearProjectName = () => {
    projectNameDetailRef.current = ''
    setProjectNameState(false)
  }

  /* Client Name */
  const getClientNameHandler = (name, option) => {
    dispatch(getClientNameResetAction(false))
    setClientNameState(true)
    clientNameDetailRef.current = option.DESCRIPTION
    clearInputField(name)

  }
  const handleClearClientName = () => {
    clientNameDetailRef.current = ''
    setClientNameState(false)
  }
  const closeClientNameList = (event) => {
    const {name,value} = event.target
    if( clientNameDetailRef.current !== '') {
      clientNameDetailRef.current = clientNameDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: clientNameDetailRef.current,
      })
    }else {
      clientNameDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }
    dispatch(getClientNameResetAction())
  }

  /* Key Member */

  const getKeyMemberHandler = (name, option) => {
    dispatch(getKeyMemberResetAction())
    setKeyMemberState(true)
    keyMemberDetailRef.current = option.DESCRIPTION    
    clearInputField(name)

  }
  const closeKeyMemberList = (event) => {
    setErrorKeyMessage(false)
    const {name,value} = event.target
    if( keyMemberDetailRef.current !== '') {
      keyMemberDetailRef.current = keyMemberDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: keyMemberDetailRef.current,
      })
    }else {
      keyMemberDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }
    keyMemberRoleList()
    dispatch(getKeyMemberResetAction())
  }
  const handleClearKeyMember = () => {
    setKeyMemberState(false)
    keyMemberDetailRef.current = ''
  }
  /* Key Role */
  const getKeyRoleHandler = (name, option) => {
    dispatch(getKeyRoleResetAction())
    setKeyRoleState(true)
    keyRoleDetailRef.current = option.DESCRIPTION   
    clearInputField(name)
  }

  const closeKeyRoleList = (event) => {
    setErrorKeyMessage(false)
    const {name,value} = event.target
    if( keyRoleDetailRef.current !== '') {
      keyRoleDetailRef.current = keyRoleDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: keyRoleDetailRef.current,
      })
    }else {
      keyRoleDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }
    keyMemberRoleList()    
    dispatch(getKeyRoleResetAction())
  }
  const handleClearKeyRole = () => {
    setKeyRoleState(false)
    keyRoleDetailRef.current = ''
  }
  const keyMemberRoleList = () => {
    if (keyMemberDetailRef.current === '' && keyRoleDetailRef.current === ''){
      setErrorKeyMessage(false)
    }
    else if(keyMemberDetailRef.current === '' ||  keyRoleDetailRef.current === ''){
      setErrorKeyMessage(true)
    } 
  }

  /* Contract Type*/
  const getContractTypeHandler = (name, option) => {
    dispatch(getContractTypeResetAction())
    setContractTypeState(true)
    contractTypeDetailRef.current = option.DESCRIPTION
    clearInputField(name)

  }
  const closeContractTypeList = (event) => {
    const {name,value} = event.target
    if( contractTypeDetailRef.current !== '') {
      contractTypeDetailRef.current = contractTypeDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: contractTypeDetailRef.current,
      })
    }else {
      contractTypeDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }
    dispatch(getContractTypeResetAction())
  }
  const handleClearContractType = () => {
    setContractTypeState(false)
    contractTypeDetailRef.current  = ''
  }

  /* Legal Entity*/
  const getLegalEntityHandler = (name, option) => {
    dispatch(getLegalEntityResetAction())
    setLegalEntityState(true)
    legalEntityDetailRef.current = option.DESCRIPTION
    clearInputField(name)

  }
  const closeLegalEntityList = (event) => {
    const {name,value} = event.target
    if( legalEntityDetailRef.current !== '') {
      legalEntityDetailRef.current = legalEntityDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: legalEntityDetailRef.current,
      })
    }else {
      legalEntityDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }

    dispatch(getLegalEntityResetAction())
  }
  const handleClearLegalEntity = () => {
    setLegalEntityState(false)
    legalEntityDetailRef.current = ''
  }

  /* PU*/
  const getPUHandler = (name, option) => {
    dispatch(getPUResetAction())
    setPUState(true)
    PUDetailRef.current = option.DESCRIPTION
    clearInputField(name)
  }
  const closePUList = (event) => {
    const {name,value} = event.target
    if( PUDetailRef.current !== '') {
      PUDetailRef.current = PUDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: PUDetailRef.current,
      })
    }else {
      PUDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }

    dispatch(getPUResetAction())
  }
  const handleClearPU = () => {
    setPUState(false)
    PUDetailRef.current = ''

  }
  /*  Agreement */
  const getAgreementHandler = (name, option) => {
    dispatch(getAgreementResetAction());
    setAgreementState(true);
    agreementDetailRef.current = option.DESCRIPTION;
    clearInputField(name)

  };
  const closeAgreementList = (event) => {
    const {name,value} = event.target
    if( agreementDetailRef.current !== '') {
      agreementDetailRef.current = agreementDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: agreementDetailRef.current,
      })
    }else {
      agreementDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }
    dispatch(getAgreementResetAction())
  }
  const handleClearAgreement = () => {
    setAgreementState(false)
    agreementDetailRef.current = ''
  };
  /* Project Status*/
  const getProjectStatusHandler = (name, option) => {
    dispatch(getProjectStatusResetAction())
    setProjectStatusState(true)
    projectStatusDetailRef.current = option.DESCRIPTION
    clearInputField(name)

  };
  const closeProjectStatusList = (event) => {
    const {name,value} = event.target
    if( projectStatusDetailRef.current !== '') {
      projectStatusDetailRef.current = projectStatusDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: projectStatusDetailRef.current,
      })
    }else {
      projectStatusDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }
    dispatch(getProjectStatusResetAction())
  }
  const handleClearProjectStatus = () => {
    setProjectStatusState(false)
    projectStatusDetailRef.current =''
  };

  /* Umbrella Code */
  const getUmbrellaCodeHandler = (name, option) => {
    dispatch(getUmbrellaCodeResetAction());
    setUmbrellaCodeState(true);
    umbrellaCodeDetailRef.current = option.DESCRIPTION;
    clearInputField(name)
  };
  const closeUmbrellaCodeList = (event) => {
    const {name,value} = event.target
    if( umbrellaCodeDetailRef.current !== '') {
      umbrellaCodeDetailRef.current = umbrellaCodeDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: umbrellaCodeDetailRef.current,
      })
    }else {
      umbrellaCodeDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }

    dispatch(getUmbrellaCodeResetAction());
  }
  const handleClearUmbrellaCode = () => {
    setUmbrellaCodeState(false)
    umbrellaCodeDetailRef.current = ''
  };

  /* Contract Number */
  const getContractNumberHandler = (name, option) => {
    dispatch(getContractNumberResetAction());
    setContractNumberState(true);   
    contractNumberDetailRef.current = option.DESCRIPTION;
    clearInputField(name)
  };
  const closeContractNumberList = (event) => {
    const {name,value} = event.target
    if( contractNumberDetailRef.current !== '') {
      contractNumberDetailRef.current = contractNumberDetailRef.current
      setSearchProjectList({
        ...searchProjectList,
        [name]: contractNumberDetailRef.current,
      })
    }else {
      contractNumberDetailRef.current = value
      setSearchProjectList({
        ...searchProjectList,
        [name]: value,
      })
    }

    dispatch(getContractNumberResetAction());
  }
  const handleClearContractNumber = () => {
    setContractNumberState(false)
    contractNumberDetailRef.current = ''
  };
  const request = {
    ProjectNumber: searchProjectList.PROJECT_NUMBER,
    ProjectName: searchProjectList.PROJECT_NAME,
    ClientName: searchProjectList.CLIENT_NAME,
    MemberName: searchProjectList.KEY_MEMBER,
    MemberRole: searchProjectList.KEY_ROLE,
    ProjecrCrDate: searchProjectList.CREATED_DATE,
    ContractType: searchProjectList.CONTRACT_TYPE,
    LegalEntity: searchProjectList.LEGAL_ENTITY,
    PU: searchProjectList.PU,
    Agreement: searchProjectList.AGREEMENT,
    ProjectStatus: searchProjectList.PROJECT_STATUS,
    UmbrellaCode: searchProjectList.UMBRELLA_CODE,
    ContractNumber: searchProjectList.CONTRACT_NUMBER,
    LoginUserCustomerID: 0,
    LoginUserRoleType: ''
  }
  const onSearch = () => setOpenSearch(true)

  const onSearchedData = async (selectedData, oldData) => {
    let optionSelected = selectedData
    if (isCollectionExist) {
      optionSelected = selectedData.filter(d => oldData.findIndex(z => z.PROJECT_ID === d.PROJECT_ID) === -1)
    }
    if (optionSelected.length) {
      optionSelected = selectedData.filter(d => oldData.findIndex(z => z.PROJECT_ID === d.PROJECT_ID) === -1)
      const payload = optionSelected.map(project => ({
        ...(isCollectionExist ? { "collectioN_ID": generateCollectionId[0] } : {}),
        "allC_PROJ_GROUP_ID": 0,
        "alliancE_CODE1": project?.ALLIANCE_CODE_1 || '',
        "alliancE_CODE2": project?.ALLIANCE_CODE_2 || '',
        "alliancE_CODE3": project?.ALLIANCE_CODE_3 || '',
        "projecT_ID": String(project?.PROJECT_ID) || '',
        "autO_ADD_PROJECT_COLLECTION": "N",
        "assigN_TYPE": "P",
        "addinG_SCENARION": "I",
        "addinG_LEVEL": "P"
      }));
      dispatch(saveAllianceProjectAction(payload, generateCollectionId, isCollectionExist))
    }
  }
  const onRowDelete = async (d,type) => {
    let payload;
    if(type === 'save'){
      payload= [{ 'allC_PROJ_GROUP_ID': (isCollectionExist ? d.ALLC_PROJ_GROUP_ID : 0), "assigN_TYPE": "P", "projecT_ID": d.PROJECT_ID }]
    }
    else if(type === 'cancel'){
      payload = d
    }
    
    try {
      const response = await apiCall({
        method: 'DELETE',
        url: isCollectionExist ? '/DeleteProjectAllocation' : '/DeleteProjectTempAllocation',
        params: { CollectionID: generateCollectionId[0] },
        data: payload
      })
      dispatch(projectOrAllianceChangeSuccessAction())
      dispatch(selectedProjectNumberAction({ CollectionId: generateCollectionId[0] }, isCollectionExist))
      dispatch(projectOrAllianceChangeResetAction())
    } catch (error) {
      // dispatch(selectedProjectNumberAction({ CollectionId: generateCollectionId[0] }, isCollectionExist))

    }
  }
  const onAdvancedSearch = () => {
    setAdvanced(!advanced)
    setSearchProject(INPUT)
  }
  const onCancel = async () =>{
    // if (!isCollectionExist) {
    //   if(selectedProjectNum.length > 0){
    //     const payload = selectedProjectNum.map(d=>({
    //               'allC_PROJ_GROUP_ID': (isCollectionExist ? d.ALLC_PROJ_GROUP_ID : 0), 
    //               "assigN_TYPE": "P", 
    //               "projecT_ID": d.PROJECT_ID }))
    //               onRowDelete(payload,'cancel')    
    //   }
    // }
    onClose()
  }

  const SelectedProjectRefValue = projectNumberDetailRef.current === '' &&  projectNameDetailRef.current === '' &&  clientNameDetailRef.current === '' &&
                                  datePickerDetailRef.current === '' && keyMemberDetailRef.current === '' && keyRoleDetailRef.current === '' && contractTypeDetailRef.current === '' && legalEntityDetailRef.current === '' &&  PUDetailRef.current === '' &&
                                  agreementDetailRef.current === '' &&  projectStatusDetailRef.current === '' &&  umbrellaCodeDetailRef.current === '' &&  contractNumberDetailRef.current === '';


 return (
    <Modal open={open} >
      <Box sx={style} className="searchProjectContainer">
      
        {/* <Header className="headerBox"> */}
        <ModalHeader>
           <HeaderTitle  data-testid="search-project-number">
            Search Project Number(s)
          </HeaderTitle>
          <div onClick={onClose}>
            <Icon name="close" />
          </div></ModalHeader>
       
        {/* </Header> */}
        
          <Box style={{ overflow: 'auto', maxHeight: 'calc(95vh - 135px)',height:'1100px' }}>
            <Grid  container spacing={3} p={2} className="searchProjectForm">
              <Grid item xs={3}>
                <List>
                  <Label>Project number</Label>
                  <Input
                    type="text"
                    name="PROJECT_NUMBER"
                    placeholder={projectNumberState ? '' : "Please Search"}
                    value={searchProject.PROJECT_NUMBER}
                    onChange={(event) => handleInputChange("PROJECT_NUMBER", event)}
                    onFocus={handleClearProjectNumber}
                    onBlur={closeProjectNumberList}
                  />
                  {projectNumberState && (
                    <StyledTag >
                      <Description>
                        <div className='text-overflow' >{projectNumberDetailRef.current}</div>
                        <CloseIcon onClick={handleClearProjectNumber}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  )}
                </List>
                {getProjectNumberFlag ? (
                  <Listbox>
                    {getProjectNumber.length > 0 &&
                      getProjectNumber.map((option, index) => (
                        <li
                        onMouseDown={() =>
                            getProjectNumberHandler(
                              "PROJECT_NUMBER",
                              option
                            )
                          }
                          key={option.ID}
                        >
                          <span>{option.DESCRIPTION}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Project name</Label>
                  <Input
                    type="text"
                    name="PROJECT_NAME"
                    placeholder={projectNameState ? '' : "Please Search"}
                    value={searchProject.PROJECT_NAME}
                    onChange={(event) => handleInputChange("PROJECT_NAME", event)}
                    onFocus={handleClearProjectName}
                    onBlur={closeProjectNameList}
                  />
                  {projectNameState && (
                    <>
                      <StyledTag>
                        <Description>
                          <div className='text-overflow' >{projectNameDetailRef.current}</div> 
                          <CloseIcon onClick={handleClearProjectName}><Icon name="close"  /></CloseIcon>
                        </Description>
                      </StyledTag>
                    </>
                  )}
                </List>
                {getProjectNameFlag ? (
                  <Listbox>
                    {getProjectName.length > 0 &&
                      getProjectName.map((option, index) => (
                        <li
                          onMouseDown={() =>
                            getProjectNameHandler(
                              "PROJECT_NAME",
                              option
                            )
                          }
                          key={option.ID}
                        >
                          <span>{option.DESCRIPTION}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Client’s name</Label>
                  <Input
                    type="text"
                    name="CLIENT_NAME"
                    placeholder={clientNameState ? '' : "Please Search"}
                    value={searchProject.CLIENT_NAME}
                    onChange={(event) => handleInputChange("CLIENT_NAME", event)}
                    onFocus={handleClearClientName}
                    onBlur={closeClientNameList}

                  />
                  {clientNameState && (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{clientNameDetailRef.current}</div>
                        <CloseIcon onClick={handleClearClientName}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  )}
                </List>
                {getClientNameFlag ? (
                  <Listbox>
                    {getClientName.length > 0 &&
                      getClientName.map((option, index) => (
                        <li
                          onMouseDown={() =>
                            getClientNameHandler(
                              "CLIENT_NAME",
                              option
                            )
                          }
                          key={option.ID}
                        >
                          <span>{option.DESCRIPTION}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Project creation date</Label>
                  <DatePicker
                    fullWidth
                    value={searchProject.CREATED_DATE || null}
                    onChange={(event) => handleDateChange("CREATED_DATE", event)}
                    inputFormat="dd-MMM-yyyy"
                    renderInput={(params) => (
                      <TextField fullWidth {...params} size="small" />
                    )}
                  />
                </List>
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Key role</Label>
                  <Input
                    type="text"
                    name="KEY_ROLE"
                    placeholder={keyRoleState ? '' : "Please Search"}
                    value={searchProject.KEY_ROLE}
                    onChange={(event) => handleInputChange("KEY_ROLE", event)}
                    onFocus={handleClearKeyRole}
                    onBlur={closeKeyRoleList}

                  />
                  {keyRoleState && (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{keyRoleDetailRef.current}</div>
                        <CloseIcon onClick={handleClearKeyRole}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  )}
                </List>
                {getKeyRoleFlag ? (
                  <Listbox>
                    {getKeyRole.length > 0 &&
                      getKeyRole.map((option, index) => (
                        <li
                          onMouseDown={() =>
                            getKeyRoleHandler("KEY_ROLE",option)
                          }
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Key member</Label>
                  <Input
                    type="text"
                    name="KEY_MEMBER"
                    placeholder={keyMemberState ? '' : "Please Search"}
                    value={searchProject.KEY_MEMBER}
                    onChange={(event) => handleInputChange("KEY_MEMBER", event)}
                    onFocus={handleClearKeyMember}
                    onBlur={closeKeyMemberList}

                  />
                  {keyMemberState && (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{keyMemberDetailRef.current}</div>
                        <CloseIcon onClick={handleClearKeyMember}><Icon name="close"  /></CloseIcon>
                      </Description>
                  
                    </StyledTag>
                  )}
                </List>
                {getKeyMemberFlag ? (
                  <Listbox>
                    {getKeyMember.length > 0 &&
                      getKeyMember.map((option, index) => (
                        <li
                          onMouseDown={() =>
                            getKeyMemberHandler("KEY_MEMBER", option)
                          }
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>

              <Grid item xs={3}>
                <List>
                  <Label>Contract type</Label>
                  <Input
                    type="text"
                    name="CONTRACT_TYPE"
                    placeholder={contractTypeState ? '' : "Please Search"}
                    value={searchProject.CONTRACT_TYPE}
                    onChange={(event) =>
                      handleInputChange("CONTRACT_TYPE", event)
                    }
                    onFocus={handleClearContractType}
                    onBlur={closeContractTypeList}

                  />
                  {contractTypeState ? (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{contractTypeDetailRef.current}</div>
                        <CloseIcon onClick={handleClearContractType}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  ) : null}
                </List>
                {getContractTypeFlag ? (
                  <Listbox>
                    {getContractType.length > 0 &&
                      getContractType.map((option, index) => (
                        <li
                          onMouseDown={() =>
                            getContractTypeHandler(
                              "CONTRACT_TYPE",
                            option
                            )
                          }
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Legal entity</Label>
                  <Input
                    type="text"
                    name="LEGAL_ENTITY"
                    placeholder={legalEntityState ? '' : "Please Search"}
                    value={searchProject.LEGAL_ENTITY}
                    onChange={(event) => handleInputChange("LEGAL_ENTITY", event)}
                    onFocus={handleClearLegalEntity}
                    onBlur={closeLegalEntityList}

                  />
                  {legalEntityState ? (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{legalEntityDetailRef.current}</div>
                        <CloseIcon onClick={handleClearLegalEntity}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  ) : null}
                </List>
                {getLegalEntityFlag ? (
                  <Listbox>
                    {getLegalEntity.length > 0 &&
                      getLegalEntity.map((option, index) => (
                        <li
                          onMouseDown={(event) =>
                            getLegalEntityHandler(
                              "LEGAL_ENTITY",
                            option
                            )
                          }
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              {advanced && (
                <>
              <Grid item xs={3}>
                <List>
                  <Label>PU</Label>
                  <Input
                    type="text"
                    name="PU"
                    placeholder={PUState ? '' : "Please Search"}
                    value={searchProject.PU}
                    onChange={(event) => handleInputChange("PU", event)}
                    onFocus={handleClearPU}
                    onBlur={closePUList}

                  />
                  {PUState ? (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{PUDetailRef.current}</div>
                        <CloseIcon onClick={handleClearPU}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  ) : null}
                </List>
                {getPUFlag ? (
                  <Listbox>
                    {getPU.length > 0 &&
                      getPU.map((option, index) => (
                        <li
                          onMouseDown={() => getPUHandler("PU",option)}
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Agreement</Label>
                  <Input
                    type="text"
                    name="AGREEMENT"
                    placeholder={agreementState ? '' : "Please Search"}
                    value={searchProject.AGREEMENT}
                    onChange={(event) => handleInputChange("AGREEMENT", event)}
                    onFocus={handleClearAgreement}
                    onBlur={closeAgreementList}

                  />
                  {agreementState ? (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{agreementDetailRef.current}</div>
                        <CloseIcon onClick={handleClearAgreement}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  ) : null}
                </List>
                {getAgreementFlag ? (
                  <Listbox>
                    {getAgreement.length > 0 &&
                      getAgreement.map((option, index) => (
                        <li
                          onMouseDown={(event) =>
                            getAgreementHandler("AGREEMENT",option)
                          }
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Project status</Label>
                  <Input
                    type="text"
                    name="PROJECT_STATUS"
                    placeholder={projectStatusState ? '' : "Please Search"}
                    value={searchProject.PROJECT_STATUS}
                    onChange={(event) =>
                      handleInputChange("PROJECT_STATUS", event)
                    }
                    onFocus={handleClearProjectStatus}
                    onBlur={closeProjectStatusList}

                  />
                  {projectStatusState ? (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{projectStatusDetailRef.current}</div>
                        <CloseIcon onClick={handleClearProjectStatus}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  ) : null}
                </List>
                {getProjectStatusFlag ? (
                  <Listbox>
                    {getProjectStatus.length > 0 &&
                      getProjectStatus.map((option, index) => (
                        <li
                          onMouseDown={(event) =>
                            getProjectStatusHandler(
                              "PROJECT_STATUS",
                            option
                            )
                          }
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Umbrella code</Label>
                  <Input
                    type="text"
                    name="UMBRELLA_CODE"
                    placeholder={umbrellaCodeState ? '' : "Please Search"}
                    value={searchProject.UMBRELLA_CODE}
                    onChange={(event) =>
                      handleInputChange("UMBRELLA_CODE", event)
                    }
                    onFocus={handleClearUmbrellaCode}
                    onBlur={closeUmbrellaCodeList}

                  />
                  {umbrellaCodeState ? (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{umbrellaCodeDetailRef.current}</div>
                        <CloseIcon onClick={handleClearProjectStatus}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  ) : null}
                </List>
                {getUmbrellaCodeFlag ? (
                  <Listbox>
                    {getUmbrellaCode.length > 0 &&
                      getUmbrellaCode.map((option, index) => (
                        <li
                          onMouseDown={() =>
                            getUmbrellaCodeHandler(
                              "UMBRELLA_CODE",
                            option
                            )
                          }
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
              <Grid item xs={3}>
                <List>
                  <Label>Contract number </Label>
                  <Input
                    type="text"
                    name="CONTRACT_NUMBER"
                    placeholder={contractNumberState ? '' : "Please Search"}
                    value={searchProject.CONTRACT_NUMBER}
                    onChange={(event) =>
                      handleInputChange("CONTRACT_NUMBER", event)
                    }
                    onFocus={handleClearContractNumber}
                    onBlur={closeContractNumberList}

                  />
                  {contractNumberState ? (
                    <StyledTag>
                      <Description>
                        <div className='text-overflow' >{contractNumberDetailRef.current}</div>
                        <CloseIcon onClick={handleClearContractNumber}><Icon name="close"  /></CloseIcon>
                      </Description>
                    </StyledTag>
                  ) : null}
                </List>
                {getContractNumberFlag ? (
                  <Listbox>
                    {getContractNumber.length > 0 &&
                      getContractNumber.map((option, index) => (
                        <li
                          onMouseDown={() =>
                            getContractNumberHandler(
                              "CONTRACT_NUMBER", option
                            )
                          }
                          key={option.ID}
                        >
                          <span>{option["DESCRIPTION"]}</span>
                        </li>
                      ))}
                  </Listbox>
                ) : null}
              </Grid>
                </>

              )}
              {errorKeyMessage && (
                      <Grid  item md={12} sm={12} xs={12} lg={12} >
                          <Label style={{color:'#D72850'}}>Key role is required alongwith key member</Label>
                      </Grid>
                )}
              <Grid item md={12} sm={12} xs={12} lg={12} >
                <Stack direction="row" alignItems="center" spacing={3} >
                  <Button size='small' disabled={SelectedProjectRefValue || errorKeyMessage} variant="contained" onClick={onSearch}>
                    Search
                  </Button>             
                  <BootstrapButton onClick={onAdvancedSearch} >{!advanced ? 'Advanced search' : 'Basic Search'}</BootstrapButton>
                </Stack>
              </Grid>
              {selectedProjectNum.length > 0 && (
                <TableContent>
                  <Box m={3}>
                    <DataGrid
                    style={{height: '60vh' }} 
                      rowHeight={40}
                      headerRowHeight={60}
                      rowKeyGetter={row => row.PROJECT_ID}
                      columns={[
                        ...SEARCH_PROJECT_COLUMNS,
                        {
                          resizable: false,
                          width: 50,
                          "key": "",
                          "name": "",
                          "formatter": ({ row, otherFunctions }) => {
                            const { onRowDelete = () => null } = otherFunctions
                            return <IconButton onClick={() => onRowDelete(row,'save')} ><i className="lar la-times-circle" /></IconButton>
                          }
                        },
                      ]}
                      rows={selectedProjectNum}
                      otherFunctions={{ onRowDelete }}
                    />
                  </Box>
                </TableContent>

              )}

            </Grid>
        </Box>
        {openSearch && <SearchProject active={selectedProjectNum} onCancel={onCancel} onSave={onSearchedData} params={request} open={true} onClose={() => setOpenSearch(false)} />}

        <ModalFooter>
          <Stack
            width="100%"
            spacing={2}
            direction="row"
            justifyContent="flex-end"
          >
            {/* <Button onClick={onCancel}>Cancel</Button> */}
            <Button disabled={isCollectionExist ? false : (selectedProjectNum.length === 0)} onClick={onClose} variant="contained">
              Done
            </Button>
            {/* disabled={disabled}  */}
          </Stack>
        </ModalFooter>

      </Box>
    </Modal>
  );
}
export default SearchProjectNumberModal

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "90%",
  maxHeight: '95vh',
  transform: "translate(-50%, -50%)",
  bgcolor: "#FDFDFD",
  boxShadow: 24,
  borderRadius: "6px",
};


const BootstrapButton = styled('div')({
  textDecoration: 'underline',
  fontSize: 14,
  lineHeight: 1.5,
  cursor: 'pointer',
});

const HeaderTitle = styled("div")({
  fontWeight: "800",
  fontSize: "14px",
  lineHeight: "24px",
  fontFamily: " Jacobs Chronos Bold"
});


const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
  font-size: 14px;
  font-family: "Jacobs Chronos";
  font-weight: 400;
`;

const StyledTag = styled("div")`
  padding: 0px 5px;
  position: absolute;
  top: 34px;
  left: 10px;
  background: rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  height:28px;
  white-space: nowrap;
  color: #222222;
  max-width: calc(100% - 20px);
`;
const CloseIcon = styled("div")`
    display: inline-block;
    vertical-align: bottom;
    margin-left: 5px;
    cursor: pointer;
`;
const Description = styled("div")`   
font-size:12px;
padding-left: 12px;
display: flex;
align-items: center;
height: 28px;
`;
const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
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
    background-color: #fafafa};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);
const Input = styled("input")`
  padding: 10px;
  border: 1px solid #D2D2D2;
  width: 100%;
  border-radius: 5px;
  height: 40px;
`;

const List = styled("div")`
  position: relative;
`;
const TableContent = styled('div')({
  overflow: 'auto',
  width: "100%"
})


