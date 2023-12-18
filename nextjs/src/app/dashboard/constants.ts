import { PlagiarismOutlined, PieChartOutline } from "@mui/icons-material";

export enum DashboardSidebarViews {
  Intel = "intel",
  Charts = "charts",
}

export const DashboardSidebarLinks = [
  { id: DashboardSidebarViews.Intel, label: "Intel", icon: PlagiarismOutlined },
  { id: DashboardSidebarViews.Charts, label: "Charts", icon: PieChartOutline },
];
