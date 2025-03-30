import React from "react";
import { Card, CardContent } from "./ui/card";
import KpiOverview from "./dashboard/KpiOverview";
import SpaceUtilization from "./dashboard/SpaceUtilization";
import ComplianceStatus from "./dashboard/ComplianceStatus";
import FloorPlanPreview from "./dashboard/FloorPlanPreview";
import IoTSummary from "./dashboard/IoTSummary";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useTranslation } from "react-i18next";
import Header from "./layout/Header";

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
  const { t } = useTranslation();
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all ${active ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md" : "hover:bg-slate-100"}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium">{t(label)}</span>
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
      <div
        className={
          "flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-all hover:bg-slate-100"
        }
        onClick={() => console.log("onClick")}
      >
        <div className={"flex items-center gap-3"}>
          <svg
            className={"w-5 h-5"}
            xmlns={"http://www.w3.org/2000/svg"}
            width={"24"}
            height={"24"}
            viewBox={"0 0 24 24"}
            fill={"none"}
            stroke={"currentColor"}
            strokeWidth={"2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          />
          <span className={"font-medium"}>Facility Maintenance</span>
        </div>
        <Badge variant={"secondary"} className={"bg-slate-200 text-slate-700"}>
          <Badge
            className={
              "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 bg-slate-200 text-slate-700"
            }
          />
        </Badge>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div className="w-[280px] h-full bg-slate-50 flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
            IW
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight">IWMS</h1>
            <p className="text-xs text-slate-500">
              {t("indonesianCorePlatform")}
            </p>
          </div>
        </div>
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
            <p className="font-medium text-sm">{t("adminUser")}</p>
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

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header
          userName="Admin User"
          userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
          notificationCount={3}
        />

        <main className="flex-1 overflow-auto bg-white w-full main-content">
          <div className="w-full h-full p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-1 tracking-tight">
                {t("iwmsDashboard")}
              </h1>
              <p className="text-slate-500">{t("welcomeMessage")}</p>
            </div>

            <KpiOverview />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
              <SpaceUtilization />
              <ComplianceStatus />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
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
