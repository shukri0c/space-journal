export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-h-screen mx-auto bg-[#0b0f2b]  flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}
