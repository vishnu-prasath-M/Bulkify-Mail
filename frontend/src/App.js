import Home from "./components/Home";
import Bulkify from "./components/Bulkify";
import { BrowserRouter, Routes,Route } from "react-router-dom";


function App() {
  return (
     <div>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home/>}></Route>
        <Route path="/bulk" element={<Bulkify/>}></Route>
        
      </Routes>
      </BrowserRouter>
      
     </div>
  );
}

export default App;
