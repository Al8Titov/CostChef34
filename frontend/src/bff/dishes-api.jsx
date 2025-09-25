import apiService from '../services/api';

export const getUserDishes = async () => {
	try {
		const response = await apiService.getDishes();
		
		// Извлекаем данные из ответа
		if (response && response.data && Array.isArray(response.data)) {
			return response.data;
		} else if (Array.isArray(response)) {
			return response;
		} else {
			return [];
		}
	} catch (error) {
		console.error('Ошибка при загрузке блюд:', error);
		return [];
	}
};

export const createDish = async (dishData) => {
	try {
		const createdDish = await apiService.createDish(dishData);
		console.log('Блюдо создано:', createdDish);
		return createdDish;
	} catch (error) {
		console.error('Ошибка при создании блюда:', error);
		throw error;
	}
};

export const deleteDish = async (dishId) => {
	try {
		await apiService.deleteDish(dishId);
		console.log('Блюдо удалено:', dishId);
		return true;
	} catch (error) {
		console.error('Ошибка при удалении блюда:', error);
		return false;
	}
};
