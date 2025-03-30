import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Common
          iwmsDashboard: "IWMS Dashboard",
          welcomeMessage:
            "Welcome to the Indonesian Integrated Workplace Management System",
          dashboard: "Dashboard",
          floorPlans: "Floor Plans",
          iotBms: "IoT & BMS",
          realEstateLeasing: "Real Estate & Leasing",
          compliance: "Compliance",
          reports: "Reports",
          userSettings: "User Settings",
          adminPanel: "Admin Panel",
          logout: "Logout",
          search: "Search...",
          administrator: "Administrator",
          myAccount: "My Account",
          settings: "Settings",
          profile: "Profile",
          indonesianCorePlatform: "Indonesian Core Platform",
          adminUser: "Admin User",
          realEstatePortfolioManagement: "Real Estate & Portfolio Management",
          spaceManagementPlanning: "Space Management & Planning",
          facilityMaintenance: "Facility Maintenance",
          capitalProjects: "Capital Projects",
          environmentalEnergy: "Environmental & Energy",
          workplaceExperience: "Workplace Experience",
          greenBuildingCertification: "Green Building Certification",
          loadingGreenBuilding: "Loading green building certification data...",
          errorGreenBuilding:
            "Error loading green building certification data. Please try again later.",
          settings: "Settings",
          adminPanel: "Admin Panel",
          new: "New",
          live: "Live",

          // Real Estate & Leasing
          realEstateTitle: "Real Estate & Investment Asset Management",
          realEstateDescription:
            "Comprehensive tools for managing your property portfolio, leases, assets, and transactions",
          properties: "Properties",
          leases: "Leases",
          investmentAssets: "Investment Assets",
          leaseManagement: "Lease Mgmt",
          transactions: "Transactions",

          // Facility Maintenance
          facilityMaintenanceTitle: "Facility Maintenance Management",
          filter: "Filter",
          export: "Export",
          newWorkOrder: "New Work Order",
          facilityAssets: "Facility Assets",
          workOrderManagement: "Work Order Management",
          preventiveMaintenance: "Preventive Maintenance",
          assetLifecycle: "Asset Lifecycle",

          // Green Building & Waste Management
          wasteManagement: "Waste Management",
          wasteMonitoring: "Monitoring and management of waste by category",
          wasteComposition: "Waste Composition",
          monthlyTrend: "Monthly Trend",
          organicWaste: "Organic Waste",
          inorganicWaste: "Inorganic Waste",
          hazardousWaste: "Hazardous Waste (B3)",
          organicDescription:
            "Food waste, garden waste, and other biodegradable materials",
          inorganicDescription:
            "Plastic, glass, metal, and other non-biodegradable materials",
          hazardousDescription:
            "Toxic, corrosive, flammable, and other hazardous materials",
          monthlyTotal: "Monthly Total",
          target: "Target",
          fromTarget: "from target",
          composition: "Composition",
          foodWaste: "Food Waste",
          gardenWaste: "Garden Waste",
          paper: "Paper",
          other: "Other",
          plastic: "Plastic",
          glass: "Glass",
          metal: "Metal",
          chemical: "Chemical",
          electronic: "Electronic",
          medical: "Medical",
          managementMethod: "Management Method",
          composting: "Composting",
          biogas: "Biogas",
          landfill: "Landfill",
          recycling: "Recycling",
          reuse: "Reuse",
          specialTreatment: "Special Treatment",
          incineration: "Incineration",
          specialLandfill: "Special B3 Landfill",
        },
      },
      id: {
        translation: {
          // Common
          iwmsDashboard: "Dasbor IWMS",
          welcomeMessage:
            "Selamat datang di Sistem Manajemen Tempat Kerja Terpadu Indonesia",
          dashboard: "Dasbor",
          floorPlans: "Denah Lantai",
          iotBms: "IoT & BMS",
          realEstateLeasing: "Real Estate & Sewa",
          compliance: "Kepatuhan",
          reports: "Laporan",
          userSettings: "Pengaturan Pengguna",
          adminPanel: "Panel Admin",
          logout: "Keluar",
          search: "Cari...",
          administrator: "Administrator",
          myAccount: "Akun Saya",
          settings: "Pengaturan",
          profile: "Profil",
          indonesianCorePlatform: "Platform Inti Indonesia",
          adminUser: "Pengguna Admin",
          realEstatePortfolioManagement: "Manajemen Portofolio Real Estate",
          spaceManagementPlanning: "Manajemen & Perencanaan Ruang",
          facilityMaintenance: "Pemeliharaan Fasilitas",
          capitalProjects: "Proyek Modal",
          environmentalEnergy: "Lingkungan & Energi",
          workplaceExperience: "Pengalaman Tempat Kerja",
          greenBuildingCertification: "Sertifikasi Bangunan Hijau",
          loadingGreenBuilding: "Memuat data sertifikasi bangunan hijau...",
          errorGreenBuilding:
            "Terjadi kesalahan saat memuat data sertifikasi bangunan hijau. Silakan coba lagi nanti.",
          floorPlans: "Denah Lantai",
          iotBms: "IoT & BMS",
          compliance: "Kepatuhan",
          reports: "Laporan",
          settings: "Pengaturan",
          adminPanel: "Panel Admin",
          new: "Baru",
          live: "Langsung",

          // Green Building & Waste Management
          wasteManagement: "Pengelolaan Sampah",
          wasteMonitoring:
            "Pemantauan dan pengelolaan sampah berdasarkan kategori",
          wasteComposition: "Komposisi Sampah",
          monthlyTrend: "Tren Bulanan",
          organicWaste: "Sampah Organik",
          inorganicWaste: "Sampah Anorganik",
          hazardousWaste: "Limbah B3",
          organicDescription:
            "Sampah makanan, sampah kebun, dan bahan biodegradable lainnya",
          inorganicDescription:
            "Plastik, kaca, logam, dan bahan non-biodegradable lainnya",
          hazardousDescription:
            "Bahan beracun, korosif, mudah terbakar, dan bahan berbahaya lainnya",
          monthlyTotal: "Total Bulanan",
          target: "Target",
          fromTarget: "dari target",
          composition: "Komposisi",
          foodWaste: "Sampah Makanan",
          gardenWaste: "Sampah Kebun",
          paper: "Kertas",
          other: "Lainnya",
          plastic: "Plastik",
          glass: "Kaca",
          metal: "Logam",
          chemical: "Kimia",
          electronic: "Elektronik",
          medical: "Medis",
          managementMethod: "Metode Pengelolaan",
          composting: "Komposting",
          biogas: "Biogas",
          landfill: "TPA",
          recycling: "Daur Ulang",
          reuse: "Penggunaan Ulang",
          specialTreatment: "Pengolahan Khusus",
          incineration: "Insinerasi",
          specialLandfill: "TPA Khusus B3",

          // Real Estate & Leasing
          realEstateTitle: "Manajemen Properti & Aset Investasi",
          realEstateDescription:
            "Alat komprehensif untuk mengelola portofolio properti, sewa, aset, dan transaksi Anda",
          properties: "Properti",
          leases: "Sewa",
          investmentAssets: "Aset Investasi",
          leaseManagement: "Manajemen Sewa",
          transactions: "Transaksi",

          // Facility Maintenance
          facilityMaintenanceTitle: "Manajemen Pemeliharaan Fasilitas",
          filter: "Filter",
          export: "Ekspor",
          newWorkOrder: "Order Kerja Baru",
          facilityAssets: "Aset Fasilitas",
          workOrderManagement: "Manajemen Order Kerja",
          preventiveMaintenance: "Pemeliharaan Preventif",
          assetLifecycle: "Siklus Hidup Aset",
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
