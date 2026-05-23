import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { checkUserAuth } from '@services/checkUserAuth';
import { useAppDispatch } from '@services/store';

import { router } from './router';

export const App = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(checkUserAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
