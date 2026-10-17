import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { MyPage } from "./pages/MyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { LongevityPage } from "./pages/LongevityPage";
import {Layout} from "./components/layout/Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "login", element: <LoginPage /> },
            { path: "my", element: <MyPage /> },
            { path: "services/:id", element: <ServiceDetailPage /> },
            { path: "longevity", element: <LongevityPage /> },
            { path: "*", element: <NotFoundPage /> },
        ],
    },
]);
