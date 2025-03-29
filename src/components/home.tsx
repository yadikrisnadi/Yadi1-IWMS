import React from "react";
import { Card, CardContent } from "./ui/card";
import KpiOverview from "./dashboard/KpiOverview";
import SpaceUtilization from "./dashboard/SpaceUtilization";
import ComplianceStatus from "./dashboard/ComplianceStatus";
import FloorPlanPreview from "./dashboard/FloorPlanPreview";
import IoTSummary from "./dashboard/IoTSummary";
import { Bell, ChevronDown, Menu, Search, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  active = false,
  badge,
  onClick,
}: SidebarItemProps) => {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${active ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" : "hover:bg-slate-100"}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {badge && (
        <Badge
          variant={active ? "outline" : "secondary"}
          className={
            active
              ? "border-white/50 text-white bg-white/10"
              : "bg-slate-200 text-slate-700"
          }
        >
          {badge}
        </Badge>
      )}
    </div>
  );
};

const Sidebar = () => {
  return (
    <div className="w-[280px] h-full bg-slate-50 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            IW
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">IWMS</h1>
            <p className="text-xs text-slate-500">Indonesian Core Platform</p>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 space-y-2 overflow-auto px-4">
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
          }
          label="Dashboard"
          active={true}
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
              <path d="M1 21h22" />
              <path d="M6 9h4" />
              <path d="M14 9h4" />
              <path d="M6 13h4" />
              <path d="M14 13h4" />
              <path d="M6 17h4" />
              <path d="M14 17h4" />
            </svg>
          }
          label="Real Estate & Portfolio Management"
          onClick={() => (window.location.href = "/real-estate-leasing")}
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
          }
          label="Space Management & Planning"
          onClick={() => (window.location.href = "/space-management")}
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          }
          label="Facility Maintenance"
          onClick={() => (window.location.href = "/facility-maintenance")}
          badge={2}
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 22V7H9V22" />
              <path d="M15 2H4V17" />
              <path d="M12 12H2V22" />
              <path d="M7 7H22" />
            </svg>
          }
          label="Capital Projects"
          onClick={() => (window.location.href = "/capital-projects")}
          badge={3}
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              <path d="M8 5.5V1" />
              <path d="M16 5.5V1" />
              <path d="M12 5.5V1" />
            </svg>
          }
          label="Environmental & Energy"
          onClick={() => (window.location.href = "/environmental-energy")}
          badge="New"
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
              <path d="M9 4v16"></path>
              <path d="M15 4v16"></path>
              <path d="M4 9h16"></path>
              <path d="M4 15h16"></path>
            </svg>
          }
          label="Workplace Experience"
          onClick={() => (window.location.href = "/workplace-experience")}
          badge="New"
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m8 11 3 3 5-5" />
            </svg>
          }
          label="Green Building Certification"
          onClick={() =>
            (window.location.href = "/green-building-certification")
          }
          badge="New"
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
              <path d="M12 3v6" />
            </svg>
          }
          label="Floor Plans"
          badge={3}
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
          label="IoT & BMS"
          badge="Live"
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.95 1 4.8a.2.2 0 0 1-.2.2h-.5a.8.8 0 0 0-.8.8v1.4a.8.8 0 0 0 .8.8h1.5a.8.8 0 0 1 .8.8v2.95Z" />
              <path d="M19.8 17.8h.7a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-2.2a1 1 0 0 1-.986-1.173c.111-.852.7-1.827 1.486-1.827.786 0 1.5-.92 1.5-2.309C20.3 7.327 19.3 5 16 5h-4.3" />
            </svg>
          }
          label="Compliance"
          badge={2}
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </svg>
          }
          label="Reports"
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          }
          label="Settings"
        />
        <SidebarItem
          icon={
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
          label="Admin Panel"
        />
      </div>

      <div className="p-6 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-3">
          <Avatar className="border-2 border-slate-100 shadow-sm">
            <AvatarImage
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
              alt="User"
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-sm">Admin User</p>
            <p className="text-xs text-slate-500">admin@iwms.id</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-slate-100"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="h-[72px] border-b border-slate-100 bg-white flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-slate-100"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-slate-100 relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white rounded-full text-[10px] flex items-center justify-center shadow-sm">
            3
          </span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-slate-100"
        >
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
            alt="User"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

const Home = () => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-8 bg-slate-50">
          <div className="max-w-7xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1 tracking-tight">
                IWMS Dashboard
              </h1>
              <p className="text-slate-500">
                Welcome to the Indonesian Integrated Workplace Management System
              </p>
            </div>

            <KpiOverview />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SpaceUtilization />
              <ComplianceStatus />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloorPlanPreview />
              <IoTSummary />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
