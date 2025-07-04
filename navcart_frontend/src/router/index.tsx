import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Header from "../components/Header";
import Map1 from "../pages/map1";

// Layout Route (Root)
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Map1/>
      <Outlet />
    </>
  ),
});

// /login
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

// /signup
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: Signup,
});

// Route tree
const routeTree = rootRoute.addChildren([loginRoute, signupRoute]);

export const router = createRouter({ routeTree });
