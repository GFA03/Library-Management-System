import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import Authors from "./pages/Authors";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
