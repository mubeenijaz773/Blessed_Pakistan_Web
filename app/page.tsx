
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard/page";
import BottomSheetCard from "./Bottomsheet_forEmail/page";
import NavbarUnique from "./Navbar/page";

export default function Home() {
  return (
    <div>
      <NavbarUnique />
      <Dashboard />
      {/* Render the bottom sheet card */}
      <BottomSheetCard />
      <ToastContainer position="top-center" />
    </div>
  );
}
