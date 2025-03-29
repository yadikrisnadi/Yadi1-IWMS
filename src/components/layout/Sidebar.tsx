import React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Cpu,
  ClipboardCheck,
  FileText,
  Settings,
  ShieldCheck,
  Building2,
  LogOut,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar = ({ collapsed = false, onToggle }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Map, label: "Floor Plans", path: "/floor-plans" },
    { icon: Cpu, label: "IoT & BMS", path: "/iot-bms" },
    {
      icon: Building2,
      label: "Real Estate & Leasing",
      path: "/real-estate-leasing",
    },
    { icon: ClipboardCheck, label: "Compliance", path: "/compliance" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Settings, label: "User Settings", path: "/settings" },
    { icon: ShieldCheck, label: "Admin Panel", path: "/admin" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-[280px]",
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-emerald-500" />
          {!collapsed && (
            <span className="font-bold text-xl">IWMS Indonesia</span>
          )}
        </div>
        <button
          onClick={onToggle}
          className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-slate-700"
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed ? "rotate-0" : "rotate-180",
            )}
          />
        </button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-2 space-y-1">
          <TooltipProvider delayDuration={200}>
            {navItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 px-3 py-3 rounded-md transition-colors",
                        isActive
                          ? "bg-emerald-600 text-white"
                          : "text-slate-300 hover:bg-slate-800",
                        collapsed && "justify-center",
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-3 rounded-md text-slate-300 hover:bg-slate-800 transition-colors",
                  collapsed && "justify-center",
                )}
              >
                <LogOut className="h-5 w-5" />
                {!collapsed && <span>Logout</span>}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
