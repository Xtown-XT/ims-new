
import { Suspense, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import dashboard from "./components/assets/dashboard.png";
//import ssms from "./components/assets/sewing-machine.png";

import Login from "./login/Login";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./utils/Loading";
import Settings from "./components/pages/Settings";
import ims from "./components/assets/sewing-machine.png";
const routeModules = import.meta.glob("./*/AppRoutes.jsx", { eager: true });

import products from "./ims/pages/inventory/products";

const moduleIcons = {
  dashboard: <img src={dashboard} alt="iot" className="w-6 h-6" />,
  ims: <img src={ims} alt="iot" className="w-6 h-6 " />,
  //ssms: <img src={ssms} alt="iot" className="w-6 h-6" />,
  //iot: <img src={iot} alt="iot" className="w-6 h-6" />,
};

const App = () => {
  const modules = Object.entries(routeModules).map(([path, mod]) => {
    const match = path.match(/\.\/(.*?)\/AppRoutes\.jsx$/);
    const name = match?.[1];

    return {
      name,
      path: `/${name}/*`,
      element: mod.default,
      menuItems: mod[`${name}MenuItems`] || [],
    };
  });

  const menuItems = useMemo(() => {
    return modules.map(({ name, menuItems }) => ({
      key: name,
      icon: moduleIcons[name] || null,
      label: name.toUpperCase(),
      children: menuItems,
    }));
  }, [modules]);

  const getDefaultRedirect = () => {
    const filteredModules = modules.filter((mod) => mod.name !== "dashboard");
    return filteredModules.length > 0
      ? `/${filteredModules[0].name}/pages/dashboard`
      : "/404";
  };

  return (
    <BrowserRouter>
    <Loading duration={3000} />
      <Suspense fallback={<div className="p-4"><Loading /></div>}>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<MainLayout menuItems={menuItems} />}>
            <Route
              path="/"
              element={<Navigate to={getDefaultRedirect()} replace />}
            />
            {modules.map(({ name, path, element: Element }) => (
              <Route key={name} path={path} element={<Element />} />
            ))}
            <Route path="/settings" element={<Settings/>} />
            <Route
              path="*"
              element={
                <div className="p-4 text-red-500">404 - Page Not Found</div>
              }
            />
          </Route>
        </Routes>
        
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
