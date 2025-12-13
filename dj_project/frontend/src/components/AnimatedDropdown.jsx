// src/components/AnimatedDropdown.jsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import "../styles/dropdown.css";

export default function AnimatedDropdown({ label, basePath }) {
  const [open, setOpen] = useState(false);
  const menuItems ={
            Products: ["Laptops","Desktops"],
            Services: ["Hardware","Software"],
            Contacts: ["Email","Whatsapp","Call"]
          };

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger
        className="nav-item"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {label}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="dropdown-content"
          sideOffset={8}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {
          menuItems[label]?.map((item) => (
            <DropdownMenu.Item key={item} className="dropdown-item">
              <a
                href={`/${basePath}/${item}`}
                className="dropdown-link"
              >
                {item}
              </a>
            </DropdownMenu.Item>
            ))}
            
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
