import { Link } from 'react-router-dom';

import type { ReactElement } from 'react';

export const NotFoundPage = (): ReactElement => {
  return (
    <main className="p-10">
      <h1 className="text text_type_main-large">404</h1>
      <p className="text text_type_main-default mt-4">Страница не найдена.</p>
      <Link to="/" className="text text_type_main-default mt-6">
        Вернуться на главную
      </Link>
    </main>
  );
};
