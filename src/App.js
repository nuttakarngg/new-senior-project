import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import AppRouting from "./Routers";
import { BrowserRouter as Router} from "react-router-dom";
function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <div className="wrapper">
        <AppRouting />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
