import react from "react"
import {Navigate,BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import MainLayout from "./layouts/MainLayout.jsx"
import Laptops from "./pages/Laptops.jsx"
import Customized_Desktop from "./pages/Customized_Desktop.jsx"
import Cart from "./pages/Cart.jsx"
import Orders from "./pages/Orders.jsx"
import Profile from "./pages/Profile.jsx"
import Order_history from "./pages/Order_history.jsx"
import Contact_page from "./pages/Contact.jsx"


console.log("APP LOADED");


// Acts like URLs.py //

function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}
function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout/>}>
        <Route
          path="/" element={
              <Home/>
          }
          />
          <Route
          path="/products/laptops" element={
            
              <Laptops/>
            
          }
          />
          <Route
          path="/products/customized-desktop" element={
            //<ProtectedRoute>
              <Customized_Desktop/>
            //</ProtectedRoute>
          }
          />
          <Route
          path="/login" element={
            <Login/>
          }
          />
        <Route
          path="/logout" element={
            <Logout/>
          }
          />
        <Route
          path="/register" element={
            <RegisterAndLogout/>
          }
          />

          <Route
          path="/cart" element={
            <ProtectedRoute>
              <Cart/>
            </ProtectedRoute>
          }
          />
          <Route
          path="/Orders/" element={
              <ProtectedRoute>
                <Orders/>
              </ProtectedRoute>
          }
          />
          <Route
          path="/Profile/" element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
                         
          }
          />
          <Route
          path="/order-history" element={
            <ProtectedRoute>
              <Order_history/>
            </ProtectedRoute>
          }
          />
          <Route
          path="*" element={
            <NotFound/>
          }
          />
          <Route
          path="/Contact" element={
              <Contact_page/> 
          }
          />
          
        </Route>
        
      
    </Routes>
  </BrowserRouter>
   )
}

export default App
