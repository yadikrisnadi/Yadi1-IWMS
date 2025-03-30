import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { useTranslation } from "react-i18next";
import Header from "../layout/Header";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Menu,
  ChevronDown,
  Calendar,
  Users,
  Building,
  Coffee,
  Wifi,
  Thermometer,
  MessageSquare,
  Star,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { enhancedWorkplaceExperienceService } from "./enhancedWorkplaceExperienceService";
import { WorkplaceExperienceData } from "@/models/workplaceExperience";

const WorkplaceExperience = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<WorkplaceExperienceData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data, error } =
          await enhancedWorkplaceExperienceService.getWorkplaceExperienceData();
        if (error) {
          setError(error);
        } else if (data) {
          setData(data);
        }
      } catch (err) {
        setError(
          "Terjadi kesalahan saat memuat data. Silakan coba lagi nanti.",
        );
        console.error("Error in WorkplaceExperience:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full bg-white items-center justify-center">
        <div className="w-full max-w-md p-8 text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">
            {t(
              "loadingWorkplaceExperience",
              "Memuat data pengalaman tempat kerja...",
            )}
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex h-screen w-full bg-white items-center justify-center">
        <div className="w-full max-w-md p-8 text-center bg-red-50 border border-red-100 rounded-lg">
          <AlertTriangle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">
            {t("errorOccurred", "Terjadi Kesalahan")}
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-red-200 hover:bg-red-100"
          >
            {t("tryAgain", "Coba Lagi")}
          </Button>
        </div>
      </div>
    );
  }

  // If no data is available
  if (!data) {
    return (
      <div className="flex h-screen w-full bg-white items-center justify-center">
        <div className="w-full max-w-md p-8 text-center">
          <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600">
            {t("noDataAvailable", "Tidak ada data yang tersedia")}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            {t("refresh", "Muat Ulang")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-white">
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
                {t("workplaceExperience")}
              </h1>
              <p className="text-slate-500">
                {t("workplaceExperienceDescription")}
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5 gap-2">
                <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
                <TabsTrigger value="reservations">
                  {t("reservations")}
                </TabsTrigger>
                <TabsTrigger value="amenities">{t("amenities")}</TabsTrigger>
                <TabsTrigger value="feedback">{t("feedback")}</TabsTrigger>
                <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("deskUtilization")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">76%</div>
                      <p className="text-xs text-muted-foreground">
                        +2.5% {t("fromLastWeek")}
                      </p>
                      <Progress value={76} className="h-1 mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("meetingRoomUsage")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">82%</div>
                      <p className="text-xs text-muted-foreground">
                        +5.2% {t("fromLastWeek")}
                      </p>
                      <Progress value={82} className="h-1 mt-2" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("employeeSatisfaction")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.2/5</div>
                      <p className="text-xs text-muted-foreground">
                        +0.3 {t("fromLastQuarter")}
                      </p>
                      <div className="flex mt-2">
                        {[1, 2, 3, 4].map((i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">
                        {t("serviceRequests")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24</div>
                      <p className="text-xs text-muted-foreground">
                        -3 {t("fromLastWeek")}
                      </p>
                      <div className="flex justify-between mt-2">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          15 {t("resolved")}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-yellow-50 text-yellow-700 border-yellow-200"
                        >
                          9 {t("pending")}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>{t("upcomingReservations")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Team Brainstorming",
                            location: "Meeting Room A-101",
                            time: "10:00 - 11:30",
                            date: "Today",
                            attendees: 8,
                          },
                          {
                            title: "Project Review",
                            location: "Conference Room B-201",
                            time: "13:00 - 14:00",
                            date: "Today",
                            attendees: 5,
                          },
                          {
                            title: "Client Presentation",
                            location: "Presentation Hall",
                            time: "09:30 - 11:00",
                            date: "Tomorrow",
                            attendees: 12,
                          },
                        ].map((meeting, i) => (
                          <div
                            key={i}
                            className="flex items-start justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-50 rounded-md">
                                <Calendar className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium">{meeting.title}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                                  <Building className="h-3.5 w-3.5" />
                                  <span>{meeting.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>
                                    {meeting.date}, {meeting.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-slate-400" />
                              <span className="text-sm text-slate-500">
                                {meeting.attendees}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        {t("viewAllReservations")}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t("workplaceAmenities")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            name: t("wifiNetwork"),
                            status: t("operational"),
                            icon: <Wifi className="h-5 w-5 text-green-500" />,
                            statusColor: "text-green-500",
                          },
                          {
                            name: t("cafeteria"),
                            status: t("openUntil") + " 18:00",
                            icon: <Coffee className="h-5 w-5 text-amber-500" />,
                            statusColor: "text-amber-500",
                          },
                          {
                            name: t("hvacSystem"),
                            status: t("optimal") + " (23°C)",
                            icon: (
                              <Thermometer className="h-5 w-5 text-blue-500" />
                            ),
                            statusColor: "text-blue-500",
                          },
                          {
                            name: t("supportDesk"),
                            status: t("available"),
                            icon: (
                              <MessageSquare className="h-5 w-5 text-indigo-500" />
                            ),
                            statusColor: "text-indigo-500",
                          },
                        ].map((amenity, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg border border-slate-100"
                          >
                            <div className="flex items-center gap-3">
                              {amenity.icon}
                              <span className="font-medium">
                                {amenity.name}
                              </span>
                            </div>
                            <span className={`text-sm ${amenity.statusColor}`}>
                              {amenity.status}
                            </span>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4">
                        {t("viewAllAmenities")}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reservations" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("workspaceReservations")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 mb-4">
                      {t("workspaceReservationsDescription")}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          type: t("desk"),
                          location: "Open Area A",
                          available: 12,
                          total: 20,
                        },
                        {
                          type: t("meetingRoom"),
                          location: "Floor 2",
                          available: 5,
                          total: 8,
                        },
                        {
                          type: t("focusRoom"),
                          location: "Floor 3",
                          available: 3,
                          total: 4,
                        },
                        {
                          type: t("collaborationSpace"),
                          location: "Floor 1",
                          available: 2,
                          total: 3,
                        },
                        {
                          type: t("conferenceRoom"),
                          location: "Floor 4",
                          available: 1,
                          total: 2,
                        },
                        {
                          type: t("phoneBooths"),
                          location: "Various Floors",
                          available: 6,
                          total: 10,
                        },
                      ].map((space, i) => (
                        <Card key={i} className="border border-slate-200">
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-1">{space.type}</h3>
                            <p className="text-sm text-slate-500 mb-2">
                              {space.location}
                            </p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">
                                {space.available}/{space.total} {t("available")}
                              </span>
                              <Button size="sm">{t("reserve")}</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("workplaceAmenities")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 mb-4">
                      {t("workplaceAmenitiesDescription")}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        {
                          name: t("cafeteria"),
                          description: t("cafeteriaDescription"),
                          icon: <Coffee className="h-6 w-6" />,
                          status: t("open"),
                          hours: "07:00 - 18:00",
                        },
                        {
                          name: t("fitnessCenter"),
                          description: t("fitnessCenterDescription"),
                          icon: (
                            <svg
                              className="h-6 w-6"
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
                              <path d="M18 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                              <path d="M14 4h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" />
                              <path d="M18 16h.01" />
                              <path d="M6 16h.01" />
                              <path d="M12 16h.01" />
                              <path d="M12 20h.01" />
                              <path d="M18 20h.01" />
                              <path d="M6 20h.01" />
                            </svg>
                          ),
                          status: t("open"),
                          hours: "06:00 - 22:00",
                        },
                        {
                          name: t("relaxationRoom"),
                          description: t("relaxationRoomDescription"),
                          icon: (
                            <svg
                              className="h-6 w-6"
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
                              <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                              <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                              <path d="M5 18v2" />
                              <path d="M19 18v2" />
                            </svg>
                          ),
                          status: t("open"),
                          hours: "09:00 - 18:00",
                        },
                        {
                          name: t("gameRoom"),
                          description: t("gameRoomDescription"),
                          icon: (
                            <svg
                              className="h-6 w-6"
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
                              <rect width="20" height="12" x="2" y="6" rx="2" />
                              <path d="M12 18v4" />
                              <path d="M8 22h8" />
                              <circle cx="12" cy="12" r="2" />
                              <path d="M18 12h.01" />
                              <path d="M6 12h.01" />
                            </svg>
                          ),
                          status: t("open"),
                          hours: "12:00 - 20:00",
                        },
                        {
                          name: t("outdoorSpace"),
                          description: t("outdoorSpaceDescription"),
                          icon: (
                            <svg
                              className="h-6 w-6"
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
                              <path d="M2 22v-5l5-5 5 5-5 5z" />
                              <path d="M9.5 14.5 16 8" />
                              <path d="M17 2v5l-5 5-5-5 5-5z" />
                            </svg>
                          ),
                          status: t("open"),
                          hours: "08:00 - 19:00",
                        },
                        {
                          name: t("mothersCare"),
                          description: t("mothersCareDescription"),
                          icon: (
                            <svg
                              className="h-6 w-6"
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
                              <path d="M12 22a8 8 0 0 0 8-8" />
                              <path d="M12 22a8 8 0 0 1-8-8" />
                              <circle cx="12" cy="7" r="5" />
                            </svg>
                          ),
                          status: t("open"),
                          hours: "07:00 - 19:00",
                        },
                      ].map((amenity, i) => (
                        <Card key={i} className="overflow-hidden">
                          <div className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="p-2 bg-blue-50 rounded-md text-blue-600">
                                {amenity.icon}
                              </div>
                              <div>
                                <h3 className="font-medium">{amenity.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    {amenity.status}
                                  </Badge>
                                  <span>{amenity.hours}</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-slate-500">
                              {amenity.description}
                            </p>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("workplaceFeedback")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 mb-4">
                      {t("workplaceFeedbackDescription")}
                    </p>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border border-slate-200">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              {t("recentFeedback")}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                {
                                  user: "Sarah K.",
                                  avatar:
                                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                                  comment: t("feedbackComment1"),
                                  category: t("workspaceComfort"),
                                  time: "2 hours ago",
                                  rating: 4,
                                },
                                {
                                  user: "Michael T.",
                                  avatar:
                                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                                  comment: t("feedbackComment2"),
                                  category: t("amenities"),
                                  time: "Yesterday",
                                  rating: 5,
                                },
                                {
                                  user: "Aisha J.",
                                  avatar:
                                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
                                  comment: t("feedbackComment3"),
                                  category: t("technology"),
                                  time: "2 days ago",
                                  rating: 3,
                                },
                              ].map((feedback, i) => (
                                <div
                                  key={i}
                                  className="p-4 rounded-lg border border-slate-100"
                                >
                                  <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage
                                          src={feedback.avatar}
                                          alt={feedback.user}
                                        />
                                        <AvatarFallback>
                                          {feedback.user
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h4 className="font-medium text-sm">
                                          {feedback.user}
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                          {feedback.time}
                                        </p>
                                      </div>
                                    </div>
                                    <Badge variant="outline">
                                      {feedback.category}
                                    </Badge>
                                  </div>
                                  <p className="text-sm mb-2">
                                    {feedback.comment}
                                  </p>
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="border border-slate-200">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">
                              {t("submitFeedback")}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <form className="space-y-4">
                              <div>
                                <label className="text-sm font-medium block mb-1">
                                  {t("feedbackCategory")}
                                </label>
                                <select className="w-full p-2 rounded-md border border-slate-200">
                                  <option value="workspace">
                                    {t("workspaceComfort")}
                                  </option>
                                  <option value="amenities">
                                    {t("amenities")}
                                  </option>
                                  <option value="technology">
                                    {t("technology")}
                                  </option>
                                  <option value="services">
                                    {t("services")}
                                  </option>
                                  <option value="other">{t("other")}</option>
                                </select>
                              </div>
                              <div>
                                <label className="text-sm font-medium block mb-1">
                                  {t("rating")}
                                </label>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className="h-6 w-6 cursor-pointer text-slate-300 hover:text-yellow-400"
                                    />
                                  ))}
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium block mb-1">
                                  {t("comments")}
                                </label>
                                <textarea
                                  className="w-full p-2 rounded-md border border-slate-200 min-h-[100px]"
                                  placeholder={t("enterYourFeedback")}
                                ></textarea>
                              </div>
                              <Button className="w-full">
                                {t("submitFeedback")}
                              </Button>
                            </form>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("workplaceAnalytics")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 mb-4">
                      {t("workplaceAnalyticsDescription")}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="border border-slate-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {t("spaceUtilizationTrends")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[250px] flex items-center justify-center bg-slate-50 rounded-md">
                            <p className="text-slate-400">
                              {t("spaceUtilizationChart")}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {t("satisfactionMetrics")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[250px] flex items-center justify-center bg-slate-50 rounded-md">
                            <p className="text-slate-400">
                              {t("satisfactionMetricsChart")}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-slate-200 md:col-span-2">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            {t("keyInsights")}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              {
                                title: t("peakUsageHours"),
                                value: "10:00 - 14:00",
                                change: "+5% vs last month",
                                trend: "up",
                              },
                              {
                                title: t("averageMeetingDuration"),
                                value: "52 minutes",
                                change: "-3% vs last month",
                                trend: "down",
                              },
                              {
                                title: t("mostRequestedAmenity"),
                                value: t("cafeteria"),
                                change: t("unchanged"),
                                trend: "neutral",
                              },
                            ].map((insight, i) => (
                              <Card key={i} className="border border-slate-200">
                                <CardContent className="p-4">
                                  <h3 className="text-sm font-medium text-slate-500 mb-1">
                                    {insight.title}
                                  </h3>
                                  <p className="text-xl font-bold mb-1">
                                    {insight.value}
                                  </p>
                                  <p
                                    className={`text-xs ${insight.trend === "up" ? "text-green-500" : insight.trend === "down" ? "text-red-500" : "text-slate-500"}`}
                                  >
                                    {insight.change}
                                  </p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WorkplaceExperience;
