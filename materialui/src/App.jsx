import { BrowserRouter, Routes, Route } from "react-router-dom"
import Supplier from "./pages/supplier.jsx"
import Login from "./pages/Login.jsx"
import Inicio from "./pages/Inicio.jsx"
import { Modal } from "./components/Modal.jsx"
import SupplierView from "./components/SupplierView.jsx"
import Shopping from "./pages/Shopping.jsx"
import M_Shopping from "./components/M_Shopping.jsx"
import Carrito from './components/Carrito.jsx'
import './App.css'

function App() {

  return (
    <>
   <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} /> 
        <Route path='/inicio' element={<Inicio/>} /> 
        <Route path='/supplier' element={<Supplier/>} /> 
        <Route path="/create-supplier" element={<Modal/>} />
        <Route path="/edit-supplier/:id" element={<Modal editMode={true} />} />
        <Route path="/supplierV/:id" element={<SupplierView />} />
        <Route path="/shopping" element={<Shopping/>}/>
        <Route path='/shoppingM' element={<M_Shopping/>} />
        <Route path='/factura' element={<Carrito/>} />



      </Routes>  
    </BrowserRouter>
    </>
  )
}

export default App
