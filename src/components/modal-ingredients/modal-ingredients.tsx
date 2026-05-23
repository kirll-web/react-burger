import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details';
import { Modal } from '@components/modal';
import { useGetIngredientByIdQuery } from '@services/ingredientsApi';

export const ModalIngredients = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ingredient } = useGetIngredientByIdQuery(id);

  if (!ingredient) {
    return undefined;
  }

  const handleCloseModal = (): void => {
    void navigate('/');
  };
  return (
    <Modal onClose={handleCloseModal}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
};
