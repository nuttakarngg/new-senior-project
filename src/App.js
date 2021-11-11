import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import AppRouting from "./Routers";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import SearchPage from "./Pages/SearchPage";
import { AuthProvider } from "./authentication/auth-context";
function App() {
  return (
    <AuthProvider>
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
