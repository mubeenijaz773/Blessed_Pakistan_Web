
'use client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard/page";
import BottomSheetCard from "./Bottomsheet_forEmail/page";
import Navbarunique from "./Navbar/page";
import { Suspense } from "react";
export default function Home() {
  return (
    <main >
      <Suspense>
      <Navbarunique />
</Suspense>
      <Dashboard />

      <BottomSheetCard />
      <ToastContainer position="top-center" />
    </main>
  );
}
