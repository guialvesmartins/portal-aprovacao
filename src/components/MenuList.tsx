import { DollarSign, House, LucideIcon } from "lucide-react";

export interface LinkItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

export const MenuList: Array<LinkItemProps> = [
  { to: "/", icon: House, label: "Home" },
  { to: "/solicitacoes", icon: DollarSign, label: "Solicitações de Compra" },
];
