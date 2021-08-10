import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/Authentication/LoginPage";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import SearchByResearcher from "../Pages/Database/SearchByResearcher";
import SearchByResearch from "../Pages/Database/SearchByResearch";
function PrivateRoute({ children }) {
  return JSON.parse(localStorage.getItem('isLogin')) !== null?children:<Redirect to="/login"/>
}
function AppRouting() {
  return (
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
      <Route path="/Login">
        <LoginPage />
      </Route>
      <Route path="/Forgot-Password">
        <ForgotPassword />
      </Route>
      <Route path="/Database/SearchByResearcher">
        <SearchByResearcher />
      </Route>
      <Route path="/Database/SearchByResearch">
        <SearchByResearch />
      </Route>
      <PrivateRoute path="/getAll"><SearchByResearch/></PrivateRoute>
    </Switch>
  );
}

export default AppRouting;
