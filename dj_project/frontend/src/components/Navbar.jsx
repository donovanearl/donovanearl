import AnimatedDropdown from "./AnimatedDropdown";
import "../styles/index.css"

export default function NavBar(){
        return <nav className="navbar">
        <AnimatedDropdown label="Home" basePath="" className="an-nav-item"/>
        <AnimatedDropdown label="Products" basePath="products" />
        <AnimatedDropdown label="Services" basePath="services" />
        <AnimatedDropdown label="Contacts" basePath="contacts" />
        </nav>
   }