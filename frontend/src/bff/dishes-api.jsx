import apiService from '../services/api';

export const getUserDishes = async () => {
	try {
		const response = await apiService.getDishes();
		console.log('Dishes API response:', response);
		
		// Извлекаем данные из ответа
		if (response && response.data && Array.isArray(response.data)) {
			return response.data;
		} else if (Array.isArray(response)) {
			return response;
		} else {
			console.warn('Unexpected dishes response format:', response);
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
