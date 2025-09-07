"use server";

import { redirect } from "next/navigation";
import { signupSchema } from "@/lib/signupSchema";
import { loginSchema } from "@/lib/loginSchema";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { compare } from "bcryptjs";

export type SignupState = {
  error: string | null;
};

export async function signupUser(
  prevState: SignupState,
  formData: FormData
): Promise<SignupState> {
  const rawData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = signupSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { username, email, password } = parsed.data;

  const existingUser = await db.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });

  if (existingUser) {
    return { error: "User with this email or username already exists" };
  }

  const hashedPassword = await hash(password, 12);

  await db.user.create({
    data: { username, email, password: hashedPassword },
  });

  

  return { error: null }; // <- TS happy, even though redirect exits
}




export type LoginState = {
  error: string | null;
};

export async function loginUser(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const rawData = {
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { identifier, password } = parsed.data;

  const user = await db.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) {
    return { error: "Invalid username/email or password" };
  }

  const passwordMatch = await compare(password, user.password);
  if (!passwordMatch) {
    return { error: "Invalid username/email or password" };
  }

  // ✅ Return null error to indicate success
  return { error: null };
}