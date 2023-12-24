
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Dashboard/page';
import BottomSheetCard from "./Components/Bottomsheet_forEmail/page"


export default function Home() {

  return (
    <main >
   

<Dashboard />
 {/* Render the bottom sheet card */}


 <BottomSheetCard />
 
    <ToastContainer position="top-center" /> 
    </main>
  )
}
