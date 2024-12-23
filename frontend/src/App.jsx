
import Create from "../src/pages/Create"
import './App.css'
import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import Home from "./pages/Home"
import Blogs from "./pages/Blogs"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/blogs' element={<Blogs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
