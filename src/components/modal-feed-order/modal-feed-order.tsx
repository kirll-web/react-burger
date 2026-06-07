import { useNavigate, useParams } from 'react-router-dom';

import { FeedOrderDetails } from '@components/feed-order-details';
import { Modal } from '@components/modal';
import { selectAllFeedOrderById } from '@services/feedsApi';
import { useAppSelector } from '@services/store';
export const ModalFeedOrder = (): React.JSX.Element | null => {
  const navigate = useNavigate();
  const { id } = useParams();
  const order = useAppSelector(selectAllFeedOrderById(id));

  if (!order) {
    return null;
  }

  const handleCloseModal = (): void => {
    void navigate('/feed');
  };

  return (
    <Modal onClose={handleCloseModal}>
      <FeedOrderDetails order={order} />
    </Modal>
  );
};
