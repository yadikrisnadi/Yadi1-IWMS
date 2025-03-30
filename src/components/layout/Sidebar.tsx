import React from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building2,
  LogOut,
  ChevronRight,
  LayoutDashboard,
  Wrench,
  Briefcase,
  Leaf,
  TreePine,
  Users,
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
  const { t } = useTranslation();
  // Navigation items for the IWMS modules
  const navItems = [
    {
      label: t("dashboard"),
      path: "/",
      icon: Building2,
    },
    {
      label: t("realEstate"),
      path: "/real-estate-leasing",
      icon: Building2,
    },
    {
      label: t("spaceManagement"),
      path: "/space-management",
      icon: LayoutDashboard,
    },
    {
      label: t("facilityMaintenance"),
      path: "/facility-maintenance",
      icon: Wrench,
    },
    {
      label: t("capitalProjects"),
      path: "/capital-projects",
      icon: Briefcase,
    },
    {
      label: t("environmentalEnergy"),
      path: "/environmental-energy",
      icon: Leaf,
    },
    {
      label: t("greenBuilding"),
      path: "/green-building-certification",
      icon: TreePine,
    },
    {
      label: t("workplaceExperience"),
      path: "/workplace-experience",
      icon: Users,
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-slate-900 text-white transition-all duration-300 flex-shrink-0",
        collapsed ? "w-16" : "w-[260px]",
      )}
    >
      <div className="flex items-center justify-between p-1 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-emerald-500" />
          {!collapsed && (
            <span className="font-bold text-base">IWMS Indonesia</span>
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

      <div className="flex-1 py-0 overflow-y-auto">
        {/* Navigation section is empty since navItems is an empty array */}
        <nav className="px-0.5 space-y-0 -my-2">
          <TooltipProvider delayDuration={200}>
            {navItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-0.5 px-1.5 py-0 rounded-sm transition-colors h-1.5 text-xs leading-none overflow-hidden",
                        isActive
                          ? "bg-emerald-600 text-white"
                          : "text-slate-300 hover:bg-slate-800",
                        collapsed && "justify-center",
                      )
                    }
                  >
                    <item.icon className="h-2 w-2 flex-shrink-0" />
                    {!collapsed && (
                      <span className="ml-1 text-xs leading-none truncate w-full">
                        {item.label}
                      </span>
                    )}
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

      <div className="p-0.5 border-t border-slate-700">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-0.5 w-full px-1.5 py-0 rounded-sm text-slate-300 hover:bg-slate-800 transition-colors h-2 text-xs leading-none",
                  collapsed && "justify-center",
                )}
              >
                <LogOut className="h-2 w-2" />
                {!collapsed && (
                  <span className="ml-1 text-xs leading-none">
                    {t("logout")}
                  </span>
                )}
              </button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>{t("logout")}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
