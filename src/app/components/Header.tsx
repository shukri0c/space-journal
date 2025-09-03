import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-6 border-b border-black">
      <h1 className="text-xl font-bold">Stargazer Journal</h1>

      <nav className="flex gap-6 text-lg">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}

//py-4 text-xl border-b-1 border-gray
