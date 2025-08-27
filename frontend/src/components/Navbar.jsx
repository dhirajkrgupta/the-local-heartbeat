import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-3 flex justify-between">
      <span className="font-bold text-lg">Local Pulse</span>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Town Square</Link>
        <Link to="/bulletin" className="hover:underline">Bulletin</Link>
        <Link to="/lostfound" className="hover:underline">Lost & Found</Link>
        <Link to="/helpdesk" className="hover:underline">Help Desk</Link>
        <Link to="/events" className="hover:underline">Events</Link>
      </div>
    </nav>
  );
}
