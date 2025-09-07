import Sidebar from "../components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />
      <main className="min-h-screen min-w-screen flex flex-col bg-black-900">
        {" "}
        {children}{" "}
      </main>
    </div>
  );
}
