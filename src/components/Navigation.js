import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Box } from "@mui/system";
import { NotFound, AuthRoute, UnAuthRoute } from './atoms';
import CreateCollection from "./CreateCollection";
import Home from "./views/Home";
import Landing from "./views/Landing";
import Invoice from "./views/Invoice/index";
import Messages from "./views/Messages";
import Order from "./views/Order";
import Reports from "./views/Reports";
import Setup from "./views/Setup";
import CollectionChange from "./molecules/CollectionChange";
import TitlesAndRates from "./views/TitlesAndRates";
import Tia from './views/Tia'

const PageSpacing = ({ children }) => {
  return (
    <CollectionChange>
      <Box style={{ background: '#F7F7F7 !importent', width: '100%' }} >
        {children}
      </Box>
    </CollectionChange>
  )
}

class Navigation extends Component {
  render() {
    return (
      <Switch>
        <AuthRoute exact path="/home" render={() => <PageSpacing><Home /></PageSpacing>} />
        <AuthRoute exact path="/createCollection" render={() => <PageSpacing><CreateCollection /></PageSpacing>} />
        <AuthRoute exact path="/setup" render={() => <PageSpacing><Setup /></PageSpacing>} />
        <AuthRoute exact path="/titlesrates" render={() => <PageSpacing><TitlesAndRates /></PageSpacing>} />
        <AuthRoute exact path="/tia" render={() => <PageSpacing><Tia /></PageSpacing>} />
        <AuthRoute exact path="/invoice" render={() => <PageSpacing><Invoice /></PageSpacing>} />
        <AuthRoute exact path="/message" render={() => <PageSpacing><Messages /></PageSpacing>} />
        <AuthRoute exact path="/order" render={() => <PageSpacing><Order /></PageSpacing>} />
        <AuthRoute exact path="/reports" render={() => <PageSpacing><Reports /></PageSpacing>} />
        <UnAuthRoute exact path="/" component={Landing} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default Navigation;
