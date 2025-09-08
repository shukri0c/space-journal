import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex bg-gray-900 text-white ml-20">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col min-h-screen">{children}</div>
      </div>
    </main>
  );
}
