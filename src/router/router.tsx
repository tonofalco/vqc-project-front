import { createBrowserRouter } from 'react-router-dom';

import { Root } from '../Root';
import { AuthLayout, DashboardLayout } from '../layouts';
import { Dashboard, LoginPage, CotizacionPage, ConfigPage, UserPageConfig, FirstDayPageConfig, ExtraDayPageConfig, ViajesTerrestresPage, ViajesAereosPage } from '../pages';
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
            path: routesURL.LAND_TRAVELS,
            element: <ViajesTerrestresPage />
          },
          {
            path: routesURL.AIR_TRAVELS,
            element: <ViajesAereosPage />
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