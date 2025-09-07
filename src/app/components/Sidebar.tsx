import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-950 p-6 border-r border-gray-800 flex-shrink-0 fixed left-0 h-screen">
      <h1 className="text-xl font-bold mb-8 text-white">Dashboard</h1>
      <nav className="block text-gray-300 hover:text-white space-y-4">
        <Link href="/app/page" className="block text-gray-300 hover:text-white">
          Home
        </Link>
        <Link
          href="/dashboard/journal"
          className="block text-gray-300 hover:text-white"
        >
          Journal
        </Link>
        <Link
          href="/dashboard/profile"
          className="block text-gray-300 hover:text-white"
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}
