import {
  AlertTriangle,
  ClipboardList,
  FileMinus2,
  FileText,
  House,
  LucideIcon,
} from "lucide-react";

export interface LinkItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export const MenuList: Array<LinkItemProps> = [
  { to: "/", icon: House, label: "Home" },
  { to: "/solicitacoes", icon: ClipboardList, label: "Solicitações de Compra" },
  { to: "/pedidos", icon: FileText, label: "Pedidos de Compra" },
  { to: "/titulos", icon: FileMinus2, label: "Títulos a Pagar" },
  { to: "/contingencia", icon: AlertTriangle, label: "Contingência" },
];
