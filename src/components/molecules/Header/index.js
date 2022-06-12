import React,{useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { FormControl, MenuItem, Menu, Select, Tooltip, TextField } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { AiFillHome } from "react-icons/ai";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import CreateCollection from "../../CreateCollection";
import { deleteCookie, getCookie } from "../../../services/cookie";
import {Icon} from '../../atoms'
import {CreateCollectionModalClose,editableCollection,
        allianceCodeSearch,allianceCodeSearchSecond,
        allianceCodeSearchThird,projectManagerName,contractAdministrator} from '../../../redux/common/action'

const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  color: black;
  &:hover {
    color: blue;
  }
`;
const BoxStyle = styled(Box)`
  &:hover {
    color: red !important;
  }

  margintop: 10px;
  &.hovereffect {
    color: blue;
  }
`;

const TypoStyle = styled(Typography)`
  font-size: 10px;

  color: black;

  &:hover {
    color: blue;
    &.hovereffect {
      color: blue;
    }
  }
`;

const NavbarIcons = styled(Box)`
  font-size: 23px;
  height: 22px;
  color: black;

  &:hover {
    color: blue;
  }
`;

const drawerWidth = 170;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Home() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = getCookie("auth");
  const [open, setOpen] = useState(false);
  const [colleactionDropdown, setColleactionDropdown] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {collectionModal} =  useSelector(({ common }) => common);
  const {getCollectionId} =  useSelector(({ api }) => api);

  useEffect(() => {
    if(collectionModal){
      setOpenPopup(false);
      setColleactionDropdown("");
      dispatch(allianceCodeSearch([]))
      dispatch(allianceCodeSearchSecond([]))
      dispatch(allianceCodeSearchThird([]))
      dispatch(projectManagerName(""))
      dispatch(contractAdministrator(""))

    }
    return () => {
    };
  }, [collectionModal]);
  const theme = useTheme();

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
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
    setColleactionDropdown("");

  };
  const changeHandler = (e) => {
    if (e.target.value === "createnewcollection") {
      dispatch(CreateCollectionModalClose(false))

      openModal();
    }
    setColleactionDropdown(e.target.value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {openPopup ? (
        <Box bgcolor="white " p={10}>
          {" "}
          <CreateCollection
            setOpen={setOpen}
            openModal={openPopup}
            closeModal={closeModal}
          />
        </Box>
      ) : null}
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            <MenuIcon />
          </IconButton>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            flexGrow={1}
            alignItems="center"
          >
            <Box display="flex" flexDirection="row" align-items="left">
              <Icon name="logo" style={{width:'100px'}}/>
              <Box ml={1.7} mt={2}>
                {" "}
                <h3 style={{ fontSize: "15px" }}>Power Invoice</h3>
              </Box>
            </Box>
            <Box sx={{ maxHeight: 40 }}>
              <FormControl fullWidth>
                <Select
                  variant="standard"
                  disableUnderline
                  displayEmpty
                  name="contract"
                  fullWidth
                  style={{ maxHeight: 40, }}
                  onChange={changeHandler}
                  value={colleactionDropdown}
                  placeholder="Select Collection"
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
              >
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
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
                <AccountCircle />
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
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <BoxStyle>
          <NavLinkStyle to="/home">
            <ListItem button>
              <Tooltip title="Home" arrow>
                <ListItemIcon>
                  <Box display="flex" flexDirection="column">
                    <NavbarIcons className="hovereffect">
                      <AiFillHome />
                    </NavbarIcons>

                    {open ? (
                      ""
                    ) : (
                      <TypoStyle className="hovereffect" mt={1}>Home</TypoStyle>
                    )}
                  </Box>
                </ListItemIcon>
              </Tooltip>

              <Typography >Home</Typography>
            </ListItem>
          </NavLinkStyle>
        </BoxStyle>

        <BoxStyle>
          <NavLinkStyle to="/setup">
            <ListItem button>
              <Tooltip title="Setups" arrow>
                <ListItemIcon>
                  <Box display="flex" flexDirection="column">
                    <NavbarIcons>
                      {" "}
                      <i className="las la-screwdriver"></i>
                    </NavbarIcons>
                    {open ? "" : <TypoStyle mt={1}>Setups</TypoStyle>}
                  </Box>
                </ListItemIcon>
              </Tooltip>
              <Typography variant="body1" component="p" className="navtest">
                Setups
              </Typography>
            </ListItem>
          </NavLinkStyle>
        </BoxStyle>

        <BoxStyle>
          <NavLinkStyle to="/invoice">
            <ListItem button>
              <Tooltip title="Invoices" arrow>
                <ListItemIcon>
                  <Box display="flex" flexDirection="column">
                    <NavbarIcons>
                      {" "}
                      <i className="las la-file-invoice-dollar"></i>
                    </NavbarIcons>

                    {open ? "" : <TypoStyle mt={1}> Invoices</TypoStyle>}
                  </Box>
                </ListItemIcon>
              </Tooltip>
              <Typography variant="body1" component="p" className="navtest">
                Invoices
              </Typography>
            </ListItem>
          </NavLinkStyle>
        </BoxStyle>

        <BoxStyle>
          <NavLinkStyle to="/message">
            <ListItem button>
              <Tooltip title="Messages" arrow>
                <ListItemIcon>
                  <Box display="flex" flexDirection="column">
                    <NavbarIcons>
                      <Badge badgeContent={4} color="primary">
                        <i className="las la-comments"></i>
                      </Badge>
                    </NavbarIcons>

                    {open ? "" : <TypoStyle mt={1}> Messages </TypoStyle>}
                  </Box>
                </ListItemIcon>
              </Tooltip>
              <Typography variant="body1" component="p" className="navtest">
                Messages
              </Typography>
            </ListItem>
          </NavLinkStyle>
        </BoxStyle>

        <BoxStyle>
          <NavLinkStyle to="/order">
            <ListItem button>
              <Tooltip title="Orders" arrow>
                <ListItemIcon>
                  <Box display="flex" flexDirection="column">
                    <NavbarIcons>
                      {" "}
                      <i className="las la-comment-dollar"></i>
                    </NavbarIcons>

                    {open ? "" : <TypoStyle mt={1}> Orders</TypoStyle>}
                  </Box>
                </ListItemIcon>
              </Tooltip>
              <Typography variant="body1" component="p" className="navtest">
                Orders
              </Typography>
            </ListItem>
          </NavLinkStyle>
        </BoxStyle>

        <BoxStyle>
          <NavLinkStyle to="/reports">
            <ListItem button>
              <Tooltip title="Reports" arrow>
                <ListItemIcon>
                  <Box display="flex" flexDirection="column">
                    <NavbarIcons>
                      {" "}
                      <i className="lab la-replyd"></i>
                    </NavbarIcons>

                    {open ? "" : <TypoStyle mt={1}> Reports</TypoStyle>}
                  </Box>
                </ListItemIcon>
              </Tooltip>
              <Typography variant="body1" component="p" className="navtest">
                Reports
              </Typography>
            </ListItem>
          </NavLinkStyle>
        </BoxStyle>

        <Box mt={7}>
          <BoxStyle>
            <NavLinkStyle to="/">
              <ListItem button>
                <Tooltip title="Help" arrow>
                  <ListItemIcon>
                    <Box display="flex" flexDirection="column">
                      <NavbarIcons>
                        {" "}
                        <i className="las la-question-circle"></i>
                      </NavbarIcons>

                      {open ? "" : <TypoStyle mt={1}> Help</TypoStyle>}
                    </Box>
                  </ListItemIcon>
                </Tooltip>
                <Typography variant="body1" component="p" className="navtest">
                  Help
                </Typography>
              </ListItem>
            </NavLinkStyle>
          </BoxStyle>

          <BoxStyle>
            <NavLinkStyle to="/">
              <ListItem button>
                <Tooltip title="Admin" arrow>
                  <ListItemIcon>
                    <Box display="flex" flexDirection="column">
                      <NavbarIcons>
                        {" "}
                        <i className="las la-shield-alt"></i>
                      </NavbarIcons>

                      {open ? "" : <TypoStyle mt={1}> Admin</TypoStyle>}
                    </Box>
                  </ListItemIcon>
                </Tooltip>
                <Typography variant="body1" component="p" className="navtest">
                  Admin
                </Typography>
              </ListItem>
            </NavLinkStyle>
          </BoxStyle>
        </Box>

        <Divider />
      </Drawer>
    </Box>
  );
}
