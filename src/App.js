import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import AppRouting from "./Routers";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import { AuthProvider } from "react-auth-kit";
function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
      refreshToken
    >
      <Router>
        <ToastContainer />
        <Header />
        <Navbar />
        <div className="wrapper">
          <SearchPage />
          <AppRouting />
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
