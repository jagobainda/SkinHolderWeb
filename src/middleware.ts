import { defineMiddleware } from "astro:middleware";

const PROTECTED_ROUTES = ["/home", "/registros", "/items", "/config"];
const API_BASE = import.meta.env.PROD ? "https://shapi.jagoba.dev" : "https://shapi.jagoba.dev";

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;
    const isProtected = PROTECTED_ROUTES.some(route => pathname === route || pathname.startsWith(route + "/"));

    if (!isProtected) return next();

    const token = context.cookies.get("sh_token")?.value;

    if (!token) {
        return context.redirect("/");
    }

    try {
        const res = await fetch(`${API_BASE}/Auth/validate`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (!data.valid) {
            context.cookies.delete("sh_token", { path: "/" });
            return context.redirect("/");
        }
    } catch {
        context.cookies.delete("sh_token", { path: "/" });
        return context.redirect("/");
    }

    return next();
});
