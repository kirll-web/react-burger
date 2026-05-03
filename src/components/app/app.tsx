import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { checkUserAuth } from '@services/checkUserAuth';

import { router } from './router';

import type { AppDispatch } from '@services/store';

export const App = (): React.JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    void dispatch(checkUserAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
