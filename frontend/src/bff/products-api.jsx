import apiService from '../services/api';

export const getUserProducts = async () => {
	try {
		const response = await apiService.getProducts();
		console.log('Products API response:', response);
		
		// Извлекаем данные из ответа
		if (response && response.data && Array.isArray(response.data)) {
			return response.data;
		} else if (Array.isArray(response)) {
			return response;
		} else {
			console.warn('Unexpected products response format:', response);
			return [];
		}
	} catch (error) {
		console.error('Ошибка при загрузке продуктов:', error);
		return [];
	}
};

export const createProduct = async (productData) => {
	try {
		console.log('Отправляем данные продукта:', productData);
		const response = await apiService.createProduct(productData);
		console.log('Продукт создан:', response);
		
		// Извлекаем данные из ответа
		if (response && response.data) {
			return response.data;
		} else {
			return response;
		}
	} catch (error) {
		console.error('Ошибка при создании продукта:', error);
		throw error;
	}
};

export const deleteProduct = async (productId) => {
	try {
		await apiService.deleteProduct(productId);
		console.log('Продукт удален:', productId);
		return true;
	} catch (error) {
		console.error('Ошибка при удалении продукта:', error);
		return false;
	}
};
