import {  Switch, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from '../Pages/Authentication/LoginPage';
import ForgotPassword from '../Pages/Authentication/ForgotPassword';
import SearchByResearcher from "../Pages/Database/SearchByResearcher";
import SearchByResearch from "../Pages/Database/SearchByResearch";
function AppRouting() {
  return (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/Login">
            <LoginPage/>
        </Route>
        <Route path="/Forgot-Password">
            <ForgotPassword/>
        </Route>
        <Route path="/Database/SearchByResearcher">
          <SearchByResearcher/>
        </Route>
        <Route path="/Database/SearchByResearch">
          <SearchByResearch/>
        </Route>
      </Switch>

  );
}

export default AppRouting;
