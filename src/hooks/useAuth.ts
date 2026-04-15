import { logout } from "@lib/auth";

export function signOut() {
    logout();
    window.location.href = "/";
}
