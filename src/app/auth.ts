import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Server-side session helper
export function auth() {
  return getServerSession(authOptions);
}