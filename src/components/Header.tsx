import logo from "@/assets/fieg.svg";
import { useEffect, useRef, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { UserDropdown } from "./UserDropdown";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="bg-sidebar shadow-sidebar-foreground shadow-sm pr-2">
      <div className="flex h-12 items-center justify-between px-4">
        {/* Logo só aparece no mobile */}

        <img src={logo} alt="Fieg Logo" className="h-8 block lg:hidden md:hidden" />

        {/* Botão de usuário fixo */}
        <div ref={menuRef} className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
