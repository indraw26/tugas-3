import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home'
import Prodi from "./Pages/Prodi";
import Mahasiswa from "./Pages/Mahasiswa";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/prodi" element={<Prodi/>}/>
      <Route path='/mahasiswa/:id' element={<Mahasiswa/>}>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
