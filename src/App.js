import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter as Router } from "react-router-dom";
import { Box, styled } from "@mui/system";
import { CssBaseline } from "@mui/material";
import Navigation from "./components/Navigation";
import "./App.css";
import BackDropLoader from "./components/molecules/BackDropLoader";
import AppHeader from "./components/molecules/AppHeader";
import Drawer from "./components/molecules/Drawer";
import { getAllCollectionIdDetails } from './redux/api/action';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCollectionIdDetails())
  }, []);
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppHeader />
            <Drawer />
            <Box component="main" sx={{ flexGrow: 1, pt: 3, pl: 3, pr: 3, overflow: 'hidden' }}>
              <DrawerHeader />
              <Navigation />
              <BackDropLoader />
            </Box>
          </Box>
        </Router>
      </Suspense>
  );
}

export default App;
