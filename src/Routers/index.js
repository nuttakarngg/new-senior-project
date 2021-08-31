import { Switch, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/Authentication/LoginPage";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import SearchByResearcher from "../Pages/Database/SearchByResearcher";
import SearchByResearch from "../Pages/Database/SearchByResearch";
import Dashboard from "../Pages/Presents/Dashboard";
import RankingPerYear from "../Pages/Presents/RankingPerYear";
import TrendByYear from "../Pages/Presents/TrendByYear";
import TypeOfResearch from "../Pages/Presents/TypeOfResearch";
import Users from "../Pages/UsersManage/Users";
// function PrivateRoute({ children }) {
//   return JSON.parse(localStorage.getItem('isLogin')) !== null?children:<Redirect to="/login"/>
// }
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
      <Route path="/Presents/Dashboard"><Dashboard/></Route>
      <Route path="/Presents/RankingPerYear"><RankingPerYear/></Route>
      <Route path="/Presents/TrendByYear"><TrendByYear/></Route>
      <Route path="/Presents/TypeOfResearch"><TypeOfResearch/></Route>
      <Route path="/UsersManage/Researcher"><Users/></Route>
      {/* <PrivateRoute path="/getAll"><SearchByResearch/></PrivateRoute> */}
    </Switch>
  );
}

export default AppRouting;
