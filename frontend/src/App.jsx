import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TownSquare from "./pages/TownSquare";
import BulletinBoard from "./pages/BulletinBoard";
import LostFound from "./pages/LostFound";
import HelpDesk from "./pages/HelpDesk";
import Events from "./pages/Events";
import routes from "./routes/routes";

export default function App() {
  let router = createBrowserRouter(routes);
  return (
    // <Router>
    //     <Routes>
    //       <Route path="/" element={<TownSquare />} />
    //       <Route path="/bulletin" element={<BulletinBoard />} />
    //       <Route path="/lostfound" element={<LostFound />} />
    //       <Route path="/helpdesk" element={<HelpDesk />} />
    //       <Route path="/events" element={<Events />} />
    //     </Routes>
    // </Router>
    <RouterProvider router={router} />
  );
}
