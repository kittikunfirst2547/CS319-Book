import { Link, NavLink } from "react-router";

const navItems = [
    { to: "/", label: "หน้าหลัก" },
    { to: "/longevity", label: "Longevity Check" },
    { to: "/my?tab=favorites", label: "รายการโปรด" },
    { to: "/about", label: "About" },
];

function navClass({ isActive }: { isActive: boolean }) {
    const base = "pb-1 border-b-2 transition-colors";
    return isActive
        ? `${base} font-bold border-primary text-primary`
        : `${base} border-transparent hover:text-primary`;
}

export function Navbar() {
    return (
        <header className="bg-base-100 shadow-sm">
            <nav className="navbar mx-auto max-w-6xl px-4">
                <Link to="/" className="flex-1 text-2xl font-bold text-primary">
                    Wellbook
                </Link>

                <ul className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink to={item.to} end={item.to === "/"} className={navClass}>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <Link to="/login" className="btn btn-outline btn-primary ml-6">
                    เข้าสู่ระบบ
                </Link>
            </nav>
        </header>
    );
}