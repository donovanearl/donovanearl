// src/components/AnimatedDropdown.jsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import "../styles/Animateddropdown.css";

export default function AnimatedDropdown({ label, basePath }) {
  const [open, setOpen] = useState(false);
  
  const menuItems ={ Home:["About Us"],
                  Products: ["Laptops","Customized-Desktop"], 
                  Services: ["Hardware","Software"], 
                  Contacts: ["Email","Whatsapp","Call"] };
  
  const toSlug = (text) =>
  text.toLowerCase().replace(/\s+/g, "-");

   // Handle root path for Home
  const getItemPath = (item) => {
    if (basePath === "/" || basePath === "") {
      return `/${toSlug("")}`;
    }
    return `/${basePath}/${toSlug(item)}`;
  };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="nav-item" 
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)}
      >
      {label}
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
              ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
