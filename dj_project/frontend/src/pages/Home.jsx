import Navbar from "../components/Navbar"
import Navbar2 from "../components/Navbar"
import ProductCards from "../components/Contents"
import "../styles/Home.css"
import Contents from "../components/Contents"
import Header from "../components/Header"

function Home(){
    return (
      <div className="main-container">
        <Header/>
        <Contents/>
     </div>    
    )
}
export default Home