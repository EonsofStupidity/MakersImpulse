import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const LatestUpdates = lazy(() => import('@/pages/content/blog/latest-updates'));
const Login = lazy(() => import('@/pages/auth/login'));
const Register = lazy(() => import('@/pages/auth/register'));
const MakerSpace = lazy(() => import('@/pages/content/maker-space'));
const About = lazy(() => import('@/pages/site/about'));
const Landing = lazy(() => import('@/pages/site/landing'));
const Privacy = lazy(() => import('@/pages/site/privacy'));
const Terms = lazy(() => import('@/pages/site/terms'));

const publicRoutes = [
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/maker-space',
    element: <MakerSpace />
  },
  {
    path: '/blog',
    element: <LatestUpdates />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/privacy',
    element: <Privacy />
  },
  {
    path: '/terms',
    element: <Terms />
  }
];

export default publicRoutes;