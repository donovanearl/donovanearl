// src/components/AnimatedDropdown.jsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { useState } from "react";
import "../styles/AnimatedDropdown.css";
import {useNavigate} from "react-router-dom"
import Home from "../pages/Home";

export default function AnimatedDropdown({ label, basePath }) {
  
  const [open, setOpen] = useState(false);
  
  const menuItems ={ Home:["About Us"],
                  Products: ["Laptops","Customized-Desktop"], 
                  Services: ["Hardware","Software"], 
                  Contacts: ["Email","Whatsapp","Call"] };



  // Handle root path for Home , converts empty spaces to -
  const toSlug = (text) =>
  text.toLowerCase().replace(/\s+/g, "-");

  const getItemPath = (item) => {
    if (basePath === "/" || basePath === "") 
      {
        return `/${toSlug("")}`;
      }
    return `/${basePath}/${toSlug(item)}`;
  };
  

  //  only Home nav has this clickable label
  const navigate = useNavigate()
  const home_click=(e)=>{
    if(label==="Home"){navigate("/")}
    // else{navigate(`/${toSlug(label)}`)}
          }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      
        <DropdownMenu.Trigger className="nav-item" 
        onMouseEnter={() => setOpen(true)} 
        onMouseLeave={() => setOpen(false)}
        onClick={home_click}
        >{label}
        </DropdownMenu.Trigger>
      
        
        <DropdownMenu.Portal>

              <DropdownMenu.Content className="dropdown-content" 
                sideOffset={1} 
                onMouseEnter={() => setOpen(true)} 
                onMouseLeave={() => setOpen(false)}
                >
                  {menuItems[label]?.map((item) => (
                        <DropdownMenu.Item key={item} className="dropdown-item">
                        <a href={getItemPath(item)} className="dropdown-link"> 
                        {item} 
                        </a>
                        </DropdownMenu.Item>
                        ))
                  }
              </DropdownMenu.Content>

        </DropdownMenu.Portal>

    </DropdownMenu.Root>
  );
}
