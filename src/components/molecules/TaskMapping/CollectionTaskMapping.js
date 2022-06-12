import {  Modal,Box,styled, Button,Stack,Radio,Grid,FormControlLabel,RadioGroup,
          FormControl,FormGroup,Checkbox } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState, useEffect, useRef } from "react";
import {getNameOfCharactersMappingAction,getNameOfCharactersMappingResetAction,
        getTaskNumberNameMappingAction,getTaskNumberNameMappingResetAction,
        getTaskLevelMappingAction,getTaskLevelMappingResetAction,
        getEditTaskMappingGroupingAction,getEditTaskMappingGroupingResetAction,globalTaskMappingGroupingAction,globalTaskMappingGroupingResetAction} from "./logic";
import { useDispatch, useSelector } from "react-redux";
import { backDropLoaderCloseAction,backDropLoaderOpenAction} from "../BackDropLoader/logic";
import Slider from "@mui/material/Slider";
import { Icon } from '../../atoms';
import { format } from 'date-fns';
import '../TaskMapping/TaskMappingStyles.css';


function CollectionTaskMapping({ open = false, onClose = () => null }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [group, setGroup] = useState({ tasks: ""});
  const [inputTask, setInputTask] = useState({
    TASK_NUMBER: "",
    TASK_LONG_NAME: "",
    TASK_MAP_TO: "",
  });
  const { error: getEditAllTaskError, data:getEditAllTaskData,flag: getEditAllTaskFlag } = useSelector(state=> state.getEditTaskMappingGroupingReducer);
  const{ error:taskLevelError,flag:taskLevelFlag} = useSelector(state=>state.getTaskLevelMappingReducer)
  const{ error:taskNumberNameError,flag:taskNumberNameFlag} = useSelector(state=>state.getTaskNumberNameMappingReducer)
  const{ error:taskNameError,flag:taskNameFlag} = useSelector(state=>state.getNameOfCharactersMappingReducer)
  const{ error:globalTaskError,flag:globalTaskFlag} = useSelector(state=>state.globalTaskMappingGrouping)
  const collectionId = useSelector((state) => state.getCollectionId);
  const [saveFlagTask, setSaveFlagTask] = useState(false);
  const [range, setRange] = useState([1, 27]);
  const [rangeLevel,setRangeLevel] = useState([1,13])
  const [showRadioGroup, setShowRadioGroup] = useState(false)
  const [slider, setSlider] = useState(false)
  const [showFooterButton, setShowFooterButton] = useState(false)
  const [showRadioButton, setShowRadioButton] = useState(true)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [taskName, setTaskName] = useState(false)
  const [taskLevel, setTaskLevel] = useState(false)
  const [showConfigurationButton,setShowConfigurationButton] = useState(true)
  const [disabled,setDisabled] = useState(true)

  useEffect(() => {
    dispatch(getEditTaskMappingGroupingAction({CollectionID:collectionId,Level:'INITIAL_TL', SaveMode: 'U'})) 

  }, []);
   useEffect(() => {
    if (getEditAllTaskFlag && getEditAllTaskData.length > 0) {
      setSaveFlagTask(true)
      dispatch(backDropLoaderCloseAction())
    }
  }, [getEditAllTaskFlag]);
  useEffect(() => {
    if (getEditAllTaskError) {
      dispatch(backDropLoaderCloseAction());
    }
  }, [getEditAllTaskError]);
  
  useEffect(() => {
    if (taskLevelFlag) {
      setSaveFlagTask(true)
      dispatch(backDropLoaderCloseAction());
    }
  }, [taskLevelFlag]);
  useEffect(() => {
    if (taskLevelError) {
        dispatch(backDropLoaderCloseAction())
    }
  }, [taskLevelError]);
  useEffect(() => {
    if (taskNumberNameFlag) {
      setSaveFlagTask(true)
      dispatch(backDropLoaderCloseAction());
    }
  }, [taskNumberNameFlag]);
  useEffect(() => {
    if (taskNumberNameError) {
      dispatch(backDropLoaderCloseAction());
    }
  }, [taskNumberNameError]);
  useEffect(() => {
    if (taskNameFlag) {
      dispatch(backDropLoaderCloseAction());
      setSaveFlagTask(true)
     }
  }, [taskNameFlag]);
  useEffect(() => {
    if (taskNameError) {
      dispatch(backDropLoaderCloseAction());
    }
  }, [taskNameError]);
  useEffect(() => {
    if (globalTaskFlag) {
      setSaveFlagTask(true)
      dispatch(backDropLoaderCloseAction());
    }
  }, [globalTaskFlag]);
  useEffect(() => {
    if (globalTaskError) {
      dispatch(backDropLoaderCloseAction());
    }
  }, [globalTaskError]);
  useEffect(() => {
    if (globalTaskFlag) {
      setSaveFlagTask(true)
      dispatch(getEditTaskMappingGroupingAction({CollectionID:collectionId,Level:'INITIAL_TL', SaveMode:'U'})) 
      dispatch(globalTaskMappingGroupingResetAction())
      dispatch(backDropLoaderCloseAction())
    }
    return ()=> {
      dispatch(globalTaskMappingGroupingResetAction()) 

    }
  }, [globalTaskFlag]);
  useEffect(()=>{
    if((inputTask.TASK_NUMBER !== '' || inputTask.TASK_LONG_NAME !== '') && inputTask.TASK_MAP_TO !==''){
      setDisabled(false)
    }else {     
      setDisabled(true)
    }

  },[inputTask.TASK_NUMBER,inputTask.TASK_LONG_NAME,inputTask.TASK_MAP_TO])



  const handleChange = (event, newValue) => {
    if(group.tasks === "task_level"){
      setRangeLevel(newValue)
    }
    else {
      setRange(newValue);
    }
    setDisabled(false)
  };
  const handlerInputTask = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputTask({ ...inputTask, [name]: value });  

  };
  const handeCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setDisabled(true)
    if(checked){
      setDisabled(false)
    }
    setIsCheckboxChecked(checked);

  };

  const handleCollectionChange = (event) => {
    setShowRadioGroup(false);
    event.preventDefault();
    const { name, value } = event.target;
    setGroup({ ...group, [name]: value });
  };

  const onSave = () => {
    dispatch(backDropLoaderOpenAction());
    const globalConfig = [
      {
        "TASK_START_COUNT": group.tasks === "task_number" ? Number(range["0"]) : 0,
        "TASK_END_COUNT": group.tasks === "task_number" ? Number(range["1"]) : 0,
        "TASK_NUMBER_CONTAINS": group.tasks === "task_name" ? inputTask.TASK_NUMBER: '',
        "TASK_NAME_CONTAINS": group.tasks === "task_name" ? inputTask.TASK_LONG_NAME:'',
        "TASK_MAPTO": group.tasks === "task_name" ? inputTask.TASK_MAP_TO: '',
        "TASK_OVERRIDE": isCheckboxChecked ? 'Y': 'N',
        "TASK_LEVEL_START_COUNT": group.tasks === "task_level" ? Number(rangeLevel["0"]): 0,
        "TASK_LEVEL_END_COUNT": group.tasks === "task_level" ? Number(rangeLevel["1"]): 0
      }
    ]
    const request = {
      CollectionID: collectionId,
      Level: group.tasks === "task_number" ? 'NOC': group.tasks === "task_name" ? 'TNNC' : 'TL'
    }
  const payload = { data: globalConfig, params: request}
    if (group.tasks === "task_number") {
      const taskNumberPayload = {
        CollectionID: String(collectionId),
        StartRange: Number(range["0"]),
        EndRange:Number(range["1"]),
        TaskLevel: 'Y'
      }
      dispatch(getNameOfCharactersMappingAction(taskNumberPayload))
    } else if (group.tasks === "task_name") {
      const taskLevelPayload = {
        CollectionID:collectionId,
        TaskNumber:inputTask.TASK_NUMBER,
        TaskName: inputTask.TASK_LONG_NAME,
        ReplaceName: inputTask.TASK_MAP_TO,
        TaskLevel: 'Y'
      }
     dispatch(getTaskLevelMappingAction(taskLevelPayload))
     
    } else if (group.tasks === "task_level") {
      const taskNamePayload = {
        CollectionID: String(collectionId),
        StartRange: Number(rangeLevel["0"]),
        EndRange:Number(rangeLevel["1"]),
        overrideflag: isCheckboxChecked ? 'Y': 'N',
        TaskLevel: 'Y'
      }
     dispatch(getTaskNumberNameMappingAction(taskNamePayload))
    } 

   dispatch(globalTaskMappingGroupingAction(payload))

  };
  const createConfiguration = () => {
    setShowFooterButton(true);
    if (group.tasks === "task_number") {
      setSlider(true);
      setShowRadioButton(false);
    } else if (group.tasks === "task_name") {
      setShowRadioButton(false);
      setTaskName(true);
    } else if (group.tasks === "task_level") {
      setShowRadioButton(false);
      setTaskLevel(true);
    }
  };
  const editTask = () => {
    setShowRadioButton(true)
    setSaveFlagTask(false)
    setSlider(false)
    setTaskName(false)
    setTaskLevel(false)
    setShowFooterButton(false)
    editMode()
    setShowConfigurationButton(false)
  };
  const editMode = () => {
    getEditAllTaskData.map((d)=>{
      if(d?.hasOwnProperty('CHARACTER_COUNT_START')){
        setRange([d?.CHARACTER_COUNT_START,d?.CHARACTER_COUNT_END])
        setGroup({ ...group, ["tasks"]: "task_number" })
      }else if(d?.hasOwnProperty('MAPTO')){
        setInputTask({
          TASK_NUMBER: d?.TASK_NUMBER_CONTAINS,
          TASK_LONG_NAME: d?.TASK_NAME_CONTAINS,
          TASK_MAP_TO: d?.MAPTO,
        })
        setGroup({ ...group, ["tasks"]: "task_name" })

      } else if(d?.hasOwnProperty('LEVELSTARTCOUNT')){
        setRangeLevel([d?.LEVELSTARTCOUNT,d?.LEVELENDCOUNT])
        setGroup({ ...group, ["tasks"]: "task_level" })
        setIsCheckboxChecked(d?.OVERRIDE === 'Y' ? true: false)
      } 
    })
  }
  const onCloseDone =()=> {
    setSaveFlagTask(false)
    dispatch(getNameOfCharactersMappingResetAction())
    dispatch(getTaskNumberNameMappingResetAction())
    dispatch(getTaskLevelMappingResetAction())
    dispatch(getEditTaskMappingGroupingResetAction())
    onClose()
  }
return (
    <Modal onClose={onClose} open={open}>
      <Box sx={style} className="taskMappingModal quickTaskcharModal">
        <Header className="taskMappingModal-header">
          <HeaderTitle className="taskMappingModal-headerTitle" data-testid={slider
              ? "create-configuration-task-number-contains": taskName ? "create-configuration-task-number-name-contains"
                : taskLevel ? "create-configuration-task-level-contains"
                : "collection-task-grouping-configuration"}>
            {slider
              ? "Create Configuration - Number of Characters"
              : taskName ? "Create Configuration - Task Number / Name Contains": taskLevel ? "Create Configuration - Task Level": "Collection Task mapping configuration"}
          </HeaderTitle>
          <div onClick={onCloseDone}>
              <Icon name="close" />
          </div>
        </Header>
        <Grid container>
          {showRadioButton && !saveFlagTask && (
            <>
              <Grid  item xs={12} lg={12} p={3} className={classes.borderListCollection} >
                <Label>
                  No configurations currently set. Please create a configuration
                  for existing tasks. This configuration will apply to new tasks
                  added to the collection.
                </Label>

                <Label>
                  Please select the task mapping configuration to continue:
                </Label>

                <RadioGroup className={"TaskMapping-radioLabel"}
                  name="tasks"
                  value={group.tasks}
                  onChange={handleCollectionChange}
                >
                  <FormControlLabel
                    value="task_number"
                    control={<Radio />}
                    label="Number of Characters"
                  />
                  <FormControlLabel
                    value="task_name"
                    control={<Radio />}
                    label="Task Number / Name Contains"
                  />
                  <FormControlLabel
                    value="task_level"
                    control={<Radio />}
                    label="Task Level"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} p={3} pt={0}>
                <Button
                  onClick={createConfiguration}
                  variant="contained" disabled={group.tasks === ''}
                >
                  {showConfigurationButton ? 'Create Configuration': "Edit Configuration" }
                </Button>
              </Grid>
            </>
          )}
          {taskLevel && !saveFlagTask && (
            <>
              <Grid item xs={12} p={3} pt={0} pb={0} className="taskLevelBox">
                <Label>Slide to choose character count start and end</Label>
                <Grid mt={3}>
                  <Box sx={{ width: 250 }} pl={2}>
                  <Stack spacing={2} direction="row">

                  <Label>{rangeLevel["0"]}</Label>
                    <Slider
                      value={rangeLevel}
                      onChange={handleChange}
                      min={1}
                      max={13}
                      defaultValue={10}
                    />
                    <Label>{rangeLevel["1"]}</Label>
                    </Stack>
                    <Stack spacing={2} direction="row" justifyContent="space-between">
                      <Label>Task level start</Label>
                      <Label>Task level end</Label>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12} p={3} pt={0} pb={0}>
                <Label className="overrideCharacterText3">Special Character Override</Label>
                <Grid >
                  <Box className="overrideDashText3">
                    <FormControl component="fieldset">
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox />}
                          onChange={handeCheckboxChange}
                          checked={isCheckboxChecked}
                          label="Override dash (-) to a period (.)"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
          {taskName && !saveFlagTask && (
            <>
              <Grid item xs={12} lg={6} p={3} className={classes.borderListCollection}
              >
                <Grid item xs={12} >
                  <Label>Task Number Contains</Label>
                  <Input
                    name="TASK_NUMBER"
                    onChange={handlerInputTask}
                    value={inputTask.TASK_NUMBER}
                    placeholder="Enter here"
                  />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Label>Task Name Contains</Label>
                  <Input
                    name="TASK_LONG_NAME"
                    onChange={handlerInputTask}
                    value={inputTask.TASK_LONG_NAME}
                    placeholder="Enter here"
                  />
                </Grid>
                <Grid item xs={12} mt={2}>
                  <Label>Map to</Label>
                  <Input
                    name="TASK_MAP_TO"
                    onChange={handlerInputTask}
                    value={inputTask.TASK_MAP_TO}
                    placeholder="Enter here"
                  />
                </Grid>
              </Grid>
            </>
          )}
          {slider && !saveFlagTask && (
            <Grid item xs={12} p={3} className="taskLevelBox">
              <Label>Slide to choose character count start and end</Label>
              <Grid mt={3}>
                <Box sx={{ width: 250 }}>
                <Stack spacing={2} direction="row">
                  <Label >{range["0"]}</Label> 
                    <Slider
                      value={range}
                      onChange={handleChange}
                      min={1}
                      max={27}
                      defaultValue={10}
                    />
                    <Label>{range["1"]}</Label>
                </Stack>
                <Stack spacing={2} direction="row" justifyContent="space-between">
                  <Label>Character Count Start</Label>
                  <Label>Character Count End</Label>
                </Stack> 
                </Box>
              </Grid>
            </Grid>
          )}          
             {saveFlagTask && (
              <> 
              <Grid container p={1} pt={0} className="taskLevelBox1 pqr">
                {getEditAllTaskData.map((d,index) => (
                  <>
                    <Grid item p={1} xs={12} key={index}>
                  <Grid item xs={12}>
                    <ArticleHeader>
                    <Label style={{marginTop:8}}>
                    {d?.hasOwnProperty('CHARACTER_COUNT_START')
                        ? "Number of Characters"
                        : d?.hasOwnProperty('MAPTO') ? "Task Number / Name Contains": d?.hasOwnProperty('LEVELSTARTCOUNT') ? "Task Level": ""}
                  </Label>
                      <Button onClick={editTask}>Edit</Button>
                    </ArticleHeader>
                  </Grid>
                </Grid>
                {d?.hasOwnProperty('CHARACTER_COUNT_START') && (
                  <>
                <Grid item lg={4} pt={2} pl={2}>
                  <HeaderTitle>Character Count Start</HeaderTitle>
                  <Label>{d?.CHARACTER_COUNT_START}</Label>
                </Grid>
                <Grid item lg={4} pt={2} pl={2}>
                  <HeaderTitle>Character Count End</HeaderTitle>
                  <Label>{d?.CHARACTER_COUNT_END}</Label>
                </Grid>
                  </>
                )}
                {d?.hasOwnProperty('LEVELSTARTCOUNT') && (
                <>
                  <Grid item lg={4} pt={2} pl={2} className="groupTaskConfig">
                    <HeaderTitle className="groupTaskConfig-title">Task level start</HeaderTitle>
                    <Label>{d?.LEVELSTARTCOUNT}</Label>
                  </Grid>
                  <Grid item lg={4} pt={2} pl={2} className="groupTaskConfig">
                    <HeaderTitle className="groupTaskConfig-title">Task level end</HeaderTitle>
                    <Label>{d?.LEVELENDCOUNT}</Label>
                  </Grid>
                  <Grid item lg={4} pt={2} pl={2} className="groupTaskConfig">
                    <HeaderTitle className="groupTaskConfig-title">Special Character Override</HeaderTitle>
                    <Label>{d?.OVERRIDE==='Y' ? 'Yes': 'No'}</Label>
                  </Grid>
                </>
                 )}
                {d?.hasOwnProperty('MAPTO') && (
                  <>
                   <Grid item lg={4} pt={2} pl={2}>
                   <HeaderTitle >Task Number Contains</HeaderTitle>
                   <Label>{d?.TASK_NUMBER_CONTAINS}</Label>
                 </Grid>
                 <Grid item lg={4} pt={2} pl={2}>
                   <HeaderTitle>Task Name Contains</HeaderTitle>
                   <Label>{d?.TASK_NAME_CONTAINS}</Label>
                 </Grid>
                <Grid item lg={4} pt={2} pl={2}>
                  <HeaderTitle>Map To</HeaderTitle>
                  <Label>{d?.MAPTO}</Label>
                </Grid>
                </>
                )}

                    <Grid item lg={4} pt={2} pl={2} className="groupTaskConfig">
                        <HeaderTitle  className="groupTaskConfig-title">Created Date</HeaderTitle>
                        <Label>{d?.ADDED_DATE !== null ?format(new Date(d?.ADDED_DATE),'dd-MMM-yyyy'): ""}</Label>
                    </Grid>
                    <Grid item lg={4} pt={2} pl={2} className="groupTaskConfig">
                      <HeaderTitle className="groupTaskConfig-title">Created By</HeaderTitle>
                      <Label>{d.ADDED_BY}</Label>
                    </Grid>
                      <Grid item lg={4} pt={2} pl={2} className="groupTaskConfig">
                        <HeaderTitle className="groupTaskConfig-title">Last Updated Date</HeaderTitle>
                        <Label>{d?.UPDATED_DATE !== null ?format(new Date(d?.UPDATED_DATE),'dd-MMM-yyyy'): ""}</Label>
                     </Grid>
                      <Grid item lg={4} pt={2} pl={2} className="groupTaskConfig">
                        <HeaderTitle className="groupTaskConfig-title">Last Updated By</HeaderTitle>
                        <Label>{d.UPDATED_BY}</Label>
                      </Grid>
                      <Grid item lg={12} mt={2} pt={2} pl={2}>
                      <HeaderTitle>Caution: </HeaderTitle>
                      <Label>
                        Any changes made to the configuration doesn’t affect
                        existing tasks. They only automatically apply to new tasks
                        that are added to the collection.
                      </Label>
                    </Grid>
                    </>
                ))}
                
              </Grid>
            </>
          )}
        </Grid>

        <Footer className="taskMapping-closeBox">
          <Stack
            width="100%"
            spacing={2}
            direction="row"
            justifyContent="flex-end"
          >
            {showFooterButton && !saveFlagTask ? (
              <>
                <Button onClick={onCloseDone}>Cancel</Button>
                <Button onClick={onSave} disabled={disabled} variant="contained">
                  Save
                </Button>
              </>
            ) : (
              <Button onClick={onCloseDone} variant="contained">
                Close
              </Button>
            )}
          </Stack>
        </Footer>
      </Box>
    </Modal>
  );
}

export default CollectionTaskMapping;

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
const Input = styled("input")({
  marginTop: 5,
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  height: "40px",
  width: "100%",
});
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
const ArticleHeader = styled("div")({
  padding: "10px 10px",
  color: "#222222",
  background: "#D2D2D2",
  border: "1px solid #EEEEEE",
  boxSizing: " border-box",
  borderRadius: 4,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-input": {
      color: "#777777",
      padding: "8px",
      minHeight: "40",
    },
  },
  borderListCollection: {
    borderRight: "1px solid #EEEEEE",
  },
  borderListClient: {},
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
  marginBottom: "5px",
  fontWeight: 400,
  display: "block",
});
