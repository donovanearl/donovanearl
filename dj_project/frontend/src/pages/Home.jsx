import Navbar from "../components/Navbar"
import "../styles/Home.css"
import Contents from "../components/Contents"
import Header from "../components/Header"
import AnimatedDropdown from "../components/AnimatedDropdown"



function Home(){
    return (
      <div className="main-container">
        <Header/>
        <Navbar/>
        <Contents/>
    
     </div>    
    )
}
export default Home