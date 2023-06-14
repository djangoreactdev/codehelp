// ** Router imports
import { useRoutes } from "react-router-dom";

// ** Layouts
import Layout from "../layouts/Layout";

//githab
import {
  GitFavouritesPage,
  GitSearchPage,
} from "../features/github/components";

// codehelp
import {
  CategoryPage,
  EditCategoryPost,
  PostsPage,
} from "../features/sections/components";

// ** Pages Imports
import NotFound from "../components/NotFound";
import ActivatePage from "../pages/ActivatePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PropertiesPage from "../pages/PropertiesPage";
import RegisterPage from "../pages/RegisterPage";

//auth
import { Login, PrivateRoute, Registration } from "../features/auth/components";

const Router = () => {
  const routes = useRoutes([
    {
      path: "/login",
      children: [{ path: "/login", element: <Login /> }],
    },
    {
      path: "/register",
      children: [{ path: "/register", element: <Registration /> }],
    },
    {
      path: "/",
      element: <Layout />,
      // element: <PrivateRoute page={<Layout />} /> ,
      errorElement: <NotFound />,
      children: [
        {
          errorElement: <NotFound />,
          children: [
            { index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "activate/:uid/:token", element: <ActivatePage /> },
            { path: "properties", element: <PropertiesPage /> },
          ],
        },
        {
          path: "github",
          children: [
            { index: true, element: <GitSearchPage /> },
            { path: "favourites", element: <GitFavouritesPage /> },
          ],
        },
        {
          path: ":slug_mini",
          children: [
            { index: true, element: <CategoryPage /> },
            {
              path: ":slug",
              children: [
                { index: true, element: <PostsPage /> },
                {
                  path: "post",
                  element: <PostsPage />,
                },
              ],
            },
            { path: ":categoryId/edit", element: <EditCategoryPost /> },
            { path: "create", element: <EditCategoryPost /> },
          ],
        },
      ],
    },
  ]);

  return routes;
};

export default Router;
