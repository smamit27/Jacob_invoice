import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, height } from '@mui/system';
import { drawerCloseAction } from './logic';
import { getCookie } from "../../../services/cookie";
import { parse, stringify } from 'query-string';
import Typography from '@mui/material/Typography';

const drawerWidth = 170;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerFooter = styled('div')(({ theme }) => ({

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DrawerComponent = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Drawer() {

  const apps = [
    { name: 'Home', fullName: 'Home', value: '/home', component: () => <i className="la la-lg la-home" /> },
    { name: 'Setup', fullName: 'Setup', value: '/setup', component: () => <i className="la la-lg la-screwdriver" /> },
    { name: 'Rates', fullName: 'Billing Titles and Rates', value: '/titlesrates', component: () => <i className="la la-lg la-money-check-alt" /> },
    { name: 'Subs', fullName: 'Team Subcontractors', value: '/tia', component: () => <i className="la la-lg la-hard-hat" /> },
    { name: 'Invoices', fullName: 'Invoices', value: '/invoice', component: () => <i className="la la-lg la-file-invoice-dollar" /> }, 
    // { name: 'Orders', value: '/order', component: () => <i className="la la-lg la-money-check-alt" /> },
    { name: 'Reports', fullName: 'Reports', value: '/reports', component: () => <i className="la la-lg la-newspaper" /> },
  ]

  const bottomApps = [
    { name: 'Help', value: '/help', component: () => <i className="la la-lg la-question-circle" /> },
    { name: 'Admin', value: '/admin', component: () => <i className="la la-lg la-shield-alt" /> },
  ]

  const theme = useTheme();
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { collectionId } = parse(location.search)
  const {open} = useSelector(state => state.drawer)
  const auth = getCookie("auth");

  const handleDrawerClose = () => {
    dispatch(drawerCloseAction())
  };

  const onDrawerItemClick = (item) => {
    const queryParams = stringify({
      ...(collectionId ? { collectionId } : {})
    })
    history.push(`${item.value}?${queryParams}`)
  }

  if (!auth) {
    return null;
  }

  return (
    <DrawerComponent variant="permanent" open={open}>
      <DrawerHeader sx={{
         bgcolor: '#222222',
         minHeight: '56px !important'
        }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerClose}
        edge="start"
        sx={{
          marginRight: "65px",
        }}
      >
        <i className="las la-bars" style={{ fontSize: 20, color:'#fff' }}></i>
        <Typography variant="h6" noWrap component="div" sx={{fontSize: 12, fontWeight:'bold', paddingLeft: '8px', color:'#fff'}}>
            Menu
          </Typography>
      </IconButton>
    </DrawerHeader>
    <List sx={{
      '&& .Mui-selected': {
        '&, & .MuiListItemIcon-root': {
          color: '#231edc',
        },
        '&, & .MuiTypography-root': {
          color: '#231edc',
        },
      },
    }}>
        {apps.map((item) => (
          <ListItem onClick={() => onDrawerItemClick(item)} selected={location.pathname === item.value} button key={item.name}>
            <ListItemIcon>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 38 }}>
                {item.component()}
                {!open && <ListItemText secondaryTypographyProps={{ fontSize: 11, fontWeight: 'bold' }} secondary={item.name} />}
              </Box>
            </ListItemIcon>
            <ListItemText primary={item.fullName} primaryTypographyProps={{ fontSize: 11, fontWeight: 'bold' }} />
          </ListItem>
        ))}
      </List>
      <List sx={{
      '&& .Mui-selected': {
        '&, & .MuiListItemIcon-root': {
          color: '#231edc',
        },
        '&, & .MuiTypography-root': {
          color: '#231edc',
        },
      },
    }}>
        {bottomApps.map((item, index) => (
          <ListItem onClick={() => onDrawerItemClick(item)} selected={location.pathname === item.value} button key={item.name}>
            <ListItemIcon>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 38 }}>
                {item.component()}
                {!open && <ListItemText secondaryTypographyProps={{ fontSize: 11, fontWeight: 'bold' }} secondary={item.name} />}
              </Box>
            </ListItemIcon>
            <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: 11, fontWeight: 'bold' }} />
          </ListItem>
        ))}
      </List>
    </DrawerComponent>
  );
}
