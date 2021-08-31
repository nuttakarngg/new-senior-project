import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import AppRouting from "./Routers";
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router} from "react-router-dom";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <Router>
      <ToastContainer/>
      <Header />
      <Navbar />
      <div className="wrapper">
        <SearchPage/>
        <AppRouting />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
