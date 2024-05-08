import DashboardLayout from '../layouts/DashboardLayout';
import Feed from '../pages/Feed';
import Settings from '../pages/Settings';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/',
                element: <Feed />
            },
            {
                path: 'settings',
                element: <Settings />
            }
        ]
    }
]);
