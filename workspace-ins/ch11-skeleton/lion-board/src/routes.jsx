import Layout from '@components/layout';
import MainPage from '@pages/index';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      // { path: 'page1', element: <Page1 /> },
    ]
  },
]);

export default router;