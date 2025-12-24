import Navbar from "../components/Navbar"
import "../styles/Home.css"
import Contents from "../components/Contents"
import Header from "../components/Header"


function CustomizedDesktop(){
    return (
      <div className="main-container">
        <title>Customized Desktop</title>
        <Header/>
        <Navbar/>
        <Contents/>
         <div className="footer">
            &copy; 2025 All Rights Reserved, Pinoy-Tech
        </div>
    
     </div>    
    )
}
export default CustomizedDesktop