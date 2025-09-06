"use client";
import { signIn } from "next-auth/react";
import { useActionState } from "react";
import Link from "next/link";
import { loginUser, type LoginState } from "../actions/auth";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  // Wrap the server action so `useActionState` works properly
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identifier = formData.get("identifier") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      identifier,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      window.location.href = "/dashboard";
    }
  }
  return (
    <main className="flex-1 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Log in</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <input
              type="text"
              name="identifier"
              id="identifier"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-black font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
