export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-6xl min-h-screen mx-auto bg-white flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}
