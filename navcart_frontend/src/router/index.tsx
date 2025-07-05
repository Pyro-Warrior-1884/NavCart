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
import Home from "../pages/Home";

// Layout Route (Root)
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
    </>
  ),
});

//Home page

const Homeroute = createRoute({
  getParentRoute:()=>rootRoute,
  path:"/",
  component: Home,
})

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

const maproute = createRoute({
  getParentRoute:()=>rootRoute,
  path:"/map",
  component:Map1
})
// Route tree
const routeTree = rootRoute.addChildren([loginRoute, signupRoute,maproute,Homeroute]);

export const router = createRouter({ routeTree });
