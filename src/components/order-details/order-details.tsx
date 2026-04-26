import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import type { ReactElement } from 'react';

import styles from './order-details.module.css';

export type TOrderDetailsProps = {
  orderNumber: number;
};

export const OrderDetails = ({ orderNumber }: TOrderDetailsProps): ReactElement => {
  return (
    <section
      className={clsx(
        styles.modal,
        'text text_type_main-default pl-20 pr-20 pt-15 pb-15'
      )}
    >
      <h2 className="text text_type_digits-large mb-8">{orderNumber}</h2>
      <span className="text text_type_main-medium mb-15">идентификатор заказа</span>
      <CheckMarkIcon className={clsx(styles.check, 'mb-15')} type="primary" />
      <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </section>
  );
};
