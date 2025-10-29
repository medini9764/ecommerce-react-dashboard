import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Signin from "./pages/examples/Signin";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import { Routes } from "./routes";

export default function App() {
  return (
    <Switch>
      <Route exact path={Routes.Presentation.path} component={HomePage} />
      <Route exact path={Routes.Signin.path} component={Signin} />
      <Route exact path={Routes.DashboardOverview.path} component={DashboardOverview} />
      {/* Add other routes here */}
    </Switch>
  );
}
