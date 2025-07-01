import {
  createRootRoute,
  createRoute,
  createRouter
} from '@tanstack/react-router';

import App from '../App';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';

const rootRoute = createRootRoute({
  component:App,
});

const loginroute = createRoute({
  getParentRoute:()=>rootRoute,
  path:'/login',
  component:LoginPage
});

const signuproute = createRoute({
  getParentRoute:()=>rootRoute,
  path:'/signup',
  component:SignupPage
});


const routeTree = rootRoute.addChildren([loginroute,signuproute]);

export const router = createRouter({routeTree});

declare module '@tanstack/react-router'{
  interface Register{
    router:typeof router;
  }
}
