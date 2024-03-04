import React, { useContext } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import SignInPage from '../modules/auth/SignInPage';
import AuthContext from '../config/context/auth-context';
import AdminLayout from '../components/layout/AdminLayout';
import ClientLayout from '../components/layout/ClientLayout';
import UserLayout from '../components/layout/UserLayout'

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  const routesFromRole = (role) => {
    switch (role) {
      case 'ADMIN_ROLE':
        return (
          <>
            <Route path="/" element={<AdminLayout user={user} />}>
              <Route path="dashboard" element={<>Dashboard</>} />
              <Route path="admin" element={<>Admin</>} />
              <Route path="products" element={<>Products</>} />
            </Route>
          </>
        );
      case 'USER_ROLE':
        return (
          <>
            <Route path="/" element={<UserLayout user={user} />}>
              <Route path="dashboard" element={<>Dashboard</>} />
              <Route path="profile" element={<>User Profile</>} />
              <Route path="users" element={<>Users</>} />
              {/* Otras rutas específicas para USER_ROLE */}
            </Route>
          </>
        );
      case 'CLIENT_ROLE':
        return (
          <>
            <Route path="/" element={<ClientLayout user={user} />}>
              <Route path="dashboard" element={<>Dashboard</>} />
              <Route path="orders" element={<>Orders</>} />
              <Route path="clients" element={<>Clients</>} />
              {/* Otras rutas específicas para CLIENT_ROLE */}
            </Route>
          </>
        );
      default:
        return (
          <>
            {/* Rutas comunes para cualquier otro caso */}
            <Route path="/" element={<AdminLayout user={user} />}>
              <Route path="dashboard" element={<>Dashboard</>} />
              <Route path="default" element={<>Default</>} />
            </Route>
          </>
        );
    }
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user.signed ? (
          <>
            {routesFromRole(user?.roles[0]?.name)}
          </>
        ) : (
          <Route path="/" element={<SignInPage />} />
        )}
        <Route path="/*" element={<>404 not found</>} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
