import { useState } from 'react';

import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFoods';

interface Food {
  id?: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface statePage {
  editingFood?: {} | Food | any;
  modalOpen?: boolean;
  editModalOpen?: boolean;
}

export default function Dashboard () {

  const { foods, setFoods } = useFoods()

  let [state, setState] = useState<statePage>({
    editingFood: {},
    modalOpen: false,
    editModalOpen: false,
  })

  async function handleAddFood (food: Food) {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood (food : Food) {
    const { editingFood } = state;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood (id : number) {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal () {
    const { modalOpen } = state;

    setState({ modalOpen: !modalOpen });
  }

  function toggleEditModal () {
    const { editModalOpen } = state;

    setState({ editModalOpen: !editModalOpen });
  }

  function handleEditFood (food : Food) {
    setState({ editingFood: food, editModalOpen: true, });
  }

  const { modalOpen, editModalOpen, editingFood } = state;

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};

