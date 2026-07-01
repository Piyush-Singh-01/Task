import { FaTasks } from "react-icons/fa";

function Navbar() {
  // Format current date
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 text-white p-2 rounded-lg">
            <FaTasks size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-800">Task Tracker</h1>
        </div>

        {/* Current Date */}
        <p className="text-sm text-slate-500 hidden sm:block">{today}</p>
      </div>
    </nav>
  );
}

export default Navbar;
