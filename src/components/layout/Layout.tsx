import {Outlet} from "react-router";
import {Navbar} from "./Navbar";

export function Layout() {
    return (
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <main className="mx-auto max-w-6xl px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
}