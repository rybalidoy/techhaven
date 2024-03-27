"use server";

import { cookies } from "next/headers";

const cookieStore = cookies();

const createCookie = async (cookie: string, user: string) => {
    cookieStore.set(cookie, user, { maxAge: 60 * 2 });
};

const getCookie = async (name: string) => {
    const cookie = cookieStore.get(name);
    return cookie;
};
export { createCookie, getCookie };
