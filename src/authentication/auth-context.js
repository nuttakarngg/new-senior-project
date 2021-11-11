import * as React from "react";
import { isEmpty } from "lodash";
import { getUserData, loginService } from "../services/auth.service";
import { setToken, token } from ".";
// import {FullPageSpinner} from '~/components/lib'

const AuthContext = React.createContext();
export function AuthProvider(props) {
  // code for pre-loading the user's information if we have their token in
  // localStorage goes here

  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  //   if (weAreStillWaitingToGetTheUserData) {
  //     return <FullPageSpinner />
  //   }

  const logout = () => {
    setToken(null);
  }; // clear the token in localStorage and the user data
  const hasLogin = token != "null" ? true : false;
  const user = async () => {
    return await getUserData();
  };
  // note, I'm not bothering to optimize this `value` with React.useMemo here
  // because this is the top-most component rendered in our app and it will very
  // rarely re-render/cause a performance problem.
  return <AuthContext.Provider value={{ logout, hasLogin, user }} {...props} />;
}

export const useAuth = () => React.useContext(AuthContext);

// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:
// const useUser = () => React.useContext(UserContext)
