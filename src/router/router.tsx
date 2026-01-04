import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';
import { AuthLayout, DashboardLayout } from '../layouts';
import { Dashboard, JiraPage, LoginPage, PersonPage, CotizacionPage, ConfigPage, UserPageConfig, FirstDayPageConfig, ExtraDayPageConfig} from '../pages';
import { authURL, routesURL } from '../enum/routesURL';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        path: routesURL.DASHBOARD,
        element: <DashboardLayout />,
        children: [
          {
            path: '',
            element: <Dashboard />
          },
          {
            path: routesURL.QUOTE,
            element: <CotizacionPage />
          },
          {
            path: 'person',
            element: <PersonPage />
          },
          {
            path: 'tasks',
            element: <JiraPage />
          },
            {
            path: 'usuarios',
            element: <UserPageConfig />
          },
          {
            path: routesURL.CONFIG,
            element: <ConfigPage />,
          },
          {
            path: routesURL.CONFIG_USERS,
            element: <UserPageConfig />,
          },
          {
            path: routesURL.CONFIG_FIRST_DAY,
            element: <FirstDayPageConfig />,
          },
            {
            path: routesURL.CONFIG_EXTRA_DAY,
            element: <ExtraDayPageConfig />,
          },

        ]
      },

      /// Auth Routes
      {
        path: authURL.AUTH,
        element: <AuthLayout />,
        children: [
          {
            path: authURL.LOGIN,
            element: <LoginPage />
          }
        ]

      },

    ],
  },
]);