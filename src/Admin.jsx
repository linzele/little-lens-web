import Login from "./components/auth/login";
import CompanyProfile from "./components/CompanyProfile";
import Promotion from "./components/Promotion";
import Header from "./components/header";
import Home from "./components/home/Home";
import ReviewsPage from "./components/ReviewsPage";
import StoryGenres from "./components/StoryGenres";
import InterestsManagement from "./components/interest";
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
      path: "/home",
      element: <Home />,
    },
    
    {
      path:"/review",
      element:<ReviewsPage/>
    },
    {
      path:"/storyGenres",
      element:<StoryGenres/>
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