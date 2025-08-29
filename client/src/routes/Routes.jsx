import MainLayout from "../layouts/MainLayout.jsx";
import CheckUrl from "../pages/CheckUrl.jsx";
import CheckPassword from "../pages/CheckPassword.jsx";

export const routes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: "/url-lookup",
                element: <CheckUrl />
            },
            {
                path: "/password-lookup",
                element: <CheckPassword />
            },
        ],
    },
];