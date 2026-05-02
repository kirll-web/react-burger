import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@components/Layout';
import { ModalIngredients } from '@components/modal-ingredients';
import { HomePage } from '@pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '',
        Component: HomePage,
        children: [{ path: 'ingredients/:id', Component: ModalIngredients }],
      },
    ],
  },
]);
