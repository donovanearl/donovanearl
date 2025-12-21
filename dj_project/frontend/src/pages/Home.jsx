import Navbar from "../components/Navbar"
import "../styles/Home.css"
import Contents from "../components/Contents"
import Header from "../components/Header"


function Home(){
    return (
      <div className="main-container">
        <Header/>
        <Navbar/>
        <Contents/>
         <div className="footer">
            &copy; 2025 All Rights Reserved, Pinoy-Tech
        </div>
    
     </div>    
    )
}
export default Home