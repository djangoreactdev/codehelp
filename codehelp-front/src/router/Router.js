// ** Router imports
import { useRoutes, Navigate } from "react-router-dom";

// ** Layouts
import Layout from "../layouts/Layout";

// ** Router imports
import { lazy, useEffect } from "react";

// ** GetRoutes
import { getRoutes } from "./routes";

import ErrorPage from "../views/pages/ErrorPage";

//DashBoard
import DashBoard from "../features/DashBoard";

//auth
import { Login, PrivateRoute, Registration } from "../features/auth/components";

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

// components
import {
  MainComponents,
  ChildComponents,
} from "../features/components/components";

import { useAppSelector } from "../hooks/redux";
import { useAppDispatch } from "../hooks/redux/hooks";
import { verifyJwt } from "../features/auth/authSlice";


const Router = () => {
  const { isAuthenticated, jwt } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("jwt", jwt);
    console.log("isAuthenticated", isAuthenticated);
    if (jwt && !isAuthenticated) dispatch(verifyJwt());
  }, [jwt, isAuthenticated, dispatch]);



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
      // element: isAuthenticated ? <Layout /> : <Navigate replace to="/login" />,
      element: <PrivateRoute page={<Layout />} /> ,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          errorElement: <ErrorPage />,
          children: [
            { index: true, element: <PrivateRoute page={<DashBoard />} /> },
            { path: "dashboard", element: <DashBoard /> },

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
      ],
    },

    // {
    //   path: "*",
    //   element: <Layout />,
    //   children: [{ path: "*", element: <Error /> }],
    // },
    // ...allRoutes,
  ]);

  return routes;
};

export default Router;
