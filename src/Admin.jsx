import Login from "./components/auth/login";
import Register from "./components/auth/register";
import CompanyProfile from "./components/CompanyProfile";

import Header from "./components/header";
import Home from "./components/home/Home";
import ReviewsPage from "./components/ReviewsPage";

import { AuthProvider } from "./contexts/auth";
import { useRoutes } from "react-router-dom";

function Admin() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    
    {
      path:"/review",
      element:<ReviewsPage/>
    },

    {
      path:"/company-profile",
      element:<CompanyProfile/>
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default Admin;