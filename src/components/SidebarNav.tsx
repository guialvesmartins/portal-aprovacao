import logo from "@/assets/fieg.svg";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";

interface SidebarNavProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onCollapse: () => void;
}

export function SidebarNav({ isOpen, isCollapsed, onClose, onCollapse }: SidebarNavProps) {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-foreground transform transition-all duration-300 ease-in-out 
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    ${isCollapsed ? "w-[80px]" : "w-64"} 
    md:relative md:translate-x-0 h-screen`} // Adicionando h-screen para garantir que ocupe toda a altura
      >
        {/* Botão de Colapsar */}
        <Button
          variant="link"
          size="icon"
          className="absolute -right-4 top-6 hidden md:flex h-8 w-8 rounded-full bg-sidebar border border-sidebar-foreground text-foreground"
          onClick={onCollapse}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>

        <div className={`flex flex-col h-full p-4 ${isCollapsed ? "items-center" : ""}`}>
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } mb-8`}
          >
            <div className={`flex items-center gap-2 ${isCollapsed ? "justify-center" : ""}`}>
              {!isCollapsed && (
                <img
                  src={logo}
                  alt="AF Logo"
                  className={`${isCollapsed ? "w-8 h-8" : "w-auto h-8"}`}
                />
              )}
            </div>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="md:hidden text-foreground border border-foreground hover:bg-white/20 hover:text-foreground cursor-pointer"
              >
                <X className="h-6 w-6" />
              </Button>
            )}
          </div>

          <TooltipProvider delayDuration={0}>
            <nav className="space-y-2">
              {MenuList.map((item, index) => (
                <Tooltip key={index} open={isCollapsed ? activeTooltip === index : false}>
                  <TooltipTrigger asChild>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `w-full flex items-center text-foreground p-2 rounded-md cursor-pointer
                  hover:bg-foreground hover:text-sidebar transition
                  ${isActive ? "bg-white/10" : ""} 
                  ${isCollapsed ? "justify-center" : "justify-start gap-3"}`
                      }
                      onMouseEnter={() => setActiveTooltip(index)}
                      onMouseLeave={() => setActiveTooltip(null)}
                    >
                      <item.icon className={`h-5 w-5 ${!isCollapsed && "mr-2"} cursor-pointer`} />
                      {!isCollapsed && item.label}
                    </NavLink>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent
                      side="right"
                      className="bg-sidebar text-foreground border-b-blue-200/20 cursor-pointer"
                    >
                      <p>{item.label}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </TooltipProvider>
        </div>
      </div>

      {/* Bottom Navigation-sidebarra telas pequenas */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-sidebar border-t border-white/10 md:hidden  cursor-pointer">
        <div className="flex justify-center gap-6 p-2">
          {MenuList.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className={
                ({ isActive }) =>
                  `flex flex-col items-center hover:bg-foreground w-[75px] p-0.5 rounded-md  cursor-pointer
                ${isActive ? "bg-foreground text-sidebar hover:text-sidebar" : "hover:text-sidebar"}
                hover:rounded-lg` // Aqui adicionamos os cantos arredondados no hover
              }
            >
              <item.icon className="h-6 w-4" />
              <span className="text-[10px] text-center font-extralight">{item.label}</span>{" "}
              {/* Alinha o texto no centro */}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}
