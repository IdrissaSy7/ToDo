import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./components/Edit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
