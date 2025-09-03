import MainLayout from "../layouts/MainLayout.jsx";
import CheckUrl from "../pages/CheckUrl.jsx";
import CheckPassword from "../pages/CheckPassword.jsx";
import LiveDdos from '../pages/LiveDdos.jsx'
import IPLookup from "../pages/IPLookup.jsx";
import IPCheckResult from "../pages/IPCheckResult.jsx"
import LandingPage from "../pages/LandingPage.jsx"

export const routes = [
    {
        path: '',
        element: <LandingPage />,
    },
    {
        path: '',
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
            {
                path: "/live-ddos",
                element: <LiveDdos />
            },
            {
                path: '/ip-lookup',
                element: <IPLookup />
            },
            {
                path: '/ip-lookup/result',
                element: <IPCheckResult />
            }
        ],
    },
];