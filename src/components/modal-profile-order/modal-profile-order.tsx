import { useNavigate, useParams } from 'react-router-dom';

import { FeedOrderDetails } from '@components/feed-order-details';
import { Modal } from '@components/modal';
import { getFeedOrderById } from '@utils/orders';

export const ModalProfileOrder = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = getFeedOrderById(id);

  if (!order) {
    return null;
  }

  const handleCloseModal = (): void => {
    void navigate('/profile/orders');
  };

  return (
    <Modal onClose={handleCloseModal}>
      <FeedOrderDetails order={order} />
    </Modal>
  );
};
