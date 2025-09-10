export default function Loading() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
        <p className="text-lg">Logging you in...</p>
      </div>
    </main>
  );
}
