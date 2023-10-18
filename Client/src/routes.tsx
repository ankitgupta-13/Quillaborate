import MainDashboard from "./container/MainDashboard";
import Profile from "./container/Profile";
import Login from "./container/auth/Login";
import DocumentUser from "./container/user/DocumentUser";
import Register from "./container/auth/Register";

export const RouteUserRole = [
  {
    name_var: "Dashboard",
    url_var: "dashboard",
    icon_var: "ri-home-3-fill",
    children: [],
  },
  {
    name_var: "Document",
    url_var: "document-user",
    icon_var: "ri-book-open-fill",
    children: [],
  },
];

export const DashboardRoutes = [
  {
    path: "",
    component: <MainDashboard />,
  },
  {
    path: "profile",
    component: <Profile />,
  },
  // ADMIN ROUTES

  {
    path: "document-user",
    component: <DocumentUser />,
  },
];

export const AuthRoutes = [
  {
    path: "sign-in",
    component: <Login />,
  },
  {
    path: "sign-up",
    component: <Register />,
  },
];
