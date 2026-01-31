import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
export default function Admin() {
  return (
    <div className="flex w-full border-right-2 h-full">
        <div className="flex-1 border-r-2">
            <AdminSidebar />
        </div>
      <div className="flex-5 p-4">
        <Outlet />
      </div>
    </div>
  );
}
