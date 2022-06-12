import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from '@mui/styles';
import { FormControl, MenuItem, Menu, Select } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { useHistory, useLocation } from "react-router-dom";
import CreateCollection from "../../CreateCollection";
import { deleteCookie, getCookie } from "../../../services/cookie";
import {Icon} from '../../atoms'
import { drawerOpenAction } from '../Drawer/logic';
import {
    CreateCollectionModalClose,editableCollection,
    projectManagerName,contractAdministrator,searchClientCodeDetails,searchContractNumberDetails
} from '../../../redux/common/action'
import Typography from '@mui/material/Typography';


import { parse, stringify } from "query-string";
import { setCollectionIdAction } from "../CollectionChange/logic";
import { getGenerateCollectionAction ,getCurrencyAction} from "../../../redux/common/logic";
import {selectedProjectNumberResetAction} from '../Modal/logic'
import {getAllianceProjectDetailResetAction} from '../Steppar/logic'
import { height } from "@mui/system";
import {getAllContractorCeilingResetAction} from '../ContractorCeilings/logic'
const drawerWidth = 170;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: 56,
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiSvgIcon-root": {
      color: "#fff",
      pointerEvents: "none"
    }
  },
}));


export default function Home() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const auth = getCookie("auth");
  const { collectionId = "", filters, ...rest } = parse(location.search)
  const {open} = useSelector(state => state.drawer)
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {collectionModal} =  useSelector(({ common }) => common);
  const {getCollectionId} =  useSelector(({ api }) => api);

  useEffect(() => {
    if(collectionModal){
      setOpenPopup(false);
      dispatch(projectManagerName(""))
      dispatch(contractAdministrator(""))
      
    }
    return () => {
    };
  }, [collectionModal]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDropdown = (flag) => {
    if (flag) {
      deleteCookie("auth");
      history.replace("/");
    }
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    dispatch(drawerOpenAction())
  };

  const [staticCollection,setStaticCollection] = useState([{
    ID: "selectproject",Description: "Select project"
  },
  {
    ID: "createnewcollection",Description: "+ Create new collection"
  }
])

  const options = getCollectionId;
  

  if (!auth) {
    return null;
  }
  const openModal = () => {
    setOpenPopup(true);
    dispatch(editableCollection("basic_setup"))


  };
  const closeModal = () => {
    setOpenPopup(false);
  };
  const changeHandler = (e) => {
    if (e.target.value === "createnewcollection") {
      dispatch(getGenerateCollectionAction()) 
      dispatch(selectedProjectNumberResetAction())
      dispatch(getAllContractorCeilingResetAction())
      dispatch(getAllianceProjectDetailResetAction())
      dispatch(searchClientCodeDetails([]))
      dispatch(searchContractNumberDetails([]))
      dispatch(CreateCollectionModalClose(false))
      dispatch(getCurrencyAction())
      openModal();
    }
    if (typeof(e.target.value) === "number") {
      dispatch(setCollectionIdAction(e.target.value))
      const queryParams = stringify({
        collectionId: e.target.value,
        ...rest
      })
      history.replace(`?${queryParams}`)
    }
  };

  return (
    <>
      {openPopup ? (
        <Box bgcolor="white " p={10}>
          {" "}
          <CreateCollection
            openModal={openPopup}
            closeModal={closeModal}
          />
        </Box>
      ) : null}
      <AppBar position="fixed" open={open} bgcolor="white ">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <i className="las la-bars" style={{ fontSize: 20 }} ><Typography variant="h6" noWrap component="div" sx={{fontSize: 12, fontWeight:'bold', color:'#fff'}}>
            Menu
          </Typography></i>
            
          </IconButton>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            flexGrow={1}
            alignItems="center"
          >
            <Box display="flex" flexDirection="row" align-items="left" className="jacobsLogo" style={{marginLeft:'26px'}}>
              <Icon name="logo"/>
              <Box ml={1.7} mt={2}>
                {" "}
                <p style={{ fontSize: 17, fontWeight: 400, lineHeight:"17px",  
                height: "24px", width: "101px"}}>Power Invoice</p>
              </Box>
            </Box>
            <Box sx={{ maxHeight: 40 }}>
              <FormControl fullWidth>
                <Select
                className={classes.root}
                  variant="standard"
                  disableUnderline
                  displayEmpty
                  name="contract"
                  fullWidth
                  style={{ maxHeight: 40,color:"#ffffff" }}
                  onChange={changeHandler}
                  value={collectionId}
                  placeholder="Select Collection"
                  IconComponent={() => (
                    <Icon name="expandArrow" className='cl'/>
                  )}
                ><MenuItem value=""
                           style={{borderTop:"1px solid #E1E1E1",
                                    paddingTop:"20px",FontFamily:"Jacobs Chronos heavy",
                                    fontWeight:"600",backgroundColor:"transparent"}}>
                      Most Recent Collections
                    </MenuItem>
                  {options.map((option, i) => (
                    <MenuItem key={option.ID} value={option.ID}>
                      {option.Description}
                    </MenuItem>
                  ))}
                  <MenuItem value="" 
                      style={{borderTop:"1px solid #E1E1E1",paddingTop:"20px",FontFamily:"Jacobs Chronos heavy",fontWeight:"600",backgroundColor:"transparent"}}>
                      Select collection
                    </MenuItem>
                    {staticCollection.map((option, i) => (
                    <MenuItem key={option.ID} value={option.ID}>
                      {option.Description}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
            <IconButton
                size="large"
                aria-label="show 4 new notifications"
                color="inherit"
                style={{ marginLeft: 20 }}
              >
              <Badge badgeContent={4} color="error" sx={{ "& .MuiBadge-badge": { fontSize: 10, height: 16, minWidth: 16 } }}>
                <i className="lar la-bell" style={{ fontSize: 24 }}></i>
                </Badge>     
                </IconButton>        
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                style={{ marginLeft: 20 }}
              >
                <i className="lar la-user-circle" style={{ fontSize: 24 }}></i>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleDropdown(false)}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => handleDropdown(true)}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
