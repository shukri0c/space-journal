"use server";

export async function loginUser(formData: FormData) {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    console.log("Login attempt:", { email, password });

}

export async function signupUser(formData: FormData) {
    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirmPassword")?.toString();

    console.log("Login attempt:", { email, password, confirmPassword, username});

}