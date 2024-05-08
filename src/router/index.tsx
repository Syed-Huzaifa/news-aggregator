import App from '@/App';
import Feed from '@/pages/Feed';
import Settings from '@/pages/Settings';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
