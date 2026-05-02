import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata = {
  title: "后台管理｜AI应用开发者个人品牌官网",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminPage() {
  return <AdminDashboard />;
}
