import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/Home";

function App() {
  return (
    <div className="App h-100 bg-black">
      <Home />
    </div>
  );
}

export default App;

// {
//   <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//     </Routes>
//   </Router>;
// }
